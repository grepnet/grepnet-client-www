require('../bower_components/angular/angular');
require('../bower_components/angular-ui-router/release/angular-ui-router');

require('./vendor/proposal-string-pad-left-right/polyfill');

const mod = angular.module('grepnet', ['ui.router']);

/* @ngInject */
mod.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider.state('list-of-tasks', {
        url: '/list',
        templateUrl: 'templates/list-of-tasks.html'
    });

    $stateProvider.state('add-task', {
        url: '/add',
        templateUrl: 'templates/update-task.html',
        controller: ($rootScope) => {
            $rootScope.mode = 'add';
        }
    });

    $stateProvider.state('edit-task', {
        url: '/edit/:index',
        templateUrl: 'templates/update-task.html',
        controller: ($rootScope, $scope, $state, $stateParams, tasks) => {
            const task = tasks.at($stateParams.index);

            if (!task) {
                $state.go('list-of-tasks');
                return;
            }

            $scope.title = task.title;
            $scope.url = task.url;
            $scope.phrase = task.phrase;
            $scope.delay = task.delay;

            $rootScope.mode = 'edit';
        }
    });

    $urlRouterProvider.otherwise('list');
});

import ApplicationController from './controllers/ApplicationController';
import TaskDirective from './directives/TaskCard';
import SeconderFilter from './filters/Seconder';
import GrepnetNotificationFactory from './services/GrepnetNotificationFactory';
import GrepnetStorage from './services/GrepnetStorage';
import GrepnetTasksFactory from './services/GrepnetTasksFactory';

mod.controller('ApplicationController', ApplicationController);
mod.directive('taskCard', TaskDirective);
mod.filter('seconder', SeconderFilter);
mod.service('notification', GrepnetNotificationFactory);
mod.service('storage', GrepnetStorage);
mod.service('tasks', GrepnetTasksFactory);

window.addEventListener('load', () => {
    if (window.Notification && Notification.permission !== 'granted') {
        Notification.requestPermission((status) => {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    }

    angular.bootstrap(document, ['grepnet']);
});
