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
 note.init(function(){
 	switch(state){

 		case 'debug':
 		break;

 		case 'show':
 		var title = targets.shift();
 		note.show(title);
 		break;

 		case 'config':
 		note.mkconfig();
 		break;


			// 書いて保存するやつ
			default:
			note.edit(state);
			break;
		}

	});
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
