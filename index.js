#!/usr/bin/env node

'use strict';
var argv = require('argv');
var config = require('config');

var targets = argv.run().targets;
var state = targets.pop();

switch(state){

	case 'debug':
		console.log(process.env);
		break;

	case 'show':
		console.log('this is show');
		break;

	case 'config':
    var editor = require('child_process').spawn(config.editor, ['config/default.json'], {stdio: 'inherit'});
		editor.on('exit', function() {
		  var text = fs.readFileSync(file, 'utf-8');
		  console.log(text);
		});
		break;

	default:
		var fs = require('fs');
		var file = state+'.md';
    var editor = require('child_process').spawn(config.editor, [file], {stdio: 'inherit'});
		editor.on('exit', function() {
		  var text = fs.readFileSync(file, 'utf-8');
		  console.log(text);
		});
		break;
}


