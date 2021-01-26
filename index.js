const express = require('express');
const app = express();
const port = 300;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ todos: [] }).write(); // đoạn này để set default trong file json ta có một mạng posts rỗng

module.exports = db;

app.set('view engine', 'pug')
app.set('views', './views')

db.get('todos')
.push(
{
  id: 1,
  text: 'blah'
}
)
.write()

app.get('/', function(req, res){
  res.send(db.get('todos').value());
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
