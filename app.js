  const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const carWidth = 20;
    const carHeight = 40;
    const roadWidth = 200;
    const roadHeight = 400;
    const obstacleWidth = 50;
    const obstacleHeight = 50;

    const roadOffsetX = canvas.width / 2 - roadWidth / 2;

    let carX = canvas.width / 2 - carWidth / 2;
    let carY = canvas.height - carHeight - 10;
    let obstacleX = roadOffsetX;
    let obstacleY = -obstacleHeight;
    let carSpeedX = 10;
    let obstacleSpeedY = 5;
    let score = 0;

    function drawCar() {
      ctx.fillStyle = "blue";
      ctx.fillRect(carX, carY, carWidth, carHeight);
      // Ventanas
      ctx.fillStyle = "black";
      ctx.fillRect(carX + 3, carY + 5, 5, 10);
      ctx.fillRect(carX + 12, carY + 5, 5, 10);
      // Ruedas
      ctx.fillStyle = "black";
      ctx.fillRect(carX + 3, carY - 5, 5, 5);
      ctx.fillRect(carX + 12, carY - 5, 5, 5);
      ctx.fillRect(carX + 3, carY + carHeight, 5, 5);
      ctx.fillRect(carX + 12, carY + carHeight, 5, 5);
    }

    function drawRoad() {
      ctx.fillStyle = "gray";
      ctx.fillRect(roadOffsetX, 0, roadWidth, roadHeight);
    }

    function drawObstacle() {
      ctx.fillStyle = "red";
      ctx.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
    }

    function drawScore() {
      ctx.fillStyle = "black";
      ctx.font = "20px Arial, sans-serif";
      ctx.fillText("Score: " + score, 10, 30);
    }

    function checkCollision() {
      if (
        carX < obstacleX + obstacleWidth &&
        carX + carWidth > obstacleX &&
        carY < obstacleY + obstacleHeight &&
        carY + carHeight > obstacleY
      ) {
        return true;
      }
      return false;
    }

    function update() {
      obstacleY += obstacleSpeedY;

      if (obstacleY > canvas.height) {
        obstacleY = -obstacleHeight;
        obstacleX = roadOffsetX + Math.random() * (roadWidth - obstacleWidth);
        score++;
      }

      if (checkCollision()) {
        alert("¡Choque! Tu puntuación final es: " + score);
        carX = canvas.width / 2 - carWidth / 2;
        carY = canvas.height - carHeight - 10;
        obstacleX = roadOffsetX;
        obstacleY = -obstacleHeight;
        score = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawRoad();
      drawCar();
      drawObstacle();
      drawScore();

      requestAnimationFrame(update);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        carX -= carSpeedX;
      } else if (event.key === "ArrowRight") {
        carX += carSpeedX;
      }

      // Limitar el movimiento del coche dentro de la carretera
      if (carX < roadOffsetX) {
        carX = roadOffsetX;
      } else if (carX + carWidth > roadOffsetX + roadWidth) {
        carX = roadOffsetX + roadWidth - carWidth;
      }
    });

    update();