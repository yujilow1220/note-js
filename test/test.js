var note = require('../lib/note.js');
var assert = require("chai").assert;
var rewire = require('rewire');
var note = rewire('../lib/note.js');

describe('base', function(){
	it('can get config', function(done){
		note.init(function(){
			assert.equal(note.config.editor, 'vim');
			done();
		});
	});
});

describe("show", function(){
});

describe('edit', function(){
});
