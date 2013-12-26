process.env.LEVEL_PORT = 1337

var test = require("tap").test
var server = require("../index.js")

var multilevel = require("multilevel/msgpack")
var net = require("net")

var db = multilevel.client()
var con = net.connect(process.env.LEVEL_PORT)


con.pipe(db.createRpcStream()).pipe(con)

test("serves a leveldb at a port", function (t) {
  db.put("ente", {key: "hallo ente"}, function (err) {
    if (err) return t.fail(err)
    db.get("ente", function (err, data) {
      if (err) return t.fail(err)
      t.same(data, {key: "hallo ente"})
      con.end()
      server.close()
      t.end()
    })
  })
})
