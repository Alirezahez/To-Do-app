const express = require('express')
const router = express.Router()
const {todo, addTask, claim, purge, abandonorcomplete, unfinish, tasks} = require('../Controllers')

router.get('/todo', todo)

router.get('/:username/addtask', addTask)
router.get('/:_id/:username/claim', claim)
router.get('/:_id/:username/:status/abandonorcomplete', abandonorcomplete)
router.get('/:_id/:username/unfinish', unfinish)
router.get('/:username/purge', purge)

router.get('/tasks', tasks)

module.exports = router
