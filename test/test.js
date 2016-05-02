var note = require('../lib/note.js');
var assert = require("chai").assert;
var rewire = require('rewire');
var note = rewire('../lib/note.js');

describe('base', function(){
	it('can get config', function(){
		var config = note.config;
		console.log(config.editor);
		assert.equal(config.editor, 'vim');
	});

	it('can get path', function(){
		
	});
});

describe("show", function(){
	it('should show some directory', function(){
		
	});
});

describe('edit', function(){
	it('should show such directory', function(){
	});	
});
