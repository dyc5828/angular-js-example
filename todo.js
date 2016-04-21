console.log('todo.js');

// angular app
var app = angular.module('todo',[]);

// controllers
app.controller('ToDoController', function($scope, DateService, StatService, tstr) {
	var vm = this;

	// PRIVATE
	function _init() {
		console.log('ToDoController _init()');
		vm.tasks = [
			{
				name: 'Angular Guest Lecutre',
				date: '4/21/2016',
				description: 'Intro to Angular for ITP 301',
				done: 0, 
			},
			{
				name: 'Prepare Angular Lecutre',
				date: '4/20/2016',
				description: 'Finish Angular Example and Finalize Slides',
				done: 1, 
			},
			{
				name: 'Chill',
				date: '4/21/2016',
				description: 'Relax after the lecture',
				done: 0, 
			},
		]
	}
	$scope.$watch('vm.tasks', function() {
		vm.remaining = StatService.countRemaining(vm.tasks);
		vm.done = StatService.countDone(vm.tasks);
	}, true);

	// PUBLIC
	vm.tasks = [];
	vm.task = {};
	vm.search = '';
	vm.newTask = {};
	vm.remaining = 0;
	vm.done = 0;
	vm.toggle = function(task) {
		// console.log('vm.done()', task);
		vm.tasks[vm.tasks.indexOf(task)].done ^= true;
		console.log(vm.tasks);
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
		tstr.warning('Done Tasks Cleared.');
		// console.log(vm.tasks);
		vm.task = vm.tasks.indexOf(vm.task) == -1 ? {} : vm.task ;
	}
	vm.addNew = function() {
		console.log('vm.addNew()', vm.newTask);
		vm.newTask.done = 0;
		vm.newTask.date = DateService.format(vm.newTask.date);
		vm.tasks.unshift(vm.newTask);
		tstr.success(vm.newTask.name, 'Task Added!');
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
app.value('tstr', window.toastr);

// servies
app.factory('DateService', function(mnt) {
	function format(timeStr) {
		return mnt(timeStr).format('MMMM D, YYYY')
	}

	return {
		format: format,
	}
});

app.factory('StatService', function() {
	function countRemaining(tasks) {
		var num = 0;
		tasks.forEach(function(task) {
			task.done == false ? num++ : null;
		});
		return num;
	}
	function countDone(tasks) {
		var num = 0;
		tasks.forEach(function(task) {
			task.done == true ? num++ : null;
		});
		return num;
	}

	return {
		countRemaining: countRemaining,
		countDone: countDone,
	}
})



