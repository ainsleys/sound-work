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
//var opus = require('opus-recorder');

var counter = 0;
var streamcounter = 0;
var streamOutfile = 'streamdemo.wav';
var practice = 'practice.wav'
var opus = require('node-opus');
var oggtrack = 'track.ogg';



app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//maybe there should be no io.on? Just socket on?
io.on('connection', function(socket){
  	console.log('a user connected');





  	//TK INCREMENT THE FILENAME... YUP YUP YUP ITS DONE!!! 
  	//the issue was that I needed to make the filename local to each 
  	//time that function was called


  	//TK AUDIO STREAM
  	//SEPERATE 'RECORD' from 'STREAM'



  	//ss(socket).on('stream-message', function(stream){ //stream
  	//	console.log('new stream');
/*
	  	var fileWriter = new wav.FileWriter(streamOutfile, {
	  		channels: 1,
	  		sampleRate: 48000,
	  		bitDepth: 16
	  	});


  		//should the above be converted to a client connection?
  		//attempting below...
  	ss(socket).on('stream-message', function(stream, meta){
  		console.log("a stream connected");*/



	  	


       // fileWriter = fs.createWriteStream(streamOutfile);
        // stream.pipe(fileWriter);

  		//stream.on('stream-message') //stream-message
  		
  		//stream.on()
	/*	//stream.on('stream-message-2', function(stream, meta){
			//fs.createReadStream(streamOutfile).pipe(fileWriter);
			stream.pipe(fileWriter);
			console.log(stream);


  		ss(socket).on('end', function(){
  			fileWriter.end();
  			//streamOutfile = streamcounter + 'streamdemo.wav'
  			console.log('wrote to file '+ streamOutfile);
  		});
  	});





*/

  	//var fileWriter = new png.FileWriter(outfile)
  	//testing file uploader
  	//File upload success!
/*	ss(socket).on('file', function(stream) {
		var outfile = counter + 'demo.txt';
	    stream.pipe(fs.createWriteStream(outfile));
	    console.log("I'm snesing something");
	    counter++;
	    console.log(counter);
	    console.log(outfile)
	    
	  });*/
	  	
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

  	socket.on('audioURL', function(dataBlob){
  		//var opusFile = fs.createWriteStream( 'track.ogg' );
  		//var opusEncoder = new opus.Encoder( 48000, 1 );
  		//stringBlob = ;
  		//fs.createReadStream(dataBlob).pipe(opusFile);
  		//console.log(dataBlob);
  		var test = stringify(dataBlob);
  		var practice = 'practice.ogg'
  		//console.log(test);
  		//fs.createWriteStream(test).pipe(opusEncoder)






 		console.log("received audio blubb at the server!")
  		//var saveAudio = practice;

  		//var oggEncoder = 

  		//var fileWriter = new wav.FileWriter(saveAudio, {
	  	//	channels: 1,
	  	//	sampleRate: 48000,
	  	//	bitDepth: 16
	  	//});//*/

  		
  		//dataBlob.pipe(fs.createWriteStream(saveAudio))
  		fs.writeFile(practice, dataBlob, 'base64', function (err) {
  			if (err) return console.log(err);
  			console.log('dataBlob > practice');
		});


  		//stream.pipe(fs.createWriteStream(saveAudio));
  		//console.log(url);
  		//console.log(saveAudio);
  	});
  	//server receives message from client
  	socket.on('chat message', function(msg){
    	console.log('message: ' + msg);
    //emits message back to ALL clients including sender
    	io.emit('chat message', msg);

  	});

  	//TK:
  	//convert file to audio on the server
  	//create new naming convention that iterates to support multiple recordings
  	//serve files to client
  	//nail it onto the threejs stuff

  
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