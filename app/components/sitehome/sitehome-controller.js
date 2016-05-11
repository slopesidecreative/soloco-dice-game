angular.module('sitehome').controller('SitehomeController', ['$scope', '$http', '$window','DiceModel',
	function ($scope, $http, $window, DiceModel) {
	
	var sitehomeController = this;
	
	this.getDice				= DiceModel.getDice;
	this.iconToNumber			= DiceModel.iconToNumber;
	this.numberToIcon 			= DiceModel.numberToIcon;
	this.rollDie				= DiceModel.rollDie;

	$scope.gameStart = true;
	$scope.active = false;	   // prevent play at start, negated by die.selected
	$scope.choiceMade = true;  // allow roll to start after at least one die chosen
	$scope.rolling = true;    // when the dice are being rolled, disallow selection
	$scope.scoreTotal = 0;
	$scope.diceCount = 5;	  // constant: how many die?
	$scope.dice = [];
	$scope.remainingRolls = $scope.diceCount;
	
	
	$scope.dieClicked = function(die){
		if(die.selected !== true && $scope.rolling !== true & $scope.active === true){
		  $scope.remainingRolls--;
		  $scope.choiceMade = true;
		  // add the value to total
		  // after converting graphic to value
		  var dNumb = sitehomeController.iconToNumber(die);
		  //console.log('die number: ',dNumb);
		  $scope.scoreTotal += dNumb;
		  // set the die 'selected' property to 'true', can only click once
		  die.selected = true;
		}
		//console.log('dice clicked',die);
	}
	
	$scope.rollDice = function(){
	    // must make selection before rolling, or its the start of the game
		if($scope.choiceMade === true || $scope.gameStart === true){
		    $scope.rolling = true;
			$scope.choiceMade = false;
			$scope.gameStart = false;
			$scope.active = true;
			// for each $scope.dice if selected ! true
			// get a random number and assign it to it's icon
			for(var i=0; i < $scope.diceCount; i++){
				if($scope.dice[i].selected !== true){
					//console.log('roll this die: ', $scope.dice[i]);
					$scope.dice[i].diceIcon = sitehomeController.rollDie();
				}
			}
		$scope.rolling = false;
		}
	}
	
	$scope.resetDice = function(){
	  for(var i=0; i < $scope.diceCount; i++){
	    //console.log('reset this die: ', $scope.dice[i]);
	    // un-select the die
		$scope.dice[i].selected = false;
	  }
	}
	
	$scope.resetGame = function(){
		$scope.rolling = false;
		$scope.scoreTotal = 0;
		$scope.diceCount = 5;
		$scope.remainingRolls = $scope.diceCount;
		$scope.resetDice();
		$scope.gameStart = true;
		$scope.rollDice();
	}
	
	// for keeping the boxes square
	// make this a DIRECTIVE
	$(window).resize(function() {
	  equalHeight();
	});
	function equalHeight(){
		var self = $('.equalheight').width();
		$('.equalheight').css({'height':self+'px'});
	};

	
// begin ---------------------
	
	// make blocks equal at start or they aren't until resize
	equalHeight();
	// get some dice
	$scope.dice = sitehomeController.getDice($scope.diceCount);
	$scope.resetDice();
	
	// roll the dice
	//$scope.rollDice();
	// game on
	//$scope.active = true;
	
}]);