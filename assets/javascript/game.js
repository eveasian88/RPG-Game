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
