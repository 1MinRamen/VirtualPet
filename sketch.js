//Create variables here

var dog, happydog;
var dogIMG, happydogIMG;
var foodS, foodStock;
var database;

function preload()
{
	//load images here
  dogIMG = loadImage("images/dogImg.png");
  happydogIMG = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250,250,100,100);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogIMG);
  }

  drawSprites();
  //add styles here
  textSize(15);
  fill("white");
  text("Food Remaining: "+ foodS,170,150);
  text("Note: Press up arrow key to feed the dog!",130,20);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if (x<=0){
    x = 0;
  }
  else {
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}