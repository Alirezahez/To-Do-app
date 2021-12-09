const mongoose = require('mongoose')
const {load, save} = require('../Utils')
const {Task} = require('../Database/Model')
mongoose.connect('mongodb://localhost:27017/sara', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
});

module.exports = {

    async todo(req, res) {
        const {user, tasks} = JSON.parse(req.query.data)

        res.render('home', {username: user.username, tasks})

    },

    async addTask(req, res) {
        let data = await load()

        const username = req.params.username
        const {text} = req.query
        const tasks = data[1]
        const user = data[0].filter(user => user.username === username)[0]
        const task = {}

        if (tasks[tasks.length - 1]._id)
            task._id = tasks[tasks.length - 1]._id + 1
        else
            task._id = 1

        task.text = text
        task.state = "Unclaimed"
        task.creator = user
        task.claimingUser = user
        task.isTaskClaimed = false
        task.isTaskDone = false
        task.isTaskCleared = false

        tasks.push(task)
        data[1] = tasks
        await save(data)

        res.redirect('/todo?' + 'data=' + JSON.stringify({user, tasks}))

    },
    async claim(req, res) {
        const {_id, username} = req.params

        let data = await load()
        let users = data[0]
        let tasks = data[1]

        const user = users.filter((_user) => _user.username === username)[0]
        const task = tasks.filter((_task) => _task._id === parseInt(_id))[0]

        task.claimingUser = user
        task.isTaskClaimed = true
        task.state = 'Claimed'

        tasks[tasks.indexOf(task)] = task

        data[1] = tasks

        await save(data)

        res.redirect('/todo?' + 'data=' + JSON.stringify({user, tasks}))

    },
    async purge(req, res) {

        let data = await load()
        let tasks = data[1]
        let users = data[0]
        const user = users.filter((_user) => _user.username === req.params.username)[0]

        tasks.map((task, index) => {
            if (task.isTaskDone)
                tasks[index].isTaskCleared = true
        })

        data[1] = tasks

        await save(data)

        res.redirect('/todo?' + 'data=' + JSON.stringify({user, tasks}))

    }
    ,
    async abandonorcomplete(req, res) {
        const {_id, username, status} = req.params

        let data = await load()
        let users = data[0]
        let tasks = data[1]

        const user = users.filter((_user) => _user.username === username)[0]
        const task = tasks.filter((_task) => _task._id === parseInt(_id))[0]

        if (status === 'abandon') {
            task.claimingUser = null
        } else if (status === 'done') {
            task.isTaskDone = true
        }


        data[1] = tasks
        await save(data)

        res.redirect('/todo?' + 'data=' + JSON.stringify({user, tasks}))

    }
    ,
    async unfinish(req, res) {
        const {_id, username} = req.params

        let data = await load()
        let users = data[0]
        let tasks = data[1]

        const user = users.filter((_user) => _user.username === username)[0]
        const task = tasks.filter((_task) => _task._id === parseInt(_id))[0]

        task.isTaskDone = false

        data[1] = tasks
        await save(data)

        res.redirect('/todo?' + 'data=' + JSON.stringify({user, tasks}))

    },

    async tasks(req,res){
        console.log( "A user is accessing the tasks route using get, and found the following:" );
        try {
            const tasks = await Task.find();
            console.log( tasks );
            res.render( "taskTable", { tasks });
        } catch ( error ) {
            console.log( error );
        }
    }



}
