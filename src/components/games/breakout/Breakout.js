import React, {useRef, useEffect, useState} from 'react';
import './Breakout.css';
import GameOver from "../../GameOver/GameOver";

const BreakoutGame = ({openingCode}) => {
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const level1 = [
            [],
            [],
            [],
            [],
            [],
            [],
            ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
            ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
            ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
            ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
            ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
            ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y']
        ];

        const colorMap = {
            'R': 'red',
            'O': 'orange',
            'G': 'green',
            'Y': 'yellow'
        };

        const brickGap = 2;
        const brickWidth = 25;
        const paddleWidth = 75;
        const brickHeight = 12;
        const wallSize = 12;

        let bricks = [];

        function createBricks() {
            bricks = [];
            for (let row = 0; row < level1.length; row++) {
                for (let col = 0; col < level1[row].length; col++) {
                    const colorCode = level1[row][col];
                    bricks.push({
                        x: wallSize + (brickWidth + brickGap) * col,
                        y: wallSize + (brickHeight + brickGap) * row,
                        color: colorMap[colorCode],
                        width: brickWidth,
                        height: brickHeight
                    });
                }
            }
            console.log(bricks.length);
        }

        createBricks();

        const paddle = {
            x: canvas.width / 2 - brickWidth / 2,
            y: 440,
            width: paddleWidth,
            height: brickHeight,
            dx: 0
        };

        const ball = {
            x: 130,
            y: 260,
            width: 5,
            height: 5,
            speed: 4,
            dx: 0,
            dy: 0
        };

        function collides(obj1, obj2) {
            return obj1.x < obj2.x + obj2.width &&
                obj1.x + obj1.width > obj2.x &&
                obj1.y < obj2.y + obj2.height &&
                obj1.y + obj1.height > obj2.y;
        }

        let animationFrameId;

        function loop() {
            animationFrameId = requestAnimationFrame(loop);
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Move paddle
            paddle.x += paddle.dx;

            // Wall collision for paddle
            if (paddle.x < wallSize) {
                paddle.x = wallSize;
            } else if (paddle.x + paddle.width > canvas.width - wallSize) {
                paddle.x = canvas.width - wallSize - paddle.width;
            }

            // Move ball
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Wall collision for ball
            if (ball.x < wallSize) {
                ball.x = wallSize;
                ball.dx *= -1;
            } else if (ball.x + ball.width > canvas.width - wallSize) {
                ball.x = canvas.width - wallSize - ball.width;
                ball.dx *= -1;
            }
            if (ball.y < wallSize) {
                ball.y = wallSize;
                ball.dy *= -1;
            }

            // Ball falls below bottom
            if (ball.y > canvas.height) {
                // Reset ball and paddle
                ball.x = 130;
                ball.y = 260;
                ball.dx = 0;
                ball.dy = 0;
            }

            // Check collision with paddle
            if (collides(ball, paddle)) {
                ball.dy *= -1;
                ball.y = paddle.y - ball.height;
            }

            // Check collision with bricks
            for (let i = 0; i < bricks.length; i++) {
                const brick = bricks[i];
                if (collides(ball, brick)) {
                    bricks.splice(i, 1);

                    // Determine direction of collision
                    if (ball.y + ball.height - ball.speed <= brick.y ||
                        ball.y >= brick.y + brick.height - ball.speed) {
                        ball.dy *= -1;
                    } else {
                        ball.dx *= -1;
                    }

                    // Check if all bricks are destroyed
                    if (bricks.length === 0) {
                        setGameOver(true);
                    }

                    break;
                }
            }

            // Draw walls
            context.fillStyle = 'lightgrey';
            context.fillRect(0, 0, canvas.width, wallSize);
            context.fillRect(0, 0, wallSize, canvas.height);
            context.fillRect(canvas.width - wallSize, 0, wallSize, canvas.height);

            // Draw ball
            if (ball.dx || ball.dy) {
                context.fillRect(ball.x, ball.y, ball.width, ball.height);
            }

            // Draw bricks
            bricks.forEach((brick) => {
                context.fillStyle = brick.color;
                context.fillRect(brick.x, brick.y, brick.width, brick.height);
            });

            // Draw paddle
            context.fillStyle = 'cyan';
            context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        }

        function keydownHandler(e) {
            if (e.which === 37) {
                paddle.dx = -3;
            } else if (e.which === 39) {
                paddle.dx = 3;
            }
            if (ball.dx === 0 && ball.dy === 0 && e.which === 32) {
                ball.dx = ball.speed;
                ball.dy = ball.speed;
            }
        }

        function keyupHandler(e) {
            if (e.which === 37 || e.which === 39) {
                paddle.dx = 0;
            }
        }

        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('keyup', keyupHandler);

        requestAnimationFrame(loop);

        // Cleanup
        return () => {
            document.removeEventListener('keydown', keydownHandler);
            document.removeEventListener('keyup', keyupHandler);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                width="400"
                height="500"
                className="breakout-canvas"
            />
            {gameOver && <GameOver hasWon={true} onReset={undefined} openingCode={openingCode} />}
        </>

    );
};

export default BreakoutGame;
