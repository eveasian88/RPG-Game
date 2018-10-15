// global variables
$(document).ready(function () {

  // array of fighting characters
  var characters = {
    "gandalf": {
      "name": "gandalf",
      "health": 200,
      "attack": 18,
      "enemyAttackBack": 25,
      "imageUrl": "assets/images/gandalf.jpg",
      "fighterImgUrl": "assets/images/gandalf-mov.gif"
    },
    "legolas": {
      "name": "legolas",
      "health": 200,
      "attack": 24,
      "enemyAttackBack": 25,
      "imageUrl": "assets/images/legolas.jpg",
      "fighterImgUrl": "assets/images/legolas-mov.gif"
    },
    "saruman": {
      "name": "saruman",
      "health": 200,
      "attack": 10,
      "enemyAttackBack": 10,
      "imageUrl": "assets/images/saruman.jpg",
      "fighterImgUrl": "assets/images/saruman-mov.gif"
    },
    "azog": {
      "name": "azog",
      "health": 200,
      "attack": 7,
      "enemyAttackBack": 5,
      "imageUrl": "assets/images/azog.jpg",
      "fighterImgUrl": "assets/images/azog-mov.gif"
    }
  };


var currFighter;
var currDefender;
var nextEnemy = [];
var indexofSelChar;
var attackResult;
var turnCounter = 1;
var killCount = 0;


function  printAllinOne(character, renderArea, makeChar) {
  //character: obj, renderArea: class/id, makeChar: string
  var charDiv = $("<div class='character' data-name='" + character.name + "'>");
  var charName = $("<div class='character-name'>").text(character.name);
  if (renderArea == '#fighter') {
    var charImage = $("<img alt='image' class='character-image img-fluid rounded'>").attr("src", character.fighterImgUrl); 

  var powerBarHolder = $("<div class='power-bar-holder'>");  
  var powerBar = $("<div class='power-bar' id='bar1'>").each(function(){
    var percentage = parseInt(character.health)/200*100;
      if(percentage > 0){

        $(this).animate({'width':''+ percentage +'%'}, 'slow');
        $(powerBarHolder).add(this);
        console.log(character.name + "   Health : " + percentage);
        
      }else{
       
        $(this).css({'color':'black', 'background':'none'}, 'slow');
        console.log(character.name + "   Health : " + percentage);
      }
    });

  } else if (renderArea == '#defender' ) {
    var charImage = $("<img alt='image' class='character-image img-fluid rounded'>").attr("src", character.defenderImgUrl);
    var powerBarHolder = $("<div class='power-bar-holder'>");  
    var powerBar = $("<div class='power-bar' id='bar2'>").each(function(){
     
      var percentage = parseInt(character.health)/200*100;
      if(percentage > 0){

        $(this).animate({'width':''+ percentage +'%'}, 'slow');
        console.log(character.name + "   Health : " + percentage);
   
      }else{
        console.log(character.name + "   Health : " + percentage);
        $(this).css({'color':'black', 'background':'none'}, 'slow');
      }
    });

  } else {
    var charImage = $("<img alt='image' class='character-image img-fluid rounded'>").attr("src", character.imageUrl);
  }
  
  var charHealth = $("<div class='character-health'>").text(character.health);
  var powerBarDiv = $(powerBarHolder).append(powerBar);
  // put all the elements together into the character div.
 charDiv.append(charName).append(charImage).append(charHealth).append(powerBarDiv);
  $(renderArea).append(charDiv);
  // capitalizes the first letter in characters name
  $('.character-name').css('textTransform', 'capitalize');

  if (makeChar == 'enemy') {
    $(charDiv).addClass('enemy');
  } else if (makeChar == 'defender') {
    currDefender = character;
    $(charDiv).addClass('target-enemy');
  }
};



}); // end closing brackets from top