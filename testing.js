/*  Project: Assignment 5, Summer 2017

    Author: Chung Bao Ngan Tran
    StartDate:   Jul 28, 2017

    Filename: testing.js
*/

"use strict";

//global variables
var canvas = document.getElementById("gameArea");
var ctx = canvas.getContext("2d");
var score = document.getElementById("score");
var speedTxt = document.getElementById("speedTxt");
var caught = 0;
var speed = 5000;
var mousex = 0;
var mousey = 0;
score.innerHTML = caught;
speedTxt.innerHTML = speed;
var count = 0;
//create image
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "img/Background.png";
var background = {};


// Char image
var charReady = false;
var charImage = new Image();
charImage.onload = function () {
    charReady = true;
};
charImage.src = "img/chopper.png";
charImage.id = "charImg";
var char = {}
var imageWidth;
var imageHeight;
var imageData = [];

//start image
var startReady = false;
var startImage = new Image();
startImage.onload = function () {
    startReady = true;
};
startImage.src = "img/start.png";
startImage.id = "startImg";
var start = {}
var stW;
var stH;
var stData = [];

//create canvas, basic features
function setUp() {
    background.x = canvas.width / 2 - bgImage.width / 2;
    background.y = canvas.height / 2 - bgImage.height / 2;

    start.x = bgImage.width / 2 - startImage.width / 2;
    start.y = bgImage.height / 2 - startImage.height / 2;
    if (bgReady) {
        ctx.drawImage(bgImage, 0,0);
    }
    if (startReady) {
        ctx.drawImage(startImage, start.x, start.y);
    }
    stW = startImage.width;
    stH = startImage.height;
    stData = [start.x, start.y, stW, stH];
}

////eventlistener
if (canvas.addEventListener) {
    canvas.addEventListener("mouseup", correct, false); //can use "click"
    canvas.addEventListener("touchend", getPosition, false);
    //    canvas.addEventListener("pointerup", getPosition, false);
} else if (canvas.attachEvent) {
    canvas.attachEvent("onmouseup", correct);
}

function getPosition(canvas, event) {
    //try{
    var rect = canvas.getBoundingClientRect();
    ////return {
    //mousex = evt.clientX - rect.left;
    //mousey = evt.clientY - rect.top;

    //}catch (message) {// abs. size of element
    var scaleX = canvas.width / rect.width,   // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
    //}
    //finally {
    //return {
    //}
    //}
    //correct();
}

function correct(event) {
    var mouse = getPosition(canvas, event)
    //console.log((mouse.x >= imageData[0]) + "," + (mouse.x < (imageData[0] + imageData[2])) + "," + (mouse.y >= (imageData[1])) + "," + (mouse.y < (imageData[1] + imageData[3])));
    if (((mouse.x >= stData[0]) && (mouse.x < (stData[0] + stData[2])) && (mouse.y >= (stData[1])) && (mouse.y < (stData[1] + stData[3])))
        && (imageData.length === 0)) {
        startTimer();
        gamePlay();
    } else if ((mouse.x >= imageData[0]) && (mouse.x < (imageData[0] + imageData[2])) && (mouse.y >= (imageData[1])) && (mouse.y < (imageData[1] + imageData[3]))) {

        generateCoordinates();
    } else if (imageData.length === 0) {
        setUp();
    } else if (imageData.length !== 0) {
        gamePlay();
    }
}
function startTimer() {
    var timer = 3;
    var time = 6;
    var display = document.getElementById("time");
    var Countdown = setInterval(function () {
        display.innerHTML = timer + " second(s)";
        if (time === 2) {
            display.innerHTML = "";
            clearInterval(Countdown);
        }
        time--;
        timer--;
    }, 1000);

}

var gamePlay1;
function gamePlay() {
    gamePlay1 = setInterval(gameStart, speed);
}

function gameStart() {
    background.x = canvas.width / 2 - bgImage.width / 2;
    background.y = canvas.height / 2 - bgImage.height / 2;

    char.x = 24 + (Math.random() * (canvas.width - 64));
    char.y = 24 + (Math.random() * (canvas.height - 64));
    if (bgReady) {
        ctx.drawImage(bgImage,0,0);
    }
    if (charReady) {
        ctx.drawImage(charImage, char.x, char.y);
    }
    imageWidth = charImage.width;
    imageHeight = charImage.height;
    imageData = [char.x, char.y, imageWidth, imageHeight];
    console.log(count);
    count++;
}

function generateCoordinates() {
    //You clicked it!
    caught += 1;
    score.innerHTML = caught;
    update();
}

function update() {
    speed = speed - 100;
    speedTxt.innerHTML = speed;
    gameStart();
}

//Button event
var button2 = document.getElementById("rsScr");
if (button2.addEventListener) {
    button2.addEventListener("click", resetScore, false);
} else if (button2.attachEvent) {
    button2.attachEvent("onclick", resetScore);
}
function resetScore() {
    caught = 0;
    score.innerHTML = caught;
    speedTxt.innerHTML = speed;
    clearInterval(gamePlay1);
    gamePlay();
}

var button1 = document.getElementById("rsSpd");
if (button1.addEventListener) {
    button1.addEventListener("click", resetSpeed, false);
} else if (button1.attachEvent) {
    button1.attachEvent("onclick", resetSpeed);
}
function resetSpeed() {
    speed = 5000;
    score.innerHTML = caught;
    speedTxt.innerHTML = speed;
    clearInterval(gamePlay1);
    gamePlay();
}

var button0 = document.getElementById("rsGame");
if (button0.addEventListener) {
    button0.addEventListener("click", resetGame, false);
} else if (button0.attachEvent) {
    button0.attachEvent("onclick", resetGame);
}
function resetGame() {
    imageData = [];
    stData = [];
    speed = 5000;
    caught = 0;
    speedTxt.innerHTML = speed;
    score.innerHTML = caught;
    clearInterval(gamePlay1);
    setUp();


}

// run setUpPage() function when page finishes loading
if (window.addEventListener) {
    window.addEventListener("load", setUp, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUp);
}