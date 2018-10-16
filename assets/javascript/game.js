// global variables
$(document).ready(function () {
 
  // array of playing characters
  var characters = {
    "gandalf": {
      "name": "gandalf",
      "health": 200,
      "attack": 18,
      "enemyAttackBack": 25,
      "imageUrl": "assets/images/gandalf.jpg",
      "fighterImgUrl": "assets/images/gandalf-left.gif",
      "defenderImgUrl": "assets/images/gandalf-right.gif"
    },

    "legolas": {
      "name": "legolas",
      "health": 200,
      "attack": 24,
      "enemyAttackBack": 25,
      "imageUrl": "assets/images/legolas.jpg",
      "fighterImgUrl": "assets/images/legolas-left.gif",
      "defenderImgUrl": "assets/images/legolas-right.gif"
    },

    "saruman": {
      "name": "saruman",
      "health": 200,
      "attack": 10,
      "enemyAttackBack": 10,
      "imageUrl": "assets/images/saruman.jpg",
      "fighterImgUrl": "assets/images/saruman-left.gif",
      "defenderImgUrl": "assets/images/saruman-right.gif"
    },

    "azog": {
      "name": "azog",
      "health": 200,
      "attack": 7,
      "enemyAttackBack": 5,
      "imageUrl": "assets/images/azog.jpg",
      "fighterImgUrl": "assets/images/azog-left.gif",
      "defenderImgUrl": "assets/images/azog-right.gif"
    }
  };


  var currFighter;
  var currDefender;
  var nextEnemy = [];
  var turnCounter = 1;
  var killCount = 0;

  // define audio clips here
  var gameOver = new Audio ('assets/audio/gameOver.m4a');
  var lostSound = new Audio ('assets/audio/lostSound.m4a');
  var attackSound = new Audio ('assets/audio/attackSound.m4a');
  var playerSound = new Audio ('assets/audio/playerSound.m4a');
  var themeMusic = new Audio('assets/audio/themeMusic.m4a');



  function printAllinOne(character, renderArea, makeChar) {
    // character: obj, renderArea: class/id, makeChar: string
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    if (renderArea == '#fighter') {
      var charImage = $("<img alt='image' class='character-image img-fluid rounded'>").attr("src", character.fighterImgUrl);

      var powerBarHolder = $("<div class='power-bar-holder'>");
      var powerBar = $("<div class='power-bar' id='bar1'>").each(function () {
        var percentage = parseInt(character.health) / 200 * 100;
        if (percentage > 0) {

          $(this).animate({ 'width': '' + percentage + '%' }, 'slow');
          $(powerBarHolder).add(this);
          console.log(character.name + "   Health : " + percentage);

        } else {

          $(this).css({ 'color': 'black', 'background': 'none' }, 'slow');
          console.log(character.name + "   Health : " + percentage);
        }

      });

    } else if (renderArea == '#defender') {
      var charImage = $("<img alt='image' class='character-image img-fluid rounded'>").attr("src", character.defenderImgUrl);
      var powerBarHolder = $("<div class='power-bar-holder'>");
      var powerBar = $("<div class='power-bar' id='bar2'>").each(function () {

        var percentage = parseInt(character.health) / 200 * 100;
        if (percentage > 0) {

          $(this).animate({ 'width': '' + percentage + '%' }, 'slow');

          console.log(character.name + "   Health : " + percentage);

        } else {
          console.log(character.name + "   Health : " + percentage);
          $(this).css({ 'color': 'black', 'background': 'none' }, 'slow');
        }

      });

    } else {
      var charImage = $("<img alt='image' class='character-image img-fluid rounded'>").attr("src", character.imageUrl);
    }

    var charHealth = $("<div class='character-health'>").text(character.health);
    var powerBarDiv = $(powerBarHolder).append(powerBar);

    // put all the elements together into the character div
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

  // create function to render game message to DOM
  function printMessage(message) {
    var gameMesageSet = $("#gameMessage");
    var newMessage = $("<div>").text(message);
    gameMesageSet.append(newMessage);

    if (message == 'clearMessage') {
      gameMesageSet.text('');
    }
  };

  function printCharacters(charObj, areaRender) {
    // render all characters on the first page
    if (areaRender == '#characters-section') {
      $(areaRender).empty();

      // for ....in statement iterates over the enumerable properties of character array
      for (var property in charObj) {
        printAllinOne(charObj[property], areaRender, '');
      }
    }

    //render player character
    if (areaRender == '#fighter') {
      $('#fighter').prepend("Your Character");
      printAllinOne(charObj, areaRender, '');
      $('#attack-button').css('visibility', 'visible');
      $('#fight-section').css('visibility', 'visible');
      $('#gameMessage').css('visibility', 'visible');
    }

    // print the next enemy
    if (areaRender == '#nextEnemy-section') {
      $('#nextEnemy-section').prepend("Enemies Available To Attack");
      for (var i = 0; i < charObj.length; i++) {

        printAllinOne(charObj[i], areaRender, 'enemy');
      }
      // render one enemy to defender area
      $(document).on('click', '.enemy', function () {
        // select a combatant to fight
        name = ($(this).data('name'));
        // if defender area is empty
        if ($('#defender').children().length === 0) {
          printCharacters(name, '#defender');

          $(this).hide();
          printMessage("clearMessage");
        }
      });
    }
    // render defender
    if (areaRender == '#defender') {
      $(areaRender).empty();

      for (var i = 0; i < nextEnemy.length; i++) {
        // add enemy to defender area
        if (nextEnemy[i].name == charObj) {
          $('#defender').append("Defender")
          printAllinOne(nextEnemy[i], areaRender, 'defender');
          playerSound.play(); 
        }
      }
    }
    // re-render defender when attacked
    if (areaRender == 'playerDamage') {
      $('#defender').empty();
      $('#defender').append("Defender")
      printAllinOne(charObj, '#defender', 'defender');
      attackSound.play();
    }
    // re-render player character when attacked
    if (areaRender == 'enemyDamage') {
      $('#fighter').empty();
      $('#fighter').prepend("Your Character");
      printAllinOne(charObj, '#fighter', '');
    }
    // render defeated enemy
    if (areaRender == 'enemyDefeated') {
      $('#defender').empty();
      var gameStateMessage = "you have defeated " + charObj.name + ", choose another enemy to fight.";
      printMessage(gameStateMessage);
      lostSound.play();
    }
  };

  // restarts the game - renders a reset button
  function restartGame(inputEndGame) {
    // when 'restart' button is clicked, reloads the page.
    var restart = $('<button class="btn btn-danger">Restart</button>').click(function () {
      location.reload();
    });

    var gameState = $("<div>").text(inputEndGame);
    $("#gameMessage").append(gameState);
    $("#gameMessage").after(restart);
  };



  // main program
  // this is to render all characters for user to choose their computer
  printCharacters(characters, '#characters-section');
  // play lego LOTR background music
  themeMusic.play(); // check why music doesn't play in this location

  $(document).on('click', '.character', function () {
    // themeMusic.play(); // plays theme music at same time that player fight, need to fix
    name = $(this).data('name');
    
    // only when no player char has been selected (load the next enemy array on the first time)
    if (!currFighter) {

      currFighter = characters[name];

      // for ....in statement iterates over the enumerable properties of character array
      for (var property in characters) {
        if (property != name) {
          nextEnemy.push(characters[property]);
        }
      }

      $("#characters-section").hide();
      printCharacters(currFighter, '#fighter');
      // this is to render all characters for user to choose to fight against
      printCharacters(nextEnemy, '#nextEnemy-section');
      playerSound.play();
    }
  });


  // load the following function when attack button on click
  $("#attack-button").on("click", function () {
    // if defender area has enemy
    if ($('#defender').children().length !== 0) {
      // defender state change
      var attackMessage = "you attacked " + currDefender.name + " for " + (currFighter.attack * turnCounter) + " damage.";
      printMessage("clearMessage");

      // calculate the health points for defender
      currDefender.health = currDefender.health - (currFighter.attack * turnCounter);

      // win conditions
      if (currDefender.health > 0) {
        // enemy not dead keep playing
        printCharacters(currDefender, 'playerDamage');
        // player state change
        var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemyAttackBack + " damage.";
        printMessage(attackMessage);
        printMessage(counterAttackMessage);

        // calculate the health points for fighter  
        currFighter.health = currFighter.health - currDefender.enemyAttackBack;
        printCharacters(currFighter, 'enemyDamage');
        if (currFighter.health <= 0) {
          printMessage("clearMessage");
          restartGame("You have been defeated!!! GAME OVER!!!");
          gameOver.play();
          $("#attack-button").unbind("click");
          $('#nextEnemy-section').text(" ");
        }
      }

      else {
        printCharacters(currDefender, 'enemyDefeated');
        killCount++;
        if (killCount >= 3) {
          printMessage("clearMessage");
          restartGame("You Won!!! GAME OVER!!!");
          lostSound.play();
          $('#nextEnemy-section').text(" ");
        }
      }
      turnCounter++;
    } else {
      printMessage("clearMessage");
      printMessage("there's no enemy here.");
      lostSound.play();
    }
  });
  
});     
