var canvas = document.getElementById('fahadcanvas');
var ctx = canvas.getContext("2d");
canvas.style.border = "thick solid #0000FF";
// canvas width and height
var canvasWidht = canvas.width;
var canvasHeight = canvas.height;
// display starting content
ctx.beginPath();
ctx.fillStyle = "Red";
ctx.font = "30px Arial";
ctx.fillText("Start Game By Selecting Level!", 90, canvasHeight/2);
ctx.stroke();
// adding score 
var score = 0;
// creating snake width and height
var snakeWidth = 15;
var snakeHeight = 15;
// setting the defualt direction
var direction = "right";
// moving the snake using keybord
document.addEventListener("keydown", getdirection);
function getdirection(e) {
	if (e.keyCode == 37 && direction !="right") 
	{
		direction = "left";
	}
	else if (e.keyCode == 38 && direction !="down")
	{
		direction = "up";
	}
	else if (e.keyCode == 39 && direction !="left")
	{
		direction = "right";
	}
	else if (e.keyCode == 40 && direction !="up")
	{
		direction = "down";
	}
}
// creating function for draw snake
function DrawSnake(x,y) {
 	ctx.fillStyle = "red";
 	ctx.fillRect(x * snakeWidth, y * snakeHeight, snakeWidth, snakeHeight);
 	ctx.strokeStyle = "yellow";
 	ctx.strokeRect(x * snakeWidth, y * snakeHeight, snakeWidth, snakeHeight);
 } 
 // creating defualt snake of length 4
var len = 4;
var snake = [];
for (var i = len - 1; i >= 0; i--) {
 	snake.push({x:i, y:0});
 }
 // creating food for snake
food = {
	x : Math.round(Math.random()*(canvasWidht/snakeWidth-1)+1),
	y : Math.round(Math.random()*(canvasHeight/snakeHeight-1)+1)
};
line = {
 		x:200,
 		y:300
 	};
// creating the function for drwaing food
function drwaFood(x,y) {
	ctx.fillStyle = "green";
 	ctx.fillRect(x * snakeWidth, y * snakeHeight, snakeWidth, snakeHeight);
 	ctx.strokeStyle = "red";
 	ctx.strokeRect(x * snakeWidth, y * snakeHeight, snakeWidth, snakeHeight);
}
// create score on canvas
function CreateScore(Gscore)
{
	var showscore = document.getElementById('Gscore');
	ctx.fillStyle = "#FE2712";
	showscore.value = Gscore;
}
// whensnake eat itself
function collisionCheck(x, y, array) 
{
	for(var i = 0; i < array.length; i++)
	{
		if(x == array[i].x && y == array[i].y)
		{
			return true;
		}
	}
	return false;
}
// creating function for draw snake 
function draw() 
{
	// add image as obstacles
	
	var GameRound = 0;
 	ctx.clearRect(0,0,canvasWidht,canvasHeight);
 	for (var i = 0; i < snake.length; i++) {
 		var x = snake[i].x;
 		var y = snake[i].y;
 		DrawSnake(x,y);
 	}
 	
 	ctx.beginPath();
 	ctx.moveTo(line.x,line.x);
 	ctx.lineTo(line.x,line.y);
 	ctx.stroke();
 	// Food
 	drwaFood(food.x, food.y);
 	// snake head
 	var snakeX = snake[0].x;
 	var snakeY = snake[0].y;

 	// for setting the directions of the snake
 	if(direction == "left") snakeX--;
 	else if(direction == "up") snakeY--;
 	else if(direction == "right") snakeX++;
 	else if(direction == "down") snakeY++;
 	
 	// creating level 
 	if(score>5)
 	{
 		GameRound = 1;
 		canvas.style.border = "thick solid red";
 		// when snake hits the wall 
		if(snakeX < 0 || snakeY < 0 || snakeX >= canvasWidht/snakeWidth 
		|| snakeY >= canvasHeight/snakeHeight || 
			collisionCheck(snakeX,snakeY,snake))
		{	 
			location.reload();
		}
 	}
 	else
 	{
 		// when pass from one wall appear from other wall
 		if(snakeX<0)
		{
			snakeX = 39;
		}
		else if(snakeY<0)
		{
			snakeY = 26;
		}
		else if(snakeX >= canvasWidht/snakeWidth)
		{
			snakeX = 0;
		}
		else if(snakeY >= canvasHeight/snakeHeight)
		{
			snakeY = 0;
		}
 	}
	 	if(snakeX==13 && snakeY>=13 && snakeY<=19)
	 	{
	 		location.reload();
	 	}
	 
 	// when snake eat food
 	if(snakeX == food.x && snakeY == food.y)
 	{
 		food = {
			x : Math.round(Math.random()*(canvasWidht/snakeWidth-1)+1),
			y : Math.round(Math.random()*(canvasHeight/snakeHeight-1)+1)
		};
		var newHead = {x:snakeX, y:snakeY};
		score++;
 	}
 	else
 	{
 		// for removing the last entry 
 		snake.pop();
 		var newHead = {x:snakeX, y:snakeY};
 	}
 	// creating the new head of the snake
 	snake.unshift(newHead);
 	CreateScore(score);
 	// displying round of the game
 	ctx.fillStyle = "red";
 	ctx.fillText("Round : "+(GameRound+1), 10,30);
 }
 function startgame(mode)
 {
 	setInterval(draw, mode);
 }
 