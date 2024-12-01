import React, {useEffect, useRef, useState} from 'react';
import './IcyTowerGame.css';
import GameOver from "../../GameOver/GameOver";

const IcyTowerGame = ({openingCode}) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [score, setScore] = useState(0);
    const [showStartButton, setShowStartButton] = useState(true);
    const [showResetButton, setShowResetButton] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);

    const gameStartedRef = useRef(false);
    const gameLoopIdRef = useRef(null);

    // Game settings
    const gravity = 0.5;
    const jumpStrength = 12;
    const playerSpeed = 5;

    const canvasWidth = 400;
    const canvasHeight = 600;

    const platformWidth = 80;
    const platformHeight = 10;
    const platformGap = 80;
    const platformCount = 8;

    // Player settings
    const playerRef = useRef({
        x: 180,
        y: 0,
        width: 40,
        height: 40,
        dx: 0,
        dy: 0,
        grounded: false,
    });

    // Platforms
    const platformsRef = useRef([]);

    // Controls
    const keysRef = useRef({
        right: false,
        left: false,
        jump: false,
    });

    // Listen for keyboard events
    useEffect(() => {
        const handleKeyDown = (e) => {
            const keys = keysRef.current;
            if (e.key === "ArrowRight") keys.right = true;
            if (e.key === "ArrowLeft") keys.left = true;
            if (e.key === " ") keys.jump = true;
        };

        const handleKeyUp = (e) => {
            const keys = keysRef.current;
            if (e.key === "ArrowRight") keys.right = false;
            if (e.key === "ArrowLeft") keys.left = false;
            if (e.key === " ") keys.jump = false;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    // Get canvas context and start the game loop when canvas is displayed
    useEffect(() => {
        if (showCanvas) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctxRef.current = ctx;

            gameLoop(); // Start the game loop after ctxRef.current is assigned
        }
    }, [showCanvas]);

    // Clean up game loop on unmount
    useEffect(() => {
        return () => {
            cancelAnimationFrame(gameLoopIdRef.current);
        };
    }, []);

    // Initialize platforms
    const initializePlatforms = () => {
        const platforms = [];

        // Add a big starting platform
        platforms.push({
            x: 0,
            y: canvasHeight - 20,
            width: canvasWidth,
            height: 20,
        });

        // Add smaller platforms
        for (let i = 1; i < platformCount; i++) {
            platforms.push({
                x: Math.random() * (canvasWidth - platformWidth),
                y: canvasHeight - i * platformGap,
                width: platformWidth,
                height: platformHeight,
            });
        }

        platformsRef.current = platforms;
    };

    // Place the player on the big starting platform
    const placePlayerOnPlatform = () => {
        const startingPlatform = platformsRef.current[0];
        const player = playerRef.current;
        player.x = canvasWidth / 2 - player.width / 2;
        player.y = startingPlatform.y - player.height;
        player.dy = 0;
        player.grounded = true;
    };

    // Update player position
    const updatePlayer = () => {
        const keys = keysRef.current;
        const player = playerRef.current;

        // Horizontal movement
        if (keys.right) {
            player.dx = playerSpeed;
            gameStartedRef.current = true;
        } else if (keys.left) {
            player.dx = -playerSpeed;
            gameStartedRef.current = true;
        } else {
            player.dx = 0;
        }

        // Jump when Spacebar is pressed, and the player is grounded
        if (keys.jump && player.grounded) {
            player.dy = -jumpStrength;
            player.grounded = false;
        }

        // Apply gravity
        player.dy += gravity;

        // Update player position
        player.x += player.dx;
        player.y += player.dy;

        // Prevent player from moving off-screen horizontally
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvasWidth) player.x = canvasWidth - player.width;

        // Collision detection with platforms
        player.grounded = false;
        const platforms = platformsRef.current;
        platforms.forEach((platform) => {
            if (
                player.x < platform.x + platform.width &&
                player.x + player.width > platform.x &&
                player.y + player.height > platform.y &&
                player.y + player.height - player.dy <= platform.y
            ) {
                player.grounded = true;
                player.dy = 0;
                player.y = platform.y - player.height;
            }
        });
    };

    // Move platforms and generate new ones
    const updatePlatforms = () => {
        const player = playerRef.current;
        const platforms = platformsRef.current;

        // Scroll platforms down as the player jumps higher
        if (player.y < canvasHeight / 2) {
            const offset = canvasHeight / 2 - player.y;
            player.y = canvasHeight / 2;

            platforms.forEach((platform) => {
                platform.y += offset;
            });

            // Update score
            setScore((prevScore) => prevScore + Math.floor(offset));
        }

        // Remove platforms that are off-screen and generate new ones
        platforms.forEach((platform, index) => {
            if (platform.y > canvasHeight) {
                platforms.splice(index, 1);
                platforms.push({
                    x: Math.random() * (canvasWidth - platformWidth),
                    y: 0,
                    width: platformWidth,
                    height: platformHeight,
                });
            }
        });
    };

    // Draw player
    const drawPlayer = () => {
        const ctx = ctxRef.current;
        const player = playerRef.current;
        ctx.fillStyle = "red";
        ctx.fillRect(player.x, player.y, player.width, player.height);
    };

    // Draw platforms
    const drawPlatforms = () => {
        const ctx = ctxRef.current;
        const platforms = platformsRef.current;
        ctx.fillStyle = "green";
        platforms.forEach((platform) => {
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        });
    };

    // Check game over
    const checkGameOver = () => {
        const player = playerRef.current;

        if (gameStartedRef.current && player.y > canvasHeight) {
            stopGame();
        }
    };

    // Game loop
    const gameLoop = () => {
        const ctx = ctxRef.current;
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        updatePlayer();
        updatePlatforms();
        checkGameOver();

        drawPlayer();
        drawPlatforms();

        gameLoopIdRef.current = requestAnimationFrame(gameLoop);
    };

    const startGame = () => {
        // Cancel any existing game loop
        cancelAnimationFrame(gameLoopIdRef.current);

        setShowStartButton(false);
        setShowResetButton(true);
        setShowCanvas(true);

        initializePlatforms();
        placePlayerOnPlatform();
        setScore(0);
        gameStartedRef.current = false;
    };

    const stopGame = () => {
        cancelAnimationFrame(gameLoopIdRef.current);
        setShowResetButton(false);
        setShowStartButton(true);
        setShowCanvas(false);
    };

    return (
        <div>
            <h1>Platformer</h1>
            <p>Punkty: {score}</p>
            <div className="buttons">
                {showStartButton && (
                    <button className="button" onClick={startGame}>
                        Start Game
                    </button>
                )}
            </div>
            {showCanvas && (
                <canvas
                    ref={canvasRef}
                    width={canvasWidth}
                    height={canvasHeight}
                    style={{display: 'block', margin: '0 auto', background: '#add8e6'}}
                ></canvas>
            )}
            {(score >= 3000) && <GameOver hasWon={score >= 3000} onReset={startGame} openingCode={openingCode}/>}
        </div>
    );
};

export default IcyTowerGame;
