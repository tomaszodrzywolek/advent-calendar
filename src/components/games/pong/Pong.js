import React, { useRef, useEffect } from 'react';
import './Pong.css';

const Pong = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const grid = 15;
        const paddleHeight = grid * 5; // 80
        const maxPaddleY = canvas.height - grid - paddleHeight;

        let paddleSpeed = 6;
        let ballSpeed = 2;

        const leftPaddle = {
            // start in the middle of the game on the left side
            x: grid * 2,
            y: canvas.height / 2 - paddleHeight / 2,
            width: grid,
            height: paddleHeight,
            dy: 0
        };

        const rightPaddle = {
            // start in the middle of the game on the right side
            x: canvas.width - grid * 3,
            y: canvas.height / 2 - paddleHeight / 2,
            width: grid,
            height: paddleHeight,
            dy: 0
        };

        const ball = {
            // start in the middle of the game
            x: canvas.width / 2,
            y: canvas.height / 2,
            width: grid,
            height: grid,
            resetting: false,
            dx: ballSpeed,
            dy: -ballSpeed
        };

        function collides(obj1, obj2) {
            return (
                obj1.x < obj2.x + obj2.width &&
                obj1.x + obj1.width > obj2.x &&
                obj1.y < obj2.y + obj2.height &&
                obj1.y + obj1.height > obj2.y
            );
        }

        let animationFrameId;

        function loop() {
            animationFrameId = requestAnimationFrame(loop);
            context.clearRect(0, 0, canvas.width, canvas.height);

            // move paddles
            leftPaddle.y += leftPaddle.dy;
            rightPaddle.y += rightPaddle.dy;

            // prevent paddles from going through walls
            if (leftPaddle.y < grid) {
                leftPaddle.y = grid;
            } else if (leftPaddle.y > maxPaddleY) {
                leftPaddle.y = maxPaddleY;
            }

            if (rightPaddle.y < grid) {
                rightPaddle.y = grid;
            } else if (rightPaddle.y > maxPaddleY) {
                rightPaddle.y = maxPaddleY;
            }

            // draw paddles
            context.fillStyle = 'white';
            context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
            context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

            // move ball
            ball.x += ball.dx;
            ball.y += ball.dy;

            // wall collision top/bottom
            if (ball.y < grid) {
                ball.y = grid;
                ball.dy *= -1;
            } else if (ball.y + grid > canvas.height - grid) {
                ball.y = canvas.height - grid * 2;
                ball.dy *= -1;
            }

            // reset ball if it goes past paddle
            if ((ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
                ball.resetting = true;

                setTimeout(() => {
                    ball.resetting = false;
                    ball.x = canvas.width / 2;
                    ball.y = canvas.height / 2;
                }, 400);
            }

            // paddle collision
            if (collides(ball, leftPaddle)) {
                ball.dx *= -1;
                ball.x = leftPaddle.x + leftPaddle.width;
            } else if (collides(ball, rightPaddle)) {
                ball.dx *= -1;
                ball.x = rightPaddle.x - ball.width;
            }

            // draw ball
            context.fillRect(ball.x, ball.y, ball.width, ball.height);

            // draw walls
            context.fillStyle = 'lightgrey';
            context.fillRect(0, 0, canvas.width, grid);
            context.fillRect(0, canvas.height - grid, canvas.width, grid);

            // draw dotted line down the middle
            for (let i = grid; i < canvas.height - grid; i += grid * 2) {
                context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
            }
        }

        function keyDownHandler(e) {
            if (e.which === 38) {
                // up arrow
                rightPaddle.dy = -paddleSpeed;
            } else if (e.which === 40) {
                // down arrow
                rightPaddle.dy = paddleSpeed;
            } else if (e.which === 87) {
                // w key
                leftPaddle.dy = -paddleSpeed;
            } else if (e.which === 83) {
                // s key
                leftPaddle.dy = paddleSpeed;
            }
        }

        function keyUpHandler(e) {
            if (e.which === 38 || e.which === 40) {
                rightPaddle.dy = 0;
            }

            if (e.which === 83 || e.which === 87) {
                leftPaddle.dy = 0;
            }
        }

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        requestAnimationFrame(loop);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="pong-container">
            <canvas width="750" height="585" ref={canvasRef}></canvas>
        </div>
    );
};

export default Pong;
