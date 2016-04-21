// console.log('todo.js');

// angular app
var app = angular.module('todo',[]);

// controllers
app.controller('ToDoController', function($scope, DateService, StatService, tstr, storage, json) {
	var vm = this;

	// PRIVATE
	function _init() {
		// console.log('ToDoController _init()');
		if(storage.tasks) {
			// console.log(storage.tasks);
			vm.tasks = json.parse(storage.tasks);
		}
	}
	$scope.$watch('vm.tasks', function() {
		// console.log('vm.tasks changed');
		vm.remaining = StatService.countRemaining(vm.tasks);
		vm.done = StatService.countDone(vm.tasks);
	}, true);
	function _save() {
		// console.log('ToDoController _save()');
		storage.tasks = json.stringify(vm.tasks);
	}

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
		// console.log(vm.tasks);
		_save();
	}
	vm.detail = function(task) {
		console.log('vm.detail()', task);
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
		_save();
	}
	vm.addNew = function() {
		// console.log('vm.addNew()', vm.newTask);
		vm.newTask.done = 0;
		vm.newTask.date = DateService.format(vm.newTask.date);
		vm.tasks.unshift(vm.newTask);
		tstr.success(vm.newTask.name, 'Task Added!');
		vm.clearNew();
		_save();
	}
	vm.clearNew = function() {
		// console.log('vm.clearNew()');
		vm.newTask = {};
	}
	
	// RUN
	_init();
});

// values
app.value('mnt', window.moment);
app.value('tstr', window.toastr);
app.value('storage', window.localStorage);
app.value('json', window.JSON);

// servies
app.factory('DateService', function(mnt) {
	function format(timeStr) {
		return mnt(timeStr).format('MMMM D, YYYY')
	}

	function after(timeStr) {
		return mnt().isAfter(new Date(timeStr), 'day');
	}

	return {
		format: format,
		after: after,
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
});

// directives
app.directive('newTask', function() {
	return {
		restrict: 'E',
		templateUrl: '/new-task.html',
	}
});

app.directive('taskDetail', function() {
	return {
		restrict: 'E',
		templateUrl: '/task-detail.html',
	}
});

app.directive('todoList', function() {
	return {
		restrict: 'E',
		templateUrl: '/todo-list.html',
	}
});

app.directive('doneList', function() {
	return {
		restrict: 'E',
		templateUrl: '/done-list.html',
	}
});

app.directive('late', function(DateService) {
	return {
		restrict: 'A',
		scope: {
			late: '=',
		},
		link: function($scope, $el) {
			console.log($scope.late);
			if(DateService.after($scope.late)) {
				$el.addClass('text-danger');
			}
		},
	}
});






