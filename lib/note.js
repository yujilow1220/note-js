//'use strict';
var mkdirp = require('mkdirp');
var fs = require('fs');
var Git = require("nodegit");
var rc = require('runtime-configuration');
var config;

module.exports.init = function(callback){
	rc('note', function(err, conf){
		config = validate_config(conf);
		module.exports.config = config;
		callback();
	});
};

module.exports.mkconfig = function(){

	var editor = require('child_process').spawn(config.editor, [process.env.HOME+'/.noterc'], {stdio: 'inherit'});
	editor.on('exit', function() {
		console.log("Configuration changed");
	});
};



module.exports.show = function(title){
	if(!title){
		fs.readdir(config.save.dir_path, function(err, files){
			if (err) throw err;
			files.forEach(function(file){
				console.log(file);
			});
		});
	}else{
		fs.readdir(config.save.dir_path+"/"+title, function(err, files){
			if(!files || files.length === 0){
				console.log('no file detected.');
				return;
			}
			files.forEach(function(file){
				var contents = fs.readFileSync(config.save.dir_path+"/"+title+"/"+file).toString();
				console.log("------------------"+file+"----------------");
				console.log(contents);
			});
		});
		return;
	}
};


module.exports.edit = function(state){
	var dir = config.save.dir_path+"/"+state;
	mkdirp(dir, function(err){
		if(err)return err;
		var file = dir+"/"+mkdate()+'.md';
		var editor = require('child_process').spawn(config.editor, [file], {stdio: 'inherit'});
		editor.on('exit', function() {
			push2git(config.save.dir_path, config.save.git_repository);
		});
	});

};

/**
 *
 *----------------------private--------------------------
 *
 */

 function validate_config(config){
 	if(!config.save.dir_path){
 		config.save.dir_path = process.env.HOME+"/.note";
 	}

 	return config;

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

 function push2git(basedir, repo_url){
 	openRepository(basedir, function(repo){
 		console.log(success);
 	});
 }

 function openRepository(basedir, callback){
 	Git.Repository.open(basedir).then(function(repo){
 		console.log('success');
 		callback(repo);
 	}, function(err){
 		console.log(err);
 		Git.Repository.init(basedir,0).then(function(repo){
 			callback(repo);
 		});
 	});
 }