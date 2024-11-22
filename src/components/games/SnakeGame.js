// import React, { useState, useEffect, useRef } from 'react';
// import './SnakeGame.css';

// const canvasSize = 300;
// const scale = 10;
// const initialSnake = [{ x: 150, y: 150 }];
// const initialFood = getRandomPosition();

// function SnakeGame() {
//   const [snake, setSnake] = useState(initialSnake);
//   const [food, setFood] = useState(initialFood);
//   const [direction, setDirection] = useState({ dx: scale, dy: 0 });
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const context = canvasRef.current.getContext('2d');
//     context.clearRect(0, 0, canvasSize, canvasSize);
//     drawSnake(context);
//     drawFood(context);
//   }, [snake, food]);

//   useEffect(() => {
//     const moveSnake = setInterval(() => {
//       const newHead = { x: snake[0].x + direction.dx, y: snake[0].y + direction.dy };
//       const newSnake = [newHead, ...snake];

//       if (newHead.x === food.x && newHead.y === food.y) {
//         setFood(getRandomPosition());
//       } else {
//         newSnake.pop();
//       }

//       if (isCollision(newHead, newSnake)) {
//         // alert("Game Over!");
//         resetGame();
//       } else {
//         setSnake(newSnake);
//       }
//     }, 100);

//     document.addEventListener("keydown", changeDirection);
//     return () => {
//       clearInterval(moveSnake);
//       document.removeEventListener("keydown", changeDirection);
//     };
//   }, [snake, direction]);

//   function changeDirection(event) {
//     const { key } = event;
//     switch (key) {
//       case "ArrowUp":
//         if (direction.dy === 0) setDirection({ dx: 0, dy: -scale });
//         break;
//       case "ArrowDown":
//         if (direction.dy === 0) setDirection({ dx: 0, dy: scale });
//         break;
//       case "ArrowLeft":
//         if (direction.dx === 0) setDirection({ dx: -scale, dy: 0 });
//         break;
//       case "ArrowRight":
//         if (direction.dx === 0) setDirection({ dx: scale, dy: 0 });
//         break;
//       default:
//         break;
//     }
//   }

//   function isCollision(head, snake) {
//     return (
//       head.x < 0 ||
//       head.x >= canvasSize ||
//       head.y < 0 ||
//       head.y >= canvasSize ||
//       snake.slice(1).some(part => part.x === head.x && part.y === head.y)
//     );
//   }

//   function resetGame() {
//     setSnake(initialSnake);
//     setFood(getRandomPosition());
//     setDirection({ dx: scale, dy: 0 });
//   }

//   function drawSnake(context) {
//     context.fillStyle = "green";
//     snake.forEach(part => context.fillRect(part.x, part.y, scale, scale));
//   }

//   function drawFood(context) {
//     context.fillStyle = "red";
//     context.fillRect(food.x, food.y, scale, scale);
//   }

//   return <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />;
// }

// function getRandomPosition() {
//   return {
//     x: Math.floor((Math.random() * canvasSize) / scale) * scale,
//     y: Math.floor((Math.random() * canvasSize) / scale) * scale
//   };
// }

// export default SnakeGame;
