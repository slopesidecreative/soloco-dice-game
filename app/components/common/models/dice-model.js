angular.module('site.models.dice',[])
	.service('DiceModel', function(){
	var model = this;
	var dice = [];
			
	var diceIcons = ['fi-die-one', 'fi-die-two','fi-die-three', 'fi-die-four', 'fi-die-five', 'fi-die-six'];
			
	// the Die model
	function die(index) {
		this.diceIcon = diceIcons[index];
		this.selected = false;
	}
	// convert graphic to score
	// remember: 4 counts as zero!
	model.iconToNumber = function(die){
		switch(die.diceIcon){
			case 'fi-die-one':
				return 1;
				break;
			case 'fi-die-two':
				return 2;
				break;
			case 'fi-die-three':
				return 3;
				break;
			case 'fi-die-four':
				return 0;
				break;
			case 'fi-die-five':
				return 5;
				break;
			case 'fi-die-six':
				return 6;
				break;
			default:
				return 10000;
				break;
				}
		}
		
	model.numberToIcon = function(numb){
		// find the icon in the array of icons
		console.log(diceIcons[numb-1]);
		return diceIcons[numb-1];
	}

	model.getDice = function(diceCount){
	  // Create the dice models
	  for(i=0; i < diceCount; i++){
		  dice.push(new die(i));
	  }
	  return dice;
	};
	
	function getRandom(){
		// Returns a random integer between min (included) and max (included)
		// Using Math.round() will give you a non-uniform distribution!
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
		
		// number is the index of the array, so the min is 0
		  var min = 0, max = 5;
		  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	model.rollDie = function(){
		// get a random number between 0 and 5
		// matches diceIcons array index
		var icon = diceIcons[getRandom()];
		return icon;
	}
		
});
	
