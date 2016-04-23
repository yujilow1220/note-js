#!/usr/bin/env node

'use strict';
var argv = require('argv');
var rc = require('runtime-configuration');

if(!state || state === "-h" || state === "help"){
	help();
	return;
}
var targets = argv.run().targets;
var state = targets.pop();

rc("note", function(err, config){
  switch(state){
	
	  	case 'debug':
	  		rc("note", function(err, config){
				  			console.log(config);
				  		});
	  		break;
	
	  	case 'show':
	  		console.log('this is show');
	  		break;
	
	  	case 'config':
	      var editor = require('child_process').spawn(config.editor, [process.env.HOME+'/.noterc'], {stdio: 'inherit'});
	    	editor.on('exit', function() {
				  			console.log("Configuration changed");
				  		});
	  		break;
	
	  	default:
	  		var fs = require('fs');
	  		var file = state+'.md';
	      var editor = require('child_process').spawn(config.editor, [file], {stdio: 'inherit'});
	  		editor.on('exit', function() {
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
