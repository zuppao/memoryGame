var cardTurned_1 = null, cardTurned_2 = null;
var chances = 0;
var selectedTheme = [], backIcon;

$(function () {
    SetTheme(idTheme.value);
    ResetGame();

    $(btRestart).on("click", function () {
        $("#board").empty();
        ResetGame();
    });

    $(idTheme).on("change", function (_obj) {
        SetTheme(idTheme.value);
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
        $(sfxFlip)[0].play();
        chances++;
        $(lbChance).text(chances);
        $(cardTurned_1).toggleClass("flip");
        $(cardTurned_2).toggleClass("flip");
    }
    else {
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
    cardTurned_1 = null;
    cardTurned_2 = null;
    chances = 0;
    $(lbChance).text(chances);

    shuffle(selectedTheme);
    var iconIDX = 0;

    for (var l = 0; l < 4; l++) {
        var cells = '';
        for (var c = 0; c < 4; c++) {
            cells += '<div class="flipper col-auto m-2 text-center"><div class="cardF bg-warning shadow rounded border border-secondary">' +
                '<div class="card-front"><i class="fas fa-'+backIcon+'"></i></div>' +
                '<div class="card-back"><i class="fas fa-' + selectedTheme[iconIDX] + '"></i></div>' +
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
    $(lbChance).text(chances++);
    $('#endModal').modal('toggle');
}

function SetTheme(_theme) {
    switch(_theme){
        case "Covid-19":
            backIcon = "biohazard";
            selectedTheme = new Array("hands-wash","user-nurse","head-side-mask","pump-medical","viruses","lungs-virus","head-side-cough","virus",
                                      "hands-wash","user-nurse","head-side-mask","pump-medical","viruses","lungs-virus","head-side-cough","virus");
            break;

        case "Games":
            backIcon = "crown";
            selectedTheme = new Array("chess-board","chess-knight","gamepad","trophy","dice","ghost","headset","puzzle-piece",
                                      "chess-board","chess-knight","gamepad","trophy","dice","ghost","headset","puzzle-piece");
            break;

        case "Technology":
            backIcon = "laptop";
            selectedTheme = new Array("wifi","network-wired","map-marker-alt","print","sim-card","microchip","satellite","mobile-alt",
                                      "wifi","network-wired","map-marker-alt","print","sim-card","microchip","satellite","mobile-alt");
            break;

        case "Nerd":
            backIcon = "dice-d20";
            selectedTheme = new Array("ring","jedi","hand-spock","robot","rocket","dungeon","hat-wizard","quidditch",
                                      "ring","jedi","hand-spock","robot","rocket","dungeon","hat-wizard","quidditch");
            break;

        case "Vehicle":
            backIcon = "traffic-light";
            selectedTheme = new Array("tractor","car","bus","motorcycle","truck-moving","helicopter","sleigh","gas-pump",
                                      "tractor","car","bus","motorcycle","truck-moving","helicopter","sleigh","gas-pump");
            break;

        case "Natural":
            backIcon = "dove";
            selectedTheme = new Array("tree","fire-alt","wind","snowflake","water","leaf","seedling","cannabis",
                                      "tree","fire-alt","wind","snowflake","water","leaf","seedling","cannabis");
            break;

        case "Sports":
            backIcon = "quidditch";
            selectedTheme = new Array("snowboarding","futbol","table-tennis","running","biking","swimmer","hockey-puck","volleyball-ball",
                                      "snowboarding","futbol","table-tennis","running","biking","swimmer","hockey-puck","volleyball-ball");
            break;

        case "Animals":
            backIcon = "paw";
            selectedTheme = new Array("dragon","dog","cat","fish","spider","horse","frog","dove",
                                      "dragon","dog","cat","fish","spider","horse","frog","dove");
            break;

        default:
            backIcon = "crown";
            selectedTheme = new Array("ghost", "robot", "gamepad", "thumbs-up", "trophy", "wifi", "phone-alt", "jedi",
                                      "ghost", "robot", "gamepad", "thumbs-up", "trophy", "wifi", "phone-alt", "jedi");
    }
}