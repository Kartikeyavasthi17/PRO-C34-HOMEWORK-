//Create variables here

var dog, happyDog, database, foodS, foodStock;
var dogImg,happyDogImg;

var database;

var ghg =20;

function preload()
{
  //load images here
  dogImg =loadImage("dogImg.png");
  happyDogImg =loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  
  database =firebase.database();

  dog =createSprite(300,300,5,5);
  dog.scale =0.3;
  dog.addImage(dogImg);

  foodStock =database.ref("Food");
  foodStock.on("value",readstock);

}


function draw() {  

  background(46, 139, 87)
  //add styles here

  if(keyWentDown(UP_ARROW))
  {
    if(ghg <= 0)
    {
      ghg=0;
    }else{
      ghg=ghg-1;
    }

    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  

  dog.display();

    fill("red");
    textSize(18);
  text("PRESS UP_ARROW TO FEED THE DOG",100,100);
  text("FOOD LEFT ="+ghg,120,120);
  
  drawSprites();

}

function writeStock(x)
{
  if(x <= 0)
  {
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
    Food:x
  })

}

function readstock(data)
{
  foodS =data.val();
}