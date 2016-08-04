var express = require('express');
var app = express();

//var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var ss = require('socket.io-stream');
var path = require('path');
var counter = 0;


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  	console.log('a user connected');





  	//TK INCREMENT THE FILENAME... YUP YUP YUP ITS DONE!!! 
  	//the issue was that I needed to make the filename local to each 
  	//time that function was called
  	//TK AUDIO STREAM
  	//SEPERATE 'RECORD' from 'STREAM'




  	//var fileWriter = new png.FileWriter(outfile)
  	//testing file uploader
  	//File upload success!
	ss(socket).on('file', function(stream) {
		var outfile = counter + 'demo.txt';
	    stream.pipe(fs.createWriteStream(outfile));
	    console.log("I'm snesing something");
	    counter++;
	    console.log(counter);
	    console.log(outfile)
	    
	  });
	  	
  	socket.on('m', function(data){
  		console.log("received data:");
  		console.log(data);

  		var bufArr = new ArrayBuffer(4)
  		var bufView = new Uint8Array(bufArr);
  		bufView[0] = 6;
  		bufView[1]=7;
        bufView[2]=8;
        bufView[3]=9;
        socket.emit('m',bufArr);
  	});

  	//server receives message from client
  	socket.on('chat message', function(msg){
    	console.log('message: ' + msg);
    //emits message back to ALL clients including sender
    	io.emit('chat message', msg);

  	});

  
   socket.on('test message', function(data){
	    console.log('start test should be 56 ' + data);
	    io.emit('test message', data);
	});
   socket.on('test message 2', function(data){
	    console.log('Should you be stopped?' + data);
	    io.emit('test message 2', data);
	});

	socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});