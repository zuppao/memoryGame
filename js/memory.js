var cardTurned_1 = null;
var cardTurned_2 = null;
var tries = 0;
var theme_1 = new Array("ghost", "robot", "gamepad", "thumbs-up", "trophy", "wifi", "phone-alt", "jedi",
    "ghost", "robot", "gamepad", "thumbs-up", "trophy", "wifi", "phone-alt", "jedi");
$(function () {
    ResetGame();

    $(backBtnID).on("click", function () {
        $("#board").empty();
        ResetGame();
    });


});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function GetCardSimbol(_element) {
    return $(_element).find(".card-back i")[0].className;
}

async function CheckCards() {
    if (GetCardSimbol(cardTurned_1) != GetCardSimbol(cardTurned_2)) {
        Match(false);
        $(sfxFlip)[0].play();
        tries++;
        $(triesLb).text(tries);
        $(cardTurned_1).toggleClass("flip");
        $(cardTurned_2).toggleClass("flip");

    }
    else {
        Match(true);
        $(sfxWin2)[0].play();

        $(cardTurned_1).children().toggleClass("card-success");
        $(cardTurned_2).children().toggleClass("card-success");

    }
    cardTurned_1 = null;
    cardTurned_2 = null;

    var endGame = true;
    $('.flipper').each(function (idx, currentValue) {
        if (!$(currentValue).hasClass('flip')) {
            $(currentValue).bind('click', FlipClick);
            endGame = false;
        }
    });

    if (endGame)
        GameOver();
}


function ResetGame() {
    tries = 0;
    $(triesLb).text(tries);

    shuffle(theme_1);
    var iconIDX = 0;

    for (var l = 0; l < 4; l++) {
        var cells = '';
        for (var c = 0; c < 4; c++) {
            cells += '<div class="flipper col-auto m-2 text-center"><div class="cardF bg-warning shadow rounded border border-secondary">' +
                '<div class="card-front"><i class="fas fa-crown"></i></div>' +
                '<div class="card-back"><i class="fas fa-' + theme_1[iconIDX] + '"></i></div>' +
                '</div></div>';
            iconIDX++;
        }

        $("#board").append(
            '<div class="row">' + cells + '</div>'
        );
    }

    //code to turn the div 'card'
    $('.flipper').on("click", FlipClick);
}

var FlipClick = function () {
    if (cardTurned_1 == null) {
        $(sfxFlip2)[0].play();
        cardTurned_1 = this;
        $(this).toggleClass("flip");
        return;
    }
    else if (cardTurned_1 == this) {
        return;
    }
    else {
        $(sfxFlip2)[0].play();

        cardTurned_2 = this;
        $(this).toggleClass("flip");

        $('.flipper').unbind('click');
        setTimeout(() => {
            CheckCards();
        }, 700);
    }
}

function GameOver() {
    $(triesLb).text(tries++);
    $('#endModal').modal('toggle');
}




function Match(_result) {
    return;
    //it´s just a test, but I didn´t like the final result... I´ll use it in a future project
    Emoji(_result);
    setTimeout(() => { Emoji(_result); }, 600);
}
function Emoji(_result) {
    if (_result) {
        $(iconOK).toggleClass("effectTest").toggleClass("noEffect").toggleClass("fa-grin-wink").toggleClass("fa-grin");
    } else {
        $(iconNOT).toggleClass("effectTest").toggleClass("noEffect").toggleClass("fa-frown-open").toggleClass("fa-sad-tear");
    }
}