angular.module('solocoApp', [
	'ui.router',
	'sitehome'
])
.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('sitehome', {
			url: '/',
			templateUrl: 'components/sitehome/sitehome.html',
			controller: 'SitehomeController'
		});
		
	$urlRouterProvider.otherwise("/");
});
	
	