const audio = new Audio();
audio.src = "assets/click.wav";


function showPlayerFormAndPlayMusic() {

    document.getElementById("playerForm").style.display = "block";
    document.getElementById("playButton").style.display = "none";

    playBackgroundMusic();
}


function startGameAndShowInstructions() {
    var playerName = document.getElementById("name").value.trim();
    var playerNickname = document.getElementById("nickname").value.trim();


    if (playerName === "" || playerNickname === "") {

        alert("Please fill in all the details.");
        return;
    }


    var player = {
        name: playerName,
        nickname: playerNickname
    };


    console.log(player);


    document.getElementById("playerForm").style.display = "none";


    var popupBox = document.createElement("div");
    popupBox.id = "popupBox";
    popupBox.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    popupBox.style.position = "fixed";
    popupBox.style.top = "0";
    popupBox.style.left = "0";
    popupBox.style.width = "100%";
    popupBox.style.height = "100%";
    popupBox.style.display = "flex";
    popupBox.style.alignItems = "center";
    popupBox.style.justifyContent = "center";
    popupBox.style.zIndex = "9999";

    var popupContent = document.createElement("div");
    popupContent.style.backgroundColor = "bisque";
    popupContent.style.padding = "20px";
    popupContent.style.borderRadius = "5px";
    popupContent.style.textAlign = "left";

    var instructions = document.createElement("h2");
    instructions.textContent = "Instructions";
    var rule1 = document.createElement("p");
    rule1.textContent = "1. Make pairs of the emojis by flipping them.";
    var rule2 = document.createElement("p");
    rule2.textContent = "2. To flip a block you should click on it.";
    var rule3 = document.createElement("p");
    rule3.textContent = "3. If two blocks you clicked are not similar, they will be flipped back.";

    var continueButton = document.createElement("button");
    continueButton.textContent = "Continue";
    continueButton.style.padding = "10px 20px";
    continueButton.style.fontSize = "18px";
    continueButton.style.cursor = "pointer";
    continueButton.style.backgroundColor = "forestgreen"
    continueButton.addEventListener("click", function() {

        redirectToIndex();
    });

    popupContent.appendChild(instructions);
    popupContent.appendChild(rule1);
    popupContent.appendChild(rule2);
    popupContent.appendChild(rule3);
    popupContent.appendChild(continueButton);
    popupBox.appendChild(popupContent);
    document.body.appendChild(popupBox);
}

function redirectToIndex() {
    pauseBackgroundMusic();

    window.location.href = "main.html";
}

function playBackgroundMusic() {
    var audio = document.getElementById("backgroundMusic");
    audio.play();
}

function pauseBackgroundMusic() {
    var audio = document.getElementById("backgroundMusic");
    audio.pause();
}

document.getElementById("playButton").addEventListener("click", showPlayerFormAndPlayMusic);

document.getElementById("startGameButton").addEventListener("click", startGameAndShowInstructions);

document.getElementById("continueButton").addEventListener("click", redirectToIndex);
