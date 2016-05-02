//'use strict';
var mkdirp = require('mkdirp');
var fs = require('fs');
var Git = require("nodegit");
var rc = require('runtime-configuration');
var config;

module.exports.init = function(callback){
	rc('note', function(err, conf){
		module.exports.config = validate_config(conf);
		callback();
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
