#!/usr/bin/env node

/**
 * TODO:gitとの連携
 * TODO:gitから既存ノートの取得
 *
 */

 'use strict';
 var argv = require('argv');
 var rc = require('runtime-configuration');
 var mkdirp = require('mkdirp');
 var fs = require('fs');
 var Git = require("nodegit");
 var targets = argv.run().targets;
 var state = targets.shift();
 if(!state || state === "-h" || state === "help"){
 	help();
 	return;
 }

 var note = require('./lib/note.js');
 console.log(note.config);

 switch(state){

 	case 'debug':
 	break;

 	case 'show':
 	var title = targets.shift();
 	note.show(title);
 	break;

 	case 'config':
 	var editor = require('child_process').spawn(config.editor, [process.env.HOME+'/.noterc'], {stdio: 'inherit'});
 	editor.on('exit', function() {
 		console.log("Configuration changed");
 	});
 	break;


			// 書いて保存するやつ
			default:
			var dir = config.save.dir_path+"/"+state;
			mkdirp(dir, function(err){
				if(err)return err;
				var file = dir+"/"+mkdate()+'.md';
				var editor = require('child_process').spawn(config.editor, [file], {stdio: 'inherit'});
				editor.on('exit', function() {
					push2Git(config.save.dir_path, file);
				});
			});
			break;
		}
/**
 * ヘルプを出力
 *
 */

 function help(){
 	console.log("\tUsage:");
 	console.log("\t\tnote [name]\t\t: create new note.");
 	console.log("\t\tnote show\t\t: show your list of notes.");
 	console.log("\t\tnote show [name]\t: show your note.");
 	console.log("\t\tnote config\t\t: edit '.noterc' config file.");
 	console.log("\t\tnote conifg example\t: show config example.");

 }

/**
 * 今日の日付をフォーマットして出力
 *
 */

 function push2git(basedir, file){
 	Git.Repository.open(basedir);

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
