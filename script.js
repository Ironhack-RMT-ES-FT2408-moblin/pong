// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego

const ball = {
  x: 30,
  y: 30,
  w: 20,
  h: 20,
  radio: 10,
  speed: 2,
  isMovingRight: true,
  isMovingDown: true,
  clickandoDerecha: false,
}

const paddle = {
  x: 200,
  y: 550,
  w: 100,
  h: 20,
  speed: 25,
}

// *** Game Functions ***
function gameLoop() {
  //* la funcion que se está ejecutando 60 veces por segundo

  ballMovement()
  detectColisionBallWall()
  detectColisionBallPaddle()

}

function ballMovement() {

  if (ball.isMovingRight) {
    ball.x += ball.speed
    ballNode.style.left = `${ball.x}px`
  } else {
    ball.x -= ball.speed
    ballNode.style.left = `${ball.x}px`
  }

  if (ball.isMovingDown) {
    ball.y += ball.speed
    ballNode.style.top = `${ball.y}px`
  } else {
    ball.y -= ball.speed
    ballNode.style.top = `${ball.y}px`
  }
}

function detectColisionBallWall() {
  // console.log(ball.x)
  //gameBoxNode.offsetWidth es el valor numerico del ancho del nodo (game box)
  if (ball.x >= (gameBoxNode.offsetWidth - ball.w)) {
    // console.log("se ha estrellado la pelotita")
    ball.isMovingRight = false; // cambia el movimiendo normal que depende de esta variable
  }

  if (ball.y >= (gameBoxNode.offsetHeight - ball.h)) {
    // ball.isMovingDown = false
    gameOver()
  }

  if (ball.x <= 0) {
    ball.isMovingRight = true
  }

  if (ball.y <= 0) {
    ball.isMovingDown = true
  }

}

function gameOver() {
  ballNode.style.backgroundColor = "red"

  alert("Perdiste el juego :(")
  clearInterval(gameIntervalId)
}

function paddleMovement(direction) {

  if (direction === "right") {
    paddle.x += paddle.speed
    paddleNode.style.left = `${paddle.x}px`
  } else if (direction === "left") {
    paddle.x -= paddle.speed
    paddleNode.style.left = `${paddle.x}px`
  }

}

function detectColisionBallPaddle() {

  if ( ((ball.y + ball.h) >= paddle.y) && (ball.x >= paddle.x) && (ball.x <= (paddle.x + paddle.w))  ) {
    ball.isMovingDown = false
  }

}

// *** Game Loop Interval ***

let gameIntervalId = setInterval(() => {
  // console.log("juego andando")
  gameLoop()
}, 1000/60) // 60fps => 60 veces por segundo


// *** Event Listeners ***

window.addEventListener("keydown", (event) => {
  if (event.key === "d") {
    // console.log("moviendo a la derecha")
    paddleMovement("right")
  } else if (event.key === "a") {
    // console.log("moviendo a la izquierda")
    paddleMovement("left")
  }
})

// para movimiento fluido considera eventos keydown, eventos de keyup, que el movimiento esté en el loop. Pero que el moviento esté condicionado a una variable que cambia con el keydow y keyup.


// BONUS

// - la pelota cambia de color al colisionar con la paleta
// - la pelota cambia de velocidad al colisionar con la paleta o cuando pasado cierto tiempo.
// - que la pelota se vaya haciendo más pequeña
// - que aparezca otra pelota
// - una score que aumenta
// - limitar el movimiento de la paleta