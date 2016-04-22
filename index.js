#!/usr/bin/env node

'use strict';
var argv = require('argv');

var targets = argv.run().targets;
var state = targets.pop();

switch(state){

	case 'show':
		console.log('this is show');
		break;

	default:
		console.log('others');
		break;
}


