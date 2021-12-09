const express = require('express')
const bodyParser = require('body-parser')
const {exec} = require("child_process");
const chalk = require('chalk')
const mongoose = require('mongoose')
const {User, Task} = require('./Database/Model')
const {load, save} = require('./Utils')

async function insertData() {
    await mongoose.connect('mongodb://localhost:27017/sara', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    });

    const users = (await load())[0]
    const tasks = (await load())[1]

    await users.map(async (_user)=>{

        let user = new User({
            username:_user.username,
            password: _user.password
        })

        await user.save()
        console.log(chalk.green('a user added to the database => '+user.username))

    })
    await tasks.map(async (_task)=>{

        let task = new Task({
            taskId:_task._id,
            text:_task.text,
            state:_task.state,
            creatorId:_task.creator.username,
            isTaskClaimed:_task.isTaskClaimed,
            claimingUserId: _task.claimingUser ? _task.claimingUser.username : null,
            isTaskDone:_task.isTaskDone,
            isTaskCleared:_task.isTaskCleared
        })

        await task.save()
        console.log(chalk.yellow('a task added to the database => '+task.text))

    })

    setTimeout(async ()=>{

        await mongoose.disconnect()

    },3000)

}

insertData()
