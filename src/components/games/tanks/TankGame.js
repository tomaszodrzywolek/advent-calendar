import React, {useState, useEffect, useRef} from 'react';
import './TankGame.css';
import GameOver from "../../GameOver/GameOver";

function TankGame({openingCode}) {
    // Canvas reference
    const canvasRef = useRef(null);

    // Game state
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // Game settings
    const playerSpeed = 3;
    const bulletSpeed = 1;
    const enemySpeed = 0.5;
    const tankSize = 40;
    const bulletSize = 7;
    const enemyShootCooldown = 2000;

    // Refs for game objects
    const playerRef = useRef(null);
    const bulletsRef = useRef([]);
    const enemyBulletsRef = useRef([]);
    const enemiesRef = useRef([]);
    const keysRef = useRef({});

    // Initialize the game
    const initializeGame = () => {
        const canvas = canvasRef.current;
        playerRef.current = new Tank(canvas.width / 2, canvas.height - 60, 'blue');
        bulletsRef.current = [];
        enemyBulletsRef.current = [];
        enemiesRef.current = [];
        setScore(0);
        setLives(3);
        setIsGameOver(false);
        spawnEnemies(8);
    };

    // Spawn enemies
    const spawnEnemies = (count) => {
        const canvas = canvasRef.current;
        for (let i = 0; i < count; i++) {
            const x = Math.random() * (canvas.width - tankSize);
            const y = Math.random() * (canvas.height / 2 - tankSize);
            enemiesRef.current.push(new Tank(x, y, 'red'));
        }
    };

    // Classes for Tank and Bullet
    class Tank {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.direction = 'up';
            this.lastShotTime = 0;
        }

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, tankSize, tankSize);
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x + 10, this.y + 10, tankSize - 20, tankSize - 20);
        }

        move(dx, dy) {
            this.x += dx;
            this.y += dy;
            const canvas = canvasRef.current;
            this.x = Math.max(0, Math.min(canvas.width - tankSize, this.x));
            this.y = Math.max(0, Math.min(canvas.height - tankSize, this.y));
        }
    }

    class Bullet {
        constructor(x, y, dx, dy, color = 'yellow') {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.color = color;
        }

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, bulletSize, bulletSize);
        }

        move() {
            this.x += this.dx;
            this.y += this.dy;
        }

        isOffScreen(canvas) {
            return (
                this.x < 0 ||
                this.x > canvas.width ||
                this.y < 0 ||
                this.y > canvas.height
            );
        }
    }

    // Calculate direction for enemy movement
    const calculateDirection = (target, source, speed) => {
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return {dx: (dx / distance) * speed, dy: (dy / distance) * speed};
    };

    // Collision detection
    const isColliding = (obj1, obj2, size1, size2) => {
        return (
            obj1.x < obj2.x + size2 &&
            obj1.x + size1 > obj2.x &&
            obj1.y < obj2.y + size2 &&
            obj1.y + size1 > obj2.y
        );
    };

    // Shoot a bullet
    const shootBullet = (tank, direction) => {
        let dx = 0,
            dy = 0;
        if (direction === 'up') dy = -bulletSpeed;
        if (direction === 'down') dy = bulletSpeed;
        if (direction === 'left') dx = -bulletSpeed;
        if (direction === 'right') dx = bulletSpeed;

        return new Bullet(
            tank.x + tankSize / 2 - bulletSize / 2,
            tank.y + tankSize / 2 - bulletSize / 2,
            dx,
            dy
        );
    };

    // Game loop
    useEffect(() => {
        if (!gameStarted) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let animationFrameId;

        const gameLoop = () => {
            updateGame();
            renderGame(ctx);
            if (!isGameOver) {
                animationFrameId = requestAnimationFrame(gameLoop);
            }
        };

        gameLoop();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [gameStarted, isGameOver]);

    // Update game state
    const updateGame = () => {
        if (isGameOver || !gameStarted) return;

        const canvas = canvasRef.current;
        const player = playerRef.current;
        const bullets = bulletsRef.current;
        const enemyBullets = enemyBulletsRef.current;
        const enemies = enemiesRef.current;
        const keys = keysRef.current;

        // Player movement
        if (keys['ArrowUp']) {
            player.move(0, -playerSpeed);
            player.direction = 'up';
        }
        if (keys['ArrowDown']) {
            player.move(0, playerSpeed);
            player.direction = 'down';
        }
        if (keys['ArrowLeft']) {
            player.move(-playerSpeed, 0);
            player.direction = 'left';
        }
        if (keys['ArrowRight']) {
            player.move(playerSpeed, 0);
            player.direction = 'right';
        }

        // Bullets movement
        bullets.forEach((bullet) => bullet.move());
        bulletsRef.current = bullets.filter(
            (bullet) => !bullet.isOffScreen(canvas)
        );

        enemyBullets.forEach((bullet) => bullet.move());
        enemyBulletsRef.current = enemyBullets.filter(
            (bullet) => !bullet.isOffScreen(canvas)
        );

        // Enemies movement and shooting
        enemies.forEach((enemy) => {
            const {dx, dy} = calculateDirection(player, enemy, enemySpeed);
            enemy.move(dx, dy);

            const currentTime = Date.now();
            if (currentTime - enemy.lastShotTime > enemyShootCooldown) {
                const dir = calculateDirection(player, enemy, bulletSpeed);
                enemyBulletsRef.current.push(
                    new Bullet(
                        enemy.x + tankSize / 2 - bulletSize / 2,
                        enemy.y + tankSize / 2 - bulletSize / 2,
                        dir.dx,
                        dir.dy,
                        'red'
                    )
                );
                enemy.lastShotTime = currentTime;
            }
        });

        // Collision detection
        enemies.forEach((enemy, i) => {
            if (isColliding(player, enemy, tankSize, tankSize)) {
                setLives((prevLives) => {
                    const newLives = prevLives - 1;
                    if (newLives <= 0) setIsGameOver(true);
                    return newLives;
                });
                enemies.splice(i, 1);
            }
        });

        bullets.forEach((bullet, i) => {
            enemies.forEach((enemy, j) => {
                if (isColliding(bullet, enemy, bulletSize, tankSize)) {
                    bullets.splice(i, 1);
                    enemies.splice(j, 1);
                    setScore((prevScore) => prevScore + 1);
                }
            });
        });

        enemyBullets.forEach((bullet, i) => {
            if (isColliding(bullet, player, bulletSize, tankSize)) {
                enemyBullets.splice(i, 1);
                setLives((prevLives) => {
                    const newLives = prevLives - 1;
                    if (newLives <= 0) setIsGameOver(true);
                    return newLives;
                });
            }
        });
    };

    // Render game
    const renderGame = (ctx) => {
        const canvas = canvasRef.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (gameStarted) {
            playerRef.current.draw(ctx);
            bulletsRef.current.forEach((bullet) => bullet.draw(ctx));
            enemyBulletsRef.current.forEach((bullet) => bullet.draw(ctx));
            enemiesRef.current.forEach((enemy) => enemy.draw(ctx));
        }
    };

    // Key event handlers
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === ' ' && gameStarted && !isGameOver) {
                bulletsRef.current.push(
                    shootBullet(playerRef.current, playerRef.current.direction)
                );
            }
            keysRef.current[e.key] = true;
        };
        const handleKeyUp = (e) => {
            keysRef.current[e.key] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Clean up
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameStarted, isGameOver]);

    // Button handlers
    const handleStartGame = () => {
        setGameStarted(true);
        initializeGame();
    };

    const handleResetGame = () => {
        initializeGame();
    };

    return (
        <div>
            <div className="stats">
                <span>Wynik: {score}</span> | <span>Życia: {lives}</span>
            </div>
            <div className="buttons">
                {!gameStarted && (
                    <button className="button" onClick={handleStartGame}>
                        Zacznij Grę
                    </button>
                )}
            </div>
            <canvas
                id="gameCanvas"
                ref={canvasRef}
                width="800"
                height="600"
            ></canvas>
            {gameStarted && (enemiesRef.current.length === 0 || lives <= 0) &&
                <GameOver hasWon={enemiesRef.current.length === 0} onReset={handleResetGame} openingCode={openingCode}/>}
        </div>
    );
}

export default TankGame;
