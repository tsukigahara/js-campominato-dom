// When you press Generate button
function fieldGen (){

    // get <main>
    var mainHTML = document.getElementById("main");

    //initialize <main> inner html
    mainHTML.innerHTML = "";

    // get gamemode value
    let gamemode = document.getElementById("gamemodeID").value;
    console.log(gamemode);

    //run gamemodeGen()
    //this returns an array with contents and variable for redblockGen
    var contentHTML = gamemodeGen(gamemode);
    mainHTML.append(contentHTML[0]);

    //run redblockGen 
    redblockGen (contentHTML[1]);
}


// GAMEMODE GEN ////////////////////////////////////////


// create grid depending on gamemode value
function gamemodeGen (value){
    var contentHTML;
    //easy
    if (value == 1){
        contentHTML = layoutGen(10);
        return [contentHTML, 8];// <----- value for redblockGen
    }
    //normal
    if (value == 2){
        contentHTML = layoutGen(9);
        return [contentHTML, 7];// <----- value for redblockGen
    }
    //hard
    if (value == 3){
        contentHTML = layoutGen(7);
        return [contentHTML, 5];// <----- value for redblockGen
    }
}



// Layout GEN //////////////////////////////////////////////


//create grid of blocks depending on input value
function layoutGen (value){

    // index for numerate blocks
    var numerate = 1;

    // score counter
    var score = 0;

    //create div container of grid
    var contentHTML = document.createElement("div");
    contentHTML.classList.add("container");
    contentHTML.classList.add("center");

    // create rows
    for (var i = 0; i < value; i++){

        //create div 
        var rowsHTML = document.createElement("div");
        rowsHTML.classList.add("rows");
        contentHTML.append(rowsHTML);

        //create blocks and cover blocks
        for (let index = 0; index < value ; index++ ){

            // create div 
            let blockHTML = document.createElement("div");
            let coverHTML = document.createElement("div");
            coverHTML.classList.add("cover");
            blockHTML.classList.add("blocks");
            blockHTML.setAttribute("id", "row-"+i+"-block-"+index);// set each block id
            blockHTML.append(coverHTML);

            // When clicked hide cover block and increment score 
            coverHTML.addEventListener("click", function (){
                var scoreHTML = document.getElementById("scoreID");
                coverHTML.classList.remove("cover");

                // increment score
                score += 10;
                scoreHTML.innerHTML = "score: "+score;
            })

            //add number inside blocks
            blockHTML.append(numerate);
            numerate++;

            //append
            rowsHTML.append(blockHTML);
        }
    }
    return contentHTML;
}



// RED BLOCK GEN/////////////////////////////////////////////////


//create red blocks and orange blocks depending on input value
function redblockGen (value){
    for (let i = 0; i < 10; i++){
        // generate random values
        var num1 = Math.floor((Math.random()*value)+1);
        var num2 = Math.floor((Math.random()*value)+1);

        // create redblocks
        var redblock = [];
        redblock[i] = document.getElementById("row-"+num1+"-block-"+num2);
        redblock[i].style.backgroundColor = "red";
        console.log("row-"+num1+"-block-"+num2);

        // create orange blocks
        let orangeArea = [];
        orangeArea[0] = document.getElementById("row-"+num1+"-block-"+(num2-1));
        orangeArea[1] = document.getElementById("row-"+num1+"-block-"+(num2+1));
        orangeArea[2] = document.getElementById("row-"+(num1-1)+"-block-"+num2);
        orangeArea[3] = document.getElementById("row-"+(num1+1)+"-block-"+num2);
        orangeArea[4] = document.getElementById("row-"+(num1-1)+"-block-"+(num2-1));
        orangeArea[5] = document.getElementById("row-"+(num1+1)+"-block-"+(num2-1));
        orangeArea[6] = document.getElementById("row-"+(num1-1)+"-block-"+(num2+1));
        orangeArea[7] = document.getElementById("row-"+(num1+1)+"-block-"+(num2+1));
        for (let i = 0; i < 8; i++){
            orangeArea[i].classList.add("orange");
        }

        //Gameover when clicked on red blocks
        redblock[i].addEventListener("click", function (){
            // show gameover
            window.alert("GAME OVER");

            //hide all cover blocks
            var coverHTML = document.getElementsByClassName("cover");
            for(let i = 0; i < coverHTML.length; i++){
                coverHTML[i].style.display = "none";
            }
            
            //change button text
            var buttonHTML = document.getElementById("buttonID");
            buttonHTML.innerHTML = "Restart!";
        })
    }
}