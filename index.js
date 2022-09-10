const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const Port = 3000;

var todoRotues = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
  res.sendFile("index.html");
})

app.use('/api/todos', todoRotues);

app.listen(Port, function(){
    console.log("APP runnning on " + Port);
});