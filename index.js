let cards = []
let sum = 0
let hasBlackJack = false
let gameOver = false
let message = ""
let player = {
    name : "Default",
    money : 100,
    bet : 10
}

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let betEl = document.getElementById("bet-el")

function betRender(money = 0, mod = false){
    if (player.money >= money && !gameOver && (player.bet + money>=0)) {
        player.bet += money;
        if (!mod){
            player.money -= money;
        }
        console.log(player.bet +"----"+ player.money)
        renderGame()
    }
    else if(player.money < money && !gameOver && player.bet === 0) {
        gameOver = true;
        messageEl.textContent = "You do not have enough money! \uD83D\uDE2D"
    }
    
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1 ) {
        console.log("Sum: " + sum + " Number: " +randomNumber)
        if (sum <= 10) {
            return 11
        }
        else {
            return 1
        }
    }
    else {
        return randomNumber
    }
}

function newBet() {

    gameOver = false
    sum = 0
    betEl.style.color = "white"
    betRender()
    let firstCard = getRandomCard()
    sum += firstCard
    let secondCard = getRandomCard()
    
    cards = [firstCard, secondCard]
    sum += secondCard
    renderGame()
}

function renderGame() {
    console.log(cards)
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum
    playerEl.textContent = player.name + " \u20B9" + player.money
    betEl.textContent = "Bet: \u20B9" + player.bet
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        
        betRender(player.bet, true)
        
        gameOver = true
        console.log("Ran the function")

    } else {
        message = "You lost the bet!"
        gameOver = true
        player.bet = 0
        betEl.style.color = "red"
    }
    messageEl.textContent = message
}


function newCard() {
    // Only allow the player to get a new card if she IS alive and does NOT have Blackjack
    if (!gameOver&&cards.length>=2){
    let card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
    }
}
renderGame()