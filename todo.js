console.log('todo.js');

// angular app
var app = angular.module('todo',[]);

// controllers
app.controller('ToDoController', function() {
	var vm = this;

	// PRIVATE
	function _init() {
		console.log('ToDoController _init()');
		vm.test = 'hello world';
		vm.tasks = [
			{
				name: 'Angular Guest Lecutre',
				date: '4/21/2016',
				description: 'Intro to Angular for ITP 301',
				done: false, 
			},
			{
				name: 'Prepare Angular Lecutre',
				date: '4/20/2016',
				description: 'Finish Angular Example and Finalize Slides',
				done: true, 
			},
			{
				name: 'Chill',
				date: '4/21/2016',
				description: 'Relax after the lecture',
				done: false, 
			},
		]
	}

	// PUBLIC
	vm.test = 'hello';
	vm.tasks = [];
	vm.task = {};
	
	// RUN
	_init();
});