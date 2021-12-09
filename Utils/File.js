const fs = require('fs')
const filePath = __dirname + '/Data.json'

module.exports = {

    async save(data) {

        const jsonData = JSON.stringify(data)
        fs.writeFileSync(filePath, jsonData)

    },
    async load() {

        const jsonData = fs.readFileSync(filePath)
        return JSON.parse(jsonData.toString())

    }

}
