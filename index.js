var multilevel = require("multilevel/msgpack")
var net = require("net")
var level = require("level")
var path = require("path")

var location = path.resolve(__dirname, "data.db")
var db = level(location, { valueEncoding: "json" })

var server = net.createServer(function (con) {
  con.pipe(multilevel.server(db)).pipe(con)
}).listen(process.env.LEVEL_PORT || 3333)

module.exports = server
