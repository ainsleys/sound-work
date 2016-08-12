var express = require('express');
var app = express();

//var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
//var ss = require('socket.io-stream');
var path = require('path');
var wav = require('wav');
var ogg = require('ogg');
var stringify = require('node-stringify');
var multer  = require('multer')
//var opus = require('opus-recorder');

var counter = 0;
var streamcounter = 0;
var streamOutfile = 'streamdemo.wav';
//var practice = 'practice.wav'
var opus = require('node-opus');
var oggtrack = '/public/recordings/track.ogg';
var fileName = new Date().toISOString() + ".ogg";
//var FormData = require('form-data');


//var upload = multer({ dest: 'uploads/'})



app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/public/testpractice.ogg', function (req, res) {
  res.sendFile(__dirname + '/public/testpractice.ogg');
});

//app.post('/audio/upload', upload.array('audio', )
var practice = './public/testpractice.ogg';

//maybe there should be no io.on? Just socket on?
io.on('connection', function(socket){
  	console.log('a user connected');

  	//var form = new FormData();

	  	

  	socket.on('audioURL', function(dataBlob){

  		//var dataBlob = dataBlob
  		var test = stringify(dataBlob);
  		//var practice = '/public/recordings/practice.ogg'


 		console.log("received audio blubb at the server!")

  		fs.writeFile(practice, dataBlob, 'base64', function (err) {
  			if (err) return console.log(err);
  			console.log('dataBlob > practice');
		});

  		//can we emit the file back lmao?
		io.emit('return audio', practice);

  	});

  	//server receives message from client
  	socket.on('chat message', function(msg){
    	console.log('message: ' + msg);
    //emits message back to ALL clients including sender
    	io.emit('chat message', msg);

  	});
  

	socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});