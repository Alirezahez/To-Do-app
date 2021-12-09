const {login, register} = require('./authController')
const {todo, addTask, claim, purge, abandonorcomplete, unfinish, tasks} = require('./todoController')

module.exports = {
    login,
    register,
    todo,
    addTask,
    claim,
    purge,
    abandonorcomplete,
    unfinish,
    tasks
}
