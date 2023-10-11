//------------------------------------
//Background Music
var backgroundSound = new Audio("backgroundMusic.mp3");
backgroundSound.loop = true;
backgroundSound.play();

//Run Sound
var runSound = new Audio("run.mp3");
runSound.loop = true;

//Jump Sound
var jumpSound = new Audio ("jump.mp3");
//Dead Sound
var deadSound = new Audio("dead.mp3");

//level Compelete
var levelSound = new Audio("levelDone.mp3");

//bonus
var bonusSound = new Audio("bonus.mp3");


//-----------------------------------
//key Event
function keyCheck(event){
    //Enter Key
    if(event.which==13){
        if(runWorkerId==0){

            runSound.play();

            //Workers
            runWorkerId = setInterval(run,100);
            moveBackgroundWorkerId =setInterval(moveBackground,100);
            scoreWorkerId = setInterval(updateScore,100);
            levelCompleteDriver=setInterval(levelComplete,100);
        

            //Creator
            createCoinWorkerId = setInterval(createCoin,100);
            createBlockWorkerId=setInterval(createBlock,500);
            
            //Movers
            moveBlockWorkerId=setInterval(moveBlock,100);
            moveCoinWorkerId= setInterval(moveCoin,100);
        }
    }

    //Space Key
    if(event.which==32){
            jumpU();
            setTimeout(jumpD,500);

            jumpSound.play();
            runSound.pause();

    }
}


//Car Run
var runWorkerId = 0;
var boyId=document.getElementById("boy");
var wheelRId=document.getElementById("wheelR");
var wheelFId=document.getElementById("wheelF");
var runImageNumber = 1;

function run(){

    runImageNumber++;

    //Run Crash Solving
    if(runImageNumber==5){
        runImageNumber=1;
    }

    wheelRId.src ="Wheel (" +runImageNumber+ ").png";
    wheelFId.src="Wheel (" +runImageNumber+ ").png";
}

//Car Jump

var boyMarginTop = 320;
var wheelRMarginTop = 450;
var wheelFMarginTop = 450;
var jumpHeight = 150;

function jumpU(){
        
    //Jump Fly
        boyMarginTop = boyMarginTop - jumpHeight;
        wheelRMarginTop =wheelRMarginTop - jumpHeight;
        wheelFMarginTop =wheelFMarginTop - jumpHeight;

        boyId.style.marginTop = boyMarginTop + "px";
        wheelRId.style.marginTop = wheelRMarginTop + "px";
        wheelFId.style.marginTop = wheelFMarginTop + "px";
}       
        
function jumpD(){
        boyMarginTop = boyMarginTop + jumpHeight;
        wheelRMarginTop =wheelRMarginTop + jumpHeight;
        wheelFMarginTop =wheelFMarginTop + jumpHeight;

        boyId.style.marginTop = boyMarginTop + "px";
        wheelRId.style.marginTop = wheelRMarginTop + "px";
        wheelFId.style.marginTop = wheelFMarginTop + "px";

        runSound.play();
}


//Background Moving
var BackgroundId = document.getElementById("background");
var moveBackgroundWorkerId = 0;
var positionX = 0;

function moveBackground(){

    positionX = positionX - 20;
    BackgroundId.style.backgroundPositionX = positionX + "px";

}
var scoreWorkerId=0;
//Score
var scoreId = document.getElementById("score");
var newScore = 0;
var lvlUp = 0;

function updateScore(){
    
    newScore++;
    scoreId.innerHTML = newScore;
    
}

//-------------------------------------------

//Adding bonus marks by catching one coin
function bonus(){
    
    newScore = newScore + 100 ; //Adding 100 bonus marks
    scoreId.innerHTML =  newScore;
    //alert(newScore);
    updateScore(newScore);
    
}

//---------------------------------------------------------------
//Car Destroy

var deadWorkerId = 0;
var bonusWorkerId = 0;

function dead(){

        // Dead - moves down
        wheelFId.style.marginTop = "600px";
        wheelRId.style.marginTop = "600px";


        document.getElementById("gameOverScreen").style.visibility = "visible";
        document.getElementById("finalScore").innerHTML= newScore;
        boyId.src = "gameOver.png";
    }
//---------------------------------------------------------------

//page Reload
function reload(){
    location.reload();
}
//------------------------------------------------------------------

//Level Pass
var levelCompleteDriver = 0;
function levelComplete(){ 
    
    //alert(newScore);

    if( newScore >= 1000){
        document.getElementById("nextLevelScreen").style.visibility = "visible";
        //Clear Intervals Of Run Function
            
            runSound.pause();
            levelSound.play();
            jumpSound.pause();
        
            
            clearInterval(runWorkerId);
            clearInterval(scoreWorkerId);
            clearInterval(moveBackgroundWorkerId);
            clearInterval(moveBlockWorkerId);
            clearInterval(moveCoinWorkerId);
           
            
    }
  
 
}

//Creation Of adders
//----------------------------------------------------------------

//Create Coin
var coinMarginLeft = 700;
var coinMarginTop = 180;
var coinNumber = 1;
var createCoinWorkerId = 0;

function createCoin(){
    
    var block = document.createElement("div");
    block.className = "salli";
    block.id = "salli"+ coinNumber;

    coinNumber++;

    
    var gap = Math.random()*(4000-400)+400;

    coinMarginLeft = coinMarginLeft + gap;
    block.style.marginLeft = coinMarginLeft + "px";

    document.getElementById("background").appendChild(block);
}


//Move Coin
var moveCoinWorkerId = 0;

function moveCoin(){

    for(var i=1; i<= coinNumber; i++ ){
        var currentBlock = document.getElementById("salli" + i);
        var currentBlockMarginLeft = currentBlock.style.marginLeft;
        var newBlockMarginLeft = parseInt(currentBlockMarginLeft) -20;

        currentBlock.style.marginLeft = newBlockMarginLeft + "px";

           // alert(newBlockMarginLeft);
        //250-10
             if(newBlockMarginLeft < 250 & newBlockMarginLeft > 10){
              if( boyMarginTop > 150 & boyMarginTop<270 ){
                    //alert(boyMarginTop);
                    //150
                    //alert("Collected");
                    
                   
                    bonus();

                    runSound.pause(); 
                    bonusSound.play();
                  

                }
            }
        }
    }


/*------------------------------------------------*/


//block1 = Flame
var blockMarginLeft = 500;
var createBlockWorkerId = 0;
var blockNumber = 1;

function createBlock(){
    
    var block = document.createElement ("div");
    block.className = "block";
    block.id = "block" + blockNumber;

    blockNumber++;
    //console.log("test com 22", block)

    var gap = Math.random()*(1000-100)+200;

    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px"; 

    document.getElementById("background").appendChild(block);
}

//Move Block
var moveBlockWorkerId = 0;

function moveBlock(){

    for(var i=1; i<= blockNumber; i++ ){

        var currentBlock = document.getElementById("block" + i);
        var currentBlockMarginLeft = currentBlock.style.marginLeft;
        var newBlockMarginLeft = parseInt(currentBlockMarginLeft) -20;

        currentBlock.style.marginLeft = newBlockMarginLeft + "px";

        //alert(newBlockMarginLeft);
        //200-0
            if(newBlockMarginLeft < 200 & newBlockMarginLeft > 0){
                if( boyMarginTop > 240){
                   // alert(boyMarginTop);
                    //150
                    //alert("Dead");
                    clearInterval(runWorkerId);
                    clearInterval(scoreWorkerId);
                    clearInterval(moveBackgroundWorkerId);
                    clearInterval(moveBlockWorkerId);
                    clearInterval(createBlockWorkerId);
                    clearInterval(moveCoinWorkerId);

                    runSound.pause();

                    deadSound.play();
                    deadWorkerId =setInterval(dead,100);
                }
            }

    }
}