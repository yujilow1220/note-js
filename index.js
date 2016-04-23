#!/usr/bin/env node

'use strict';
var argv = require('argv');
var rc = require('runtime-configuration');
var mkdirp = require('mkdirp');
var fs = require('fs');

var targets = argv.run().targets;
var state = targets.shift();
if(!state || state === "-h" || state === "help"){
	help();
	return;
}

rc("note", function(err, config){

	if(!config.save.dir_path){
		config.save.dir_path = process.env.HOME+"/.note";
	}
  switch(state){
	
	  	case 'debug':
	  		rc("note", function(err, config){
				  			console.log(config);
				  		});
	  		break;
	
	  	case 'show':
				var title = targets.pop();
				if(!title){
					fs.readdir(config.save.dir_path, function(err, files){
					    if (err) throw err;
							files.forEach(function(file){
								console.log(file);
							});
					});
				}else{
					//TODO: titleの中身をつなげて表示
					return;
				}

	  		break;
	
	  	case 'config':
	      var editor = require('child_process').spawn(config.editor, [process.env.HOME+'/.noterc'], {stdio: 'inherit'});
	    	editor.on('exit', function() {
				  			console.log("Configuration changed");
				  		});
	  		break;
	
	  	default:
				var dir = config.save.dir_path+"/"+state;
				mkdirp(dir, function(err){
					if(err)return err;
	  		  var file = dir+"/"+mkdate()+'.md';
	        var editor = require('child_process').spawn(config.editor, [file], {stdio: 'inherit'});
	  		  editor.on('exit', function() {
				  });
				});
	  		break;
	  }
});


function help(){
	console.log("\tUsage:");
	console.log("\t\tnote [name]\t\t: create new note.");
	console.log("\t\tnote show\t\t: show your list of notes.");
	console.log("\t\tnote show [name]\t: show your note.");
	console.log("\t\tnote config\t\t: edit '.noterc' config file.");
	console.log("\t\tnote conifg example\t: show config example.");

}
function mkdate(){
	var date = new Date();
	var year = date.getFullYear();  
	var month = date.getMonth() + 1;  
	var day = date.getDate();  
	  
	if ( month < 10 ) {  
	　　month = '0' + month;  
	}  
	if ( day < 10 ) {  
	　　day = '0' + day;  
	}  
	  
	var str = year + '-' + month + '-' + day;
	return str;
}
