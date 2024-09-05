// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

// const paddleNode = document.createElement("div"); // se crea la paleta
// paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
// gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego

const ball = {
  x: 30,
  y: 30,
  w: 20,
  h: 20,
  radio: 10,
  speed: 2,
  isMovingRight: true,
  isMovingDown: true
}


// *** Game Functions ***
function gameLoop() {
  //* la funcion que se está ejecutando 60 veces por segundo

  ballMovement()
  detectColisionBallWall()

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
    ball.isMovingDown = false
  }

  if (ball.x <= 0) {
    ball.isMovingRight = true
  }

  if (ball.y <= 0) {
    ball.isMovingDown = true
  }

}


// *** Game Loop Interval ***

setInterval(() => {
  // console.log("juego andando")
  gameLoop()
}, 1000/60) // 60fps => 60 veces por segundo



// *** Event Listeners ***




