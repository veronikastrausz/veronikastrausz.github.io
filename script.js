//GLOBAL VARIABLES
let player1;
let player2;
let player3;
let player4;

//gameStart response:
let players;
let currentTopcard;
let currentPlayer;
let currentValue;
let gameID;

let reloadRequiredPlayer1 = false;
let reloadRequiredPlayer2 = false;
let reloadRequiredPlayer3 = false;
let reloadRequiredPlayer4 = false;

let nameArray;

//EVENTHANDLER
//modal anzeigen
$(document).ready(function() {
  $('#modal-names').modal('show');
  $("#modal-end-of-game").modal('hide');
  $("#modal-new-color").modal('hide');
  $("#button-restart-game").click(restartGame); //neu
});
//clickhandler
$("#button-start-game").click(createPlayers);

$("#button-change-color").click(chooseNewColor);

$("#stack img").click(drawCard);

$("#player-handcards").on("click", "img", function() {

  $("img").removeClass('wrong-card');
  $("ul").removeClass("wrong-player");

  if ("handcards1" == $(this).closest("ul").attr("id") && currentPlayer == players[0].Player) {
    if (!$(this).hasClass("wrong-card")) {
      $(this).addClass("wrong-card");
    }
    console.log("Player 1 clicked on Card.");
    currentValue = $(this).data("value");
    currentColor = $(this).data("color");
    checkCard(currentValue, currentColor);

    //console.log($(this).data("value"), $(this).data("color"));

  } else if ("handcards2" == $(this).closest("ul").attr("id") && currentPlayer == players[1].Player) {
    if (!$(this).hasClass("wrong-card")) {
      $(this).addClass("wrong-card");
    }
    console.log("Player 2 clicked on Card.");
    currentValue = $(this).data("value");
    currentColor = $(this).data("color");
    checkCard(currentValue, currentColor);


  } else if ("handcards3" == $(this).closest("ul").attr("id") && currentPlayer == players[2].Player) {
    if (!$(this).hasClass("wrong-card")) {
      $(this).addClass("wrong-card");
    }
    console.log("Player 3 clicked on Card.");
    currentValue = $(this).data("value");
    currentColor = $(this).data("color");
    checkCard(currentValue, currentColor);


  } else if ("handcards4" == $(this).closest("ul").attr("id") && currentPlayer == players[3].Player) {
    if (!$(this).hasClass("wrong-card")) {
      $(this).addClass("wrong-card");
    }
    console.log("Player 4 clicked on Card.");
    currentValue = $(this).data("value");
    currentColor = $(this).data("color");
    checkCard(currentValue, currentColor);

  } else {
    console.log("Player wanted to play another players cards", $(this).closest("ul").attr("id"));
    console.log("Next Player", currentPlayer);
    console.log("Current Player", players[0].Player);

    if (!$(this).closest("ul").hasClass("wrong-player")) {
      $(this).closest("ul").addClass("wrong-player");
      document.getElementById("sound-wrong").play();
      //$("#sound-wrong").play();
    }

  }

});

//FUNCTIONS

function checkCard(value, cardColor) {
  $("ul").removeClass("wrong-player");

  if ("Black" == cardColor) {
    $("#modal-new-color").modal('show');
  } else {
    //wenns keine schwarze is, einfach ohne wild-wert zurück geben
    playCard(value, cardColor, "");
  }
}

function chooseNewColor() {
  let newColor = $("#modal-new-color").find("option:selected").text();
  console.log("Selected: ", $("#modal-new-color select"));
  console.log("New Color = ", newColor);
  $("#modal-new-color").modal('hide');
  playCard(currentValue, currentColor, newColor);
  document.getElementById("sound-change-color").play();
}

function setPlayerNames() {

  let playerName1 = $("#playerBadge1").text();
  $("#playerBadge1").text(playerName1 + " " + players[0].Player)

  let playerName2 = $("#playerBadge2").text();
  $("#playerBadge2").text(playerName2 + " " + players[1].Player)

  let playerName3 = $("#playerBadge3").text();
  $("#playerBadge3").text(playerName3 + " " + players[2].Player)

  let playerName4 = $("#playerBadge4").text();
  $("#playerBadge4").text(playerName4 + " " + players[3].Player)

}

function currentPlayerReloadRequired() {
  if (currentPlayer == players[0].Player) {
    reloadRequiredPlayer1 = true;
  } else if (currentPlayer == players[1].Player) {
    reloadRequiredPlayer2 = true;
  } else if (currentPlayer == players[2].Player) {
    reloadRequiredPlayer3 = true;
  } else if (currentPlayer == players[3].Player) {
    reloadRequiredPlayer4 = true;
  }
}

function reloadBadge() {

  $("#player-handcards span").remove();
  $(".card").removeClass("current-player");

  if ($("#player-handcards button").hasClass("btn-success")) {
    $("#player-handcards button").removeClass("btn-success");
    $("#player-handcards button").addClass("btn-dark");
  }

  if (currentPlayer == players[0].Player) {
    if ($("#playerBadge1").hasClass("btn-dark")) {
      $("#playerBadge1").removeClass("btn-dark");
      $("#playerBadge1").addClass("btn-success");
      $("#playerBadge1").closest(".card").addClass("current-player");
    }
    $("<span class='badge badge-light ml-2'>It's your turn!</span>").appendTo('#playerBadge1');
    reloadRequiredPlayer1 = true;
    reloadHandCards();
  }
  else if (currentPlayer == players[1].Player) {
    if ($("#playerBadge2").hasClass("btn-dark")) {
      $("#playerBadge2").removeClass("btn-dark");
      $("#playerBadge2").addClass("btn-success");
      $("#playerBadge2").closest(".card").addClass("current-player");
    }
    $("<span class='badge badge-light ml-2'>It's your turn!</span>").appendTo('#playerBadge2');
    reloadRequiredPlayer2 = true;
    reloadHandCards();
  }
  else if (currentPlayer == players[2].Player) {
    if ($("#playerBadge3").hasClass("btn-dark")) {
      $("#playerBadge3").removeClass("btn-dark");
      $("#playerBadge3").addClass("btn-success");
      $("#playerBadge3").closest(".card").addClass("current-player");
    }
    $("<span class='badge badge-light ml-2'>It's your turn!</span>").appendTo('#playerBadge3');
    reloadRequiredPlayer3 = true;
    reloadHandCards();
  }
  else if (currentPlayer == players[3].Player) {
    if ($("#playerBadge4").hasClass("btn-dark")) {
      $("#playerBadge4").removeClass("btn-dark");
      $("#playerBadge4").addClass("btn-success");
      $("#playerBadge4").closest(".card").addClass("current-player");
    }
    $("<span class='badge badge-light ml-2'>It's your turn!</span>").appendTo('#playerBadge4');
    reloadRequiredPlayer4 = true;
    reloadHandCards();
  }

}

function createPlayers() {
  //prüfen, ob felder ausgefüllt sind
  if ('' != $("#player1").val() && '' != $("#player2").val() && '' != $("#player3").val() && '' != $("#player4").val()) {
    //liste von allen spielern erstellen

    let inputFields = $("#modal-names input:text");

    // i = index 1, k = index 2
    for (let i = 0; i < 4; i++) {
      //val() --> nur auf $-elemente anwendbar! hier direkt aufs DOM-Element zugreifen besser!!
      console.log(inputFields[i].value);
      let counter = 0;
      for (let k = 0; k < 4; k++) {
        if (inputFields[i].value == inputFields[k].value) {
          counter++;
        }
        //püft, ob es zwei gleiche werte/namen gibt
        if (2 <= counter) {
          console.log("Douplicate found, try again.");
          //wenn es den alert schon gibt - nicht neu erstellen
          if (!$('#modal-names .modal-body:last').hasClass('alert')) {
            let appendAlert = $("#modal-names .modal-body:last");
            appendAlert.append("<div id='errorUserNames' class='text-center alert'> Douplicated names found </div>")
          }
          return;
        }
      }
    }
    console.log("No douplicates.");

    player1 = $("#player1").val();
    console.log("Player 1 " + player1 + " joined the Game");
    player2 = $("#player2").val();
    console.log("Player 2 " + player2 + " joined the Game");
    player3 = $("#player3").val();
    console.log("Player 3 " + player3 + " joined the Game");
    player4 = $("#player4").val();
    console.log("Player 4 " + player4 + " joined the Game");

    nameArray = inputFields.map(function() {
      return this.value;
    }).get();

    gameStart(nameArray);

    $('#modal-names').modal('hide');

  } else {
    console.log("Nicht alle Namens-Felder waren ausgefüllt.");

  }
}

function reloadTopCard(value, color) {
  currentTopcard = null;
  currentTopcard = {
    Value: value,
    Color: color,
  };

  $('#topcard img').remove();
  showTopCard();
}

function reloadHandCards() {
  if (reloadRequiredPlayer1) {
    $("#handcards1 li").remove();
    showHandCards();
  }
  if (reloadRequiredPlayer2) {
    $("#handcards2 li").remove();
    showHandCards();
  }
  if (reloadRequiredPlayer3) {
    $("#handcards3 li").remove();
    showHandCards();
  }
  if (reloadRequiredPlayer4) {
    $("#handcards4 li").remove();
    showHandCards();
  }
}

function showTopCard() {
  let showCard = convertCardObjectToImgPath(currentTopcard.Value, currentTopcard.Color);
  $("<img class='mr-2' src='" + showCard + "'> </img>").appendTo('#topcard');
}

function showHandCards() {
//  console.log(players);

  for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
    if (currentPlayer == players[playerIndex].Player) {

      if (0 == playerIndex && 1 > $('#handcards1').children().length) {
        for (let handCardIndex = 0; handCardIndex < players[playerIndex].Cards.length; handCardIndex++) {
          let handCardToAppend = convertCardObjectToImgPath(players[playerIndex].Cards[handCardIndex].Value, players[playerIndex].Cards[handCardIndex].Color);

          let liItem = $("<li class='list-inline-item'> </li>").appendTo('#handcards1');
          $("<img class='mr-2' src='" + handCardToAppend + "'> </img>").data("value", players[playerIndex].Cards[handCardIndex].Value).data("color", players[playerIndex].Cards[handCardIndex].Color).appendTo(liItem);
        }
      } else if (1 == playerIndex && 1 > $('#handcards2').children().length) {
        for (let handCardIndex = 0; handCardIndex < players[playerIndex].Cards.length; handCardIndex++) {
          let handCardToAppend = convertCardObjectToImgPath(players[playerIndex].Cards[handCardIndex].Value, players[playerIndex].Cards[handCardIndex].Color);

          let liItem = $("<li class='list-inline-item'> </li>").appendTo('#handcards2');
          $("<img class='mr-2' src='" + handCardToAppend + "'> </img>").data("value", players[playerIndex].Cards[handCardIndex].Value).data("color", players[playerIndex].Cards[handCardIndex].Color).appendTo(liItem);
        }
      } else if (2 == playerIndex && 1 > $('#handcards3').children().length) {
        for (let handCardIndex = 0; handCardIndex < players[playerIndex].Cards.length; handCardIndex++) {
          let handCardToAppend = convertCardObjectToImgPath(players[playerIndex].Cards[handCardIndex].Value, players[playerIndex].Cards[handCardIndex].Color);

          let liItem = $("<li class='list-inline-item'> </li>").appendTo('#handcards3');
          $("<img class='mr-2' src='" + handCardToAppend + "'> </img>").data("value", players[playerIndex].Cards[handCardIndex].Value).data("color", players[playerIndex].Cards[handCardIndex].Color).appendTo(liItem);
        }
      } else if (3 == playerIndex && 1 > $('#handcards4').children().length) {
        for (let handCardIndex = 0; handCardIndex < players[playerIndex].Cards.length; handCardIndex++) {
          let handCardToAppend = convertCardObjectToImgPath(players[playerIndex].Cards[handCardIndex].Value, players[playerIndex].Cards[handCardIndex].Color);

          let liItem = $("<li class='list-inline-item'> </li>").appendTo('#handcards4');
          $("<img class='mr-2' src='" + handCardToAppend + "'> </img>").data("value", players[playerIndex].Cards[handCardIndex].Value).data("color", players[playerIndex].Cards[handCardIndex].Color).appendTo(liItem);
        }
      }
    } else {
      if (0 == playerIndex && 1 > $('#handcards1').children().length) {
        for (let handCardIndex = 0; handCardIndex < players[playerIndex].Cards.length; handCardIndex++) {

          let liItem = $("<li class='list-inline-item'> </li>").appendTo('#handcards1');
          $("<img class='mr-2' src='cards/back.svg'> </img>").appendTo(liItem);
        }
      } else if (1 == playerIndex && 1 > $('#handcards2').children().length) {
        for (let handCardIndex = 0; handCardIndex < players[playerIndex].Cards.length; handCardIndex++) {

          let liItem = $("<li class='list-inline-item'> </li>").appendTo('#handcards2');
          $("<img class='mr-2' src='cards/back.svg'> </img>").appendTo(liItem);
        }
      } else if (2 == playerIndex && 1 > $('#handcards3').children().length) {
        for (let handCardIndex = 0; handCardIndex < players[playerIndex].Cards.length; handCardIndex++) {

          let liItem = $("<li class='list-inline-item'> </li>").appendTo('#handcards3');
          $("<img class='mr-2' src='cards/back.svg'> </img>").appendTo(liItem);
        }
      } else if (3 == playerIndex && 1 > $('#handcards4').children().length) {
        for (let handCardIndex = 0; handCardIndex < players[playerIndex].Cards.length; handCardIndex++) {

          let liItem = $("<li class='list-inline-item'> </li>").appendTo('#handcards4');
          $("<img class='mr-2' src='cards/back.svg'> </img>").appendTo(liItem);
        }
      }
    }
  }
}

function gameStart(aNameArray) {
  let baseURL = "https://nowaunoweb.azurewebsites.net";
  let request = $.ajax({
    url: baseURL + "/api/Game/Start", // WOHIN?da wollen wir posts hinschicken!! könnte CASE SENSITIVE sein!!!wird sich nicht ändern, kann man in variable packen --> baseURL
    method: 'POST', //WAS FÜR EINE METHODE? was wollen wir machen?? NICHT GET!!
    data: JSON.stringify(aNameArray),
    contentType: 'application/json', //da gibts einen defaultwert, der muss ünberschrieben werden! siehe https://api.jquery.com/jQuery.ajax/
    dataType: 'json' //was wir in der Arntwort zurückerwarten, da gibts einen defaultwert, der muss ünberschrieben werden!
  });
  request.done(function(data) { //wenn gültige antwort: ergebnis von request in object

    gameID = data.Id;
    currentPlayer = data.NextPlayer;
    players = data.Players;
    currentTopcard = data.TopCard;

    console.log("Game ID = ", gameID);
    console.log("Current Player = ", currentPlayer);
    console.log("Respone: ", data);

    setPlayerNames();
    reloadBadge();

    showTopCard();
    showHandCards();
  });
  request.fail(function(msg) { //wenn keine gültige antwort: callback falls was schiefgeht(keine gültoge karte, oder technischer fehler, o.ä.)
    gameID = 0;
    console.log("Error in request: ", msg, request);
  });

}

function getTopCard() {
  var baseURL = "https://nowaunoweb.azurewebsites.net";
  let request = $.ajax({
    url: baseURL + "/api/Game/TopCard/" + gameID,
    method: 'GET',
    dataType: 'json',
  });
  request.done(function(data) {
    console.log("Respone: TopCard ", data);
  });
  request.fail(function(msg) {
    console.log("Error in request: ", msg, request);
  });
}

function playCard(value, color, wildColor) {

  console.log('Wanted to play: Value', value, ' Color ', color, ' WildColor: ', wildColor);
  var baseURL = "https://nowaunoweb.azurewebsites.net";
  // /api/Game/PlayCard/{id}?value={value}&color={color}&wildColor={wildColor}
  //              {id}?value="3"&color="Blue"&wildColor=''
  //              {id}?value="Draw4"&color="Black"&wildColor="Blue"

  let request = $.ajax({
    url: baseURL + "/api/Game/PlayCard/" + gameID + "?value=" + value + "&color=" + color + "&wildColor=" + wildColor,
    method: 'PUT',
    contentType: 'application/json',
    dataType: 'json'
  });
  request.done(function(data) {
    console.log("Played matching card / tried to play card: no match.");
    console.log("Respone: playCard ", data);

    if(0 == data.Cards.length)
    {
      endOfGame();
    }

    if ("WrongColor" == data.error) {
      //  Try again

    } else {
      currentPlayerReloadRequired()
      if ("Black" == color) {
        reloadTopCard(value, wildColor);
      } else {
        reloadTopCard(value, color);
      }

      for (let index = 0; index < players.length; index++) {
        getHandOfPlayer(players[index].Player)
      }
      currentPlayer = data.Player;
      reloadBadge();

    }

  });
  request.fail(function(msg) {
    console.log("Error in request, card eventually not matched: ", msg, request);
  });
}

function drawCard() {

  var baseURL = "https://nowaunoweb.azurewebsites.net";
  let request = $.ajax({
    url: baseURL + "/api/Game/DrawCard/" + gameID,
    method: 'PUT',
    contentType: 'application/json',
    dataType: 'json'
  });
  request.done(function(data) {
    console.log("Respone: drawCard ", data);
    currentPlayerReloadRequired()
    getHandOfPlayer(currentPlayer);
    currentPlayer = data.NextPlayer;
    reloadBadge();

  });
  request.fail(function(msg) {
    console.log("Error in request: ", msg, request);
  });

  document.getElementById("sound-drawcard").play();
}

// Game/DrawCard/{id}
function getHandOfPlayer(playerName) {
  var baseURL = "https://nowaunoweb.azurewebsites.net";
  let request = $.ajax({
    url: baseURL + "/api/Game/GetCards/" + gameID + "?playerName=" + playerName,
    method: 'GET',
    dataType: 'json',
  });
  request.done(function(data) {
    //console.log("Respone: ", data);
    // reload darf erst NACH dem response passieren ;)
    for (let index = 0; index < players.length; index++) {
      if (data.Player == players[index].Player) {
        let checkLength = players[index].Cards.length;
        players[index].Cards = data.Cards;
        if (checkLength != players[index].Cards.length) {
            if (0 == index) {
                reloadRequiredPlayer1 = true;
            } else if (1 == index) {
                reloadRequiredPlayer2 = true;
            } else if (2 == index) {
                reloadRequiredPlayer3 = true;
            } else if (3 == index) {
                reloadRequiredPlayer4 = true;
            }
        }
        players[index].Cards = data.Cards;
      }
    }

    reloadHandCards();
    //neu: da endOfGame aufrufen??
  });
  request.fail(function(msg) {
    console.log("Error in request: ", msg, request);
  });
}

function convertCardObjectToImgPath(cardValue, cardColor) {

  let imgPath = "cards/";

  if ("Blue" == cardColor) {
    if (13 == cardValue) {
      imgPath = imgPath + "wild4_b.svg";
    } else if (14 == cardValue) {
      imgPath = imgPath + "wild_b.svg";
    } else {
      imgPath = imgPath + "b";
    }
  } else if ("Green" == cardColor) {
    if (13 == cardValue) {
      imgPath = imgPath + "wild4_v.svg";
    } else if (14 == cardValue) {
      imgPath = imgPath + "wild_v.svg";
    } else {
      imgPath = imgPath + "v";
    }
  } else if ("Yellow" == cardColor) {
    if (13 == cardValue) {
      imgPath = imgPath + "wild4_j.svg";
    } else if (14 == cardValue) {
      imgPath = imgPath + "wild_j.svg";
    } else {
      imgPath = imgPath + "j";
    }
  } else if ("Red" == cardColor) {
    if (13 == cardValue) {
      imgPath = imgPath + "wild4_r.svg";
    } else if (14 == cardValue) {
      imgPath = imgPath + "wild_r.svg";
    } else {
      imgPath = imgPath + "r";
    }
  } else if ("Black" == cardColor) {
    if (13 == cardValue) {
      imgPath = imgPath + "wild4.svg";
    }
    if (14 == cardValue) {
      imgPath = imgPath + "wild.svg";
    }
  }

  if (0 == cardValue) {
    imgPath = imgPath + "0.svg";
  } else if (1 == cardValue) {
    imgPath = imgPath + "1.svg";
  } else if (2 == cardValue) {
    imgPath = imgPath + "2.svg";
  } else if (3 == cardValue) {
    imgPath = imgPath + "3.svg";
  } else if (4 == cardValue) {
    imgPath = imgPath + "4.svg";
  } else if (5 == cardValue) {
    imgPath = imgPath + "5.svg";
  } else if (6 == cardValue) {
    imgPath = imgPath + "6.svg";
  } else if (7 == cardValue) {
    imgPath = imgPath + "7.svg";
  } else if (8 == cardValue) {
    imgPath = imgPath + "8.svg";
  } else if (9 == cardValue) {
    imgPath = imgPath + "9.svg";
  } else if (10 == cardValue) {
    imgPath = imgPath + "draw2.svg";
  } else if (11 == cardValue) {
    imgPath = imgPath + "skip.svg";
  } else if (12 == cardValue) {
    imgPath = imgPath + "reverse.svg";
  }
  return imgPath;

}

//neu
function endOfGame() {
  //ToDo: wenn der nextplayer und der letzte spieler übereinstimmen
  //UND ein spieler (der spieler) keine Karten mehr hat,
  //ist das Spiel zu ende

  $('#modal-end-of-game').modal('show');

  //TODO: das einfügen funnzt nicht...
  let somecode = "somecode";

    if (!$('#modal-modal-end-of-game span').hasClass('winner1'))
    {
      let appendWinner = $('#modal-modal-end-of-game span');
      appendWinner.append("<div> blabla players name: </div>" + currentPlayer )
    }

    if (!$('#modal-modal-end-of-game span').hasClass('winner2'))
    {
        let appendWinner = $('#modal-modal-end-of-game span')
    appendWinner.append("<div> blabla players score: </div>" + somecode)
    }

  document.getElementById("sound-winner").play();
  //jQuery
  //$('#sound-winner').play();
}

//neu: funktioniert :)
function restartGame() {
  //window.location.reload(true);
  //  document.reload();
  location.reload();
}
