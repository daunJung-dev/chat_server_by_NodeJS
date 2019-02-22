// ex08_chat_server.js

var http = require('http');
var express = require('express');
var app = express();
var cors = require('cors');

app.set('port', process.env.PORT || 3000);

app.use(cors());

var messages = []; //메세지 객체 저장용

app.get('/recieve', function(req, res) {
    var oldSize = req.query.size;
    var newSize = messages.length;
    if(oldSize >= newSize) {
        res.end();
    } else {
        var data = {
            total: newSize,
            messages: messages.slice(oldSize)
        }
        res.send(JSON.stringify(data));
    }
    
});

app.get('/send', function(req, res) {
    messages.push({
        sender:req.query.sender,
        message:req.query.message
    });
    res.end();
});

var server = http.createServer(app);
server.listen(app.get('port'), ()=>{
    console.log('localhsot:%d', app.get('port'));
});
console.log('수정')
