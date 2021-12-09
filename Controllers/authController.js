const {load, save} = require('../Utils')

module.exports = {

    async login(req, res) {
        const data = (await load())
        const users = data[0]
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        const matchedUser = users.filter((_user) => (_user.username === user.username))[0]
        if (!matchedUser)
            res.status(404).send('User Not Found!')

        if (matchedUser.password !== user.password)
            res.status(404).send('User Not Found!')

        res.redirect('/todo?' + 'data=' + JSON.stringify({user, tasks: data[1]}))

    },
    async register(req, res) {
        if (req.body.authorization !== 'todo2021')
            return res.status(401).send('Not Authorized!')

        const data = (await load())
        const users = data[0]
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        const matchedUser = users.filter((_user) => (_user.username === user.username))[0]
        if (matchedUser)
            return res.status(400).send('Username Already Exist!')

        users.push(user)
        data[0] = users
        await save(data)

        res.redirect('/todo?' + 'data=' + JSON.stringify({user, tasks: data[1]}))

    }

}
