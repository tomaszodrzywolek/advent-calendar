// SpaceInvaders.js
import React, {useEffect, useRef, useState} from 'react';
import './SpaceInvaders.css';
import GameOver from "../../GameOver/GameOver";

const SpaceInvaders = (props) => {
  const canvasRef = useRef(null);
  const keysRef = useRef({}); // Use useRef instead of useState for keys
  const [player, setPlayer] = useState({
    x: 370,
    y: 550,
    width: 60,
    height: 10,
    color: 'green',
    lives: 3,
  });
  const [invaders, setInvaders] = useState([]);
  const [bullets, setBullets] = useState([]);
  const [bombs, setBombs] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [direction, setDirection] = useState('right');
  const bombDelayRef = useRef(3000);
  const animationRef = useRef(null);

  // Initialize body styles using useEffect
  useEffect(() => {
    // Apply styles to the body
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = 'lightgrey';
    return () => {
      // Cleanup styles on component unmount
      document.body.style.overflow = '';
      document.body.style.backgroundColor = '';
    };
  }, []);

  // Focus the canvas on component mount
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
  }, []);

  // Initialize invaders on component mount
  useEffect(() => {
    createInvaders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle keydown and keyup events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Spacebar') {
        e.preventDefault(); // Prevent default scrolling behavior
      }
      keysRef.current[e.code] = true;
      // Optional: Uncomment for debugging
      // console.log('KeyDown:', e.code);
    };
    const handleKeyUp = (e) => {
      if (e.code === 'Space' || e.code === 'Spacebar') {
        e.preventDefault(); // Prevent default scrolling behavior
      }
      keysRef.current[e.code] = false;
      // Optional: Uncomment for debugging
      // console.log('KeyUp:', e.code);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (gameOver || victory) {
      cancelAnimationFrame(animationRef.current);
      return;
    }
    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, victory, player, invaders, bullets, bombs]);

  // Monitor invaders for victory condition
  useEffect(() => {
    if (invaders.length > 0 && invaders.every(inv => inv.broken)) {
      setVictory(true);
    }
  }, [invaders]);

  // Create invaders
  const createInvaders = () => {
    const newInvaders = [];
    let invX = 100;
    let invY = 100;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++) {
        newInvaders.push({
          x: invX,
          y: invY,
          width: 60,
          height: 40,
          broken: false,
        });
        invX += 60;
      }
      invX = 100;
      invY += 45;
    }
    setInvaders(newInvaders);
  };

  // Draw function
  const draw = () => {
    const canvas = canvasRef.current;
    const pen = canvas.getContext('2d');
    pen.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    pen.fillStyle = player.color;
    pen.fillRect(player.x, player.y, player.width, player.height);

    // Draw health
    pen.fillStyle = 'red';
    pen.font = '20px Segoe UI';
    pen.fillText('❤ '.repeat(player.lives), 10, canvas.height - 10);

    // Draw invaders
    invaders.forEach((inv) => {
      if (!inv.broken) {
        drawInvader(pen, inv.x, inv.y);
      }
    });

    // Draw bullets
    pen.fillStyle = 'green';
    bullets.forEach((bullet, index) => {
      pen.fillRect(bullet.x, bullet.y, 2, 8);
      bullet.y -= 10;
      if (bullet.y < -5) {
        setBullets((prev) => prev.filter((_, i) => i !== index));
      }
    });

    // Draw bombs
    pen.fillStyle = 'red';
    bombs.forEach((bomb, index) => {
      pen.fillRect(bomb.x, bomb.y, 2, 8);
      bomb.y += 10;
      if (bomb.y > canvas.height) {
        setBombs((prev) => prev.filter((_, i) => i !== index));
      }
    });

    // Handle key inputs
    handleKeys();

    // Detect collisions
    collisionDetection();

    if (!gameOver && !victory) {
      animationRef.current = requestAnimationFrame(draw);
    }
  };

  // Function to draw individual invader
  const drawInvader = (pen, x, y) => {
    pen.fillStyle = 'brown';
    pen.beginPath();
    pen.rect(x + 10, y + 0, 5, 5);
    pen.rect(x + 40, y + 0, 5, 5);
    pen.rect(x + 15, y + 5, 5, 5);
    pen.rect(x + 35, y + 5, 5, 5);
    pen.rect(x + 10, y + 10, 35, 5);
    pen.rect(x + 5, y + 15, 10, 5);
    pen.rect(x + 20, y + 15, 15, 5);
    pen.rect(x + 40, y + 15, 10, 5);
    pen.rect(x + 0, y + 20, 55, 5);
    pen.rect(x + 0, y + 25, 5, 5);
    pen.rect(x + 10, y + 25, 35, 5);
    pen.rect(x + 50, y + 25, 5, 5);
    pen.rect(x + 0, y + 30, 5, 5);
    pen.rect(x + 10, y + 30, 5, 5);
    pen.rect(x + 40, y + 30, 5, 5);
    pen.rect(x + 50, y + 30, 5, 5);
    pen.rect(x + 15, y + 35, 10, 5);
    pen.rect(x + 30, y + 35, 10, 5);
    pen.fill();
  };

  // Handle key inputs
  const handleKeys = () => {
    const keys = keysRef.current;

    // Optional: Uncomment for debugging
    // console.log('Current Keys:', keys);

    if (keys['Space'] || keys['Spacebar']) { // Check for both 'Space' and 'Spacebar'
      if (!gameStart) {
        startGame();
      }
      if (bullets.length < 1) {
        const bullet = {
          x: player.x + player.width / 2,
          y: player.y - 5,
        };
        setBullets((prev) => [...prev, bullet]);
      }
      // Prevent continuous firing while holding Space
      keysRef.current['Space'] = false;
      keysRef.current['Spacebar'] = false;
    }
    if (keys['ArrowLeft'] && player.x > 0) {
      setPlayer((prev) => ({...prev, x: prev.x - 10}));
    }
    if (keys['ArrowRight'] && player.x < 800 - player.width) {
      setPlayer((prev) => ({...prev, x: prev.x + 10}));
    }
  };

  // Start the game
  const startGame = () => {
    setGameStart(true);
    invaderMove();
    invaderShoot();
  };

  // Invader movement logic
  const invaderMove = () => {
    if (gameOver || victory) return;

    setInvaders((prevInvaders) => {
      let shouldChangeDirection = false;
      let reachedBottom = false;

      prevInvaders.forEach((inv) => {
        if (!inv.broken) {
          if (inv.x <= 0 || inv.x + inv.width >= 800) {
            shouldChangeDirection = true;
          }
          if (inv.y + inv.height >= player.y) { // Check if invader reaches player's y
            reachedBottom = true;
          }
        }
      });

      if (reachedBottom) {
        setGameOver(true);
        return prevInvaders; // No change needed
      }

      if (shouldChangeDirection) {
        setDirection((prev) => (prev === 'right' ? 'left' : 'right'));
        return prevInvaders.map((inv) => ({
          ...inv,
          y: inv.y + 10,
        }));
      } else {
        return prevInvaders.map((inv) => ({
          ...inv,
          x: direction === 'right' ? inv.x + 10 : inv.x - 10,
        }));
      }
    });

    // Continue moving
    setTimeout(invaderMove, 500);
  };

  // Invader shooting logic
  const invaderShoot = () => {
    if (gameOver || victory) return;

    const aliveInvaders = invaders.filter((inv) => !inv.broken);
    if (aliveInvaders.length === 0) return;

    const randomIndex = Math.floor(Math.random() * aliveInvaders.length);
    const shooter = aliveInvaders[randomIndex];
    const bomb = {
      x: shooter.x + shooter.width / 2,
      y: shooter.y + shooter.height,
    };
    setBombs((prev) => [...prev, bomb]);

    // Decrease bomb delay to increase difficulty
    if (bombDelayRef.current > 1000) {
      bombDelayRef.current -= 250;
    }

    setTimeout(invaderShoot, bombDelayRef.current);
  };

  // Collision Detection
  const collisionDetection = () => {
    // Bullets vs Invaders
    bullets.forEach((bullet, bIndex) => {
      invaders.forEach((inv, iIndex) => {
        if (!inv.broken) {
          const distX = Math.abs(bullet.x - (inv.x + inv.width / 2));
          const distY = Math.abs(bullet.y - (inv.y + inv.height / 2));

          if (distX <= inv.width / 2 + 1 && distY <= inv.height / 2 + 2) {
            // Collision detected
            setInvaders((prev) =>
              prev.map((invader, idx) =>
                idx === iIndex ? {...invader, broken: true} : invader
              )
            );
            setBullets((prev) => prev.filter((_, idx) => idx !== bIndex));
            // Victory condition is now handled by useEffect monitoring invaders
          }
        }
      });
    });

    // Bombs vs Player
    bombs.forEach((bomb, bIndex) => {
      const distX = Math.abs(bomb.x - (player.x + player.width / 2));
      const distY = Math.abs(bomb.y - (player.y + player.height / 2));

      if (distX <= player.width / 2 + 1 && distY <= player.height / 2 + 2) {
        // Collision detected
        setBombs((prev) => prev.filter((_, idx) => idx !== bIndex));
        setPlayer((prev) => ({...prev, lives: prev.lives - 1}));

        if (player.lives - 1 === 0) {
          setGameOver(true);
          alert('Game Over!');
        }
      }
    });
  };

  // Restart the game
  const restartGame = () => {
    // Reset all states to initial values
    setPlayer({
      x: 370,
      y: 550,
      width: 60,
      height: 10,
      color: 'green',
      lives: 3,
    });
    setInvaders([]);
    setBullets([]);
    setBombs([]);
    setGameStart(false);
    setGameOver(false);
    setVictory(false);
    setDirection('right');
    bombDelayRef.current = 3000;
    createInvaders();
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
  };

  return (
    <div className="space-invaders-container">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="space-invaders-canvas"
        tabIndex="0" // Make canvas focusable
        onClick={() => canvasRef.current.focus()} // Focus canvas on click
      ></canvas>
      {(victory || gameOver) && <GameOver hasWon={victory} onReset={restartGame} openingCode={props.openingCode}/>}
    </div>
  );
};

export default SpaceInvaders;
