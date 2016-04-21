console.log('todo.js');

// angular app
var app = angular.module('todo',[]);

// controllers
app.controller('ToDoController', function(DateService) {
	var vm = this;

	// PRIVATE
	function _init() {
		console.log('ToDoController _init()');
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
	vm.tasks = [];
	vm.task = {};
	vm.search = '';
	vm.newTask = {};
	vm.done = function(task) {
		// console.log('vm.done()', task);
		vm.tasks[vm.tasks.indexOf(task)].done = true;
	}
	vm.undone = function(task) {
		// console.log('vm.undone()', task);
		vm.tasks[vm.tasks.indexOf(task)].done = false;
	}
	vm.detail = function(task) {
		// console.log('vm.detail()', task);
		vm.task = vm.tasks[vm.tasks.indexOf(task)];
	}
	vm.clear = function() {
		// console.log('vm.clear()');
		vm.tasks = vm.tasks.filter(function(task) {
			return task.done ? null : task ; 
		});
		// console.log(vm.tasks);
		vm.task = vm.tasks.indexOf(vm.task) == -1 ? {} : vm.task ;
	}
	vm.addNew = function() {
		console.log('vm.addNew()', vm.newTask);
		vm.newTask.done = false;
		vm.newTask.date = DateService.format(vm.newTask.date);
		vm.tasks.unshift(vm.newTask);
		vm.clearNew();
	}
	vm.clearNew = function() {
		console.log('vm.clearNew()');
		vm.newTask = {};
	}
	
	// RUN
	_init();
});

// values
app.value('mnt', window.moment);

// servies
app.factory('DateService', function(mnt) {
	function format(timeStr) {
		return mnt(timeStr).format('MMMM D, YYYY')
	}

	return {
		format: format,
	}
});



