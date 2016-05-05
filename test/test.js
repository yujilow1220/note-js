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

	it('can validate and set configure', function(done){
		note.init(function(){
			assert.equal(note.config.save.dir_path, process.env.HOME+"/.note");
			done();
		});
	})
});

describe("show", function(){
});

describe('edit', function(){
	var push2git = note.__get__('push2git');
	it('can make git repository', function(){
		assert.equal('Repository', push2git('/Users/owner/aaa', 'https://github.com/yujilow1220/my-notes.git'));
	});
});


