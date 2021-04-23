var backGround, backgroundIMG;
var hero, heroIMG;
var invisibleGround;
var zombie1,zombie2,zombie3;
var boss,bossIMG;
var apple,appleIMG;
var zombiesGroup;
var applesGroup;
var bossGroup;
var jump1vel=-15;
var jump2vel=-13;
var jump3vel=-10;
var jump4vel=-20;
var jump5vel=-25;
var PLAY=1,END=0;
var gameState=PLAY;

function preload(){

    backgroundIMG = loadImage("images/background.png")
    heroIMG = loadImage("images/hero.png");
    zombie1 = loadImage("images/zombie1.png");
    zombie2 = loadImage("images/zombie2.png");
    zombie3 = loadImage("images/zombie3.png");
    bossIMG = loadImage("images/boss.png");
    appleIMG = loadImage("images/apple.png");

}


function setup() {

    createCanvas(600,300)

    backGround= createSprite(width/2,height/2,width,height);
    backGround.addImage("ground",backgroundIMG);
    backGround.scale=1.5;

    hero = createSprite(100,height-50,20,50);
    hero.addImage("hero",heroIMG);
    hero.scale=0.3;
    //hero.debug=true;
    hero.setCollider("rectangle",0,0,180,340);
    invisibleGround= createSprite(50,height-10,150,10);
    invisibleGround.visible=false;
      
    zombiesGroup = new Group();
    applesGroup = new Group();
    bossGroup = new Group();
}


function draw() { 

        background(0);
       
        if(gameState===PLAY){
                backGround.velocityX=-1;

                
                if(backGround.x<0){
                    backGround.x=300;
                }

                if(keyDown("space")&& hero.y>120){

                    if(hero.scale>=0.1 && hero.scale<0.2){
                    hero.velocityY=jump3vel;
                    } else if(hero.scale>=0.2 && hero.scale<0.3){
                        hero.velocityY=jump2vel;
                        } else if(hero.scale>=0.3 && hero.scale<0.4){
                            hero.velocityY=jump4vel;
                            }else if(hero.scale>=0.5){
                                hero.velocityY=jump5vel;
                                }
                }
                console.log(hero.y);
                hero.velocityY+=0.5;
               
                hero.debug = true;

                for(var i=0;i<zombiesGroup.length;i++){
                    if(hero.isTouching(zombiesGroup.get(i))){
                        zombiesGroup.get(i).destroy();
                        if(hero.scale>0.1){
                        hero.scale -=0.05;
                        }
                    }
                }
                for(var i=0;i<applesGroup.length;i++){
                    if(hero.isTouching(applesGroup.get(i))){
                        applesGroup.get(i).destroy();
                        if(hero.scale<=0.5){
                        hero.scale +=0.05;
                        }
                    }
                }

                spawnZombies();
                spawnBoss();
                spawnApple();
        } else if(gameState===END){

        }

        hero.collide(invisibleGround);
    drawSprites();
}



function spawnZombies(){

    if(frameCount%200===0){

        var zombie = createSprite(width,height-50,50,100);
        zombie.velocityX=-4;
        var rand=Math.round(random(1,3));

            switch(rand){
                case 1: zombie.addImage("zombie",zombie1);
                        zombie.setCollider("rectangle",0,0,200,300);
                        zombie.scale=0.3;
                        break;
                case 2: zombie.addImage("zombie",zombie2);
                        zombie.y=height-70;
                        zombie.scale=0.2;
                        break;
                case 3: zombie.addImage("zombie",zombie3);
                        zombie.setCollider("rectangle",0,13,110,170);
                        zombie.scale=0.4;
                        break;
            } 
            zombiesGroup.add(zombie);
            zombie.lifetime=300;
            zombie.debug = true;
        }
        
}

function spawnBoss(){

    if(frameCount%3100===0){

        var boss = createSprite(width,220,50,100);
        boss.velocityX=-4;
        boss.addImage("zombie",bossIMG);           
        boss.scale=0.5;        
        bossGroup.add(boss);
        boss.lifetime=300;                    
    }
}


function spawnApple(){

    if(frameCount%1210===0){

        var apple = createSprite(width,Math.round(random(50,200)),0,100);
        apple.velocityX=-4;
        apple.addImage("apple",appleIMG);           
        apple.scale=0.15;   
        applesGroup.add(apple);
        apple.lifetime=300;   
        apple.debug = true;
        apple.setCollider("circle",0,0,130)                         
    }
}