import GameOver from '../tic_tac_toe/GameOver';
import './Snake.css';
import React from 'react';

const start = {
    active: true,
    speed: 120, // ms
    direction: "right",
    snake: [[50, 70], [60, 70], [70, 70], [80, 70]], // Start with 4 block snake
    food: [200, 70],
    score: 0
};

let winner = undefined;

function deriveWinner() {
  }

class SnakeGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = start;
    }

    startStop = manual => {
        let active = this.state.active;
        if (manual) {
            this.setState({ active: !active });
        }
        // This is reading the previous state, before manual switched it
        if (!active) {
            this.interval = setInterval(() => this.updateSnake(), this.state.speed);
        } else {
            clearInterval(this.interval);
            winner = undefined
            this.setState({
                active: false,
                speed: 120, // ms
                direction: "right",
                snake: [[50, 70], [60, 70], [70, 70], [80, 70]], // Start with 4 block snake
                food: [200, 70],
                score: 0
            });
        }
    };

    updateSnake() {
        var direction = this.state.direction;
        var currentSnake = this.state.snake;
        var snakeHead = currentSnake[currentSnake.length - 1];
        var newHead = [];
        var target = this.state.food;
        switch (direction) {
            case "up":
                newHead = [snakeHead[0], snakeHead[1] - 10];
                break;
            case "right":
                newHead = [snakeHead[0] + 10, snakeHead[1]];
                break;
            case "down":
                newHead = [snakeHead[0], snakeHead[1] + 10];
                break;
            case "left":
                newHead = [snakeHead[0] - 10, snakeHead[1]];
                break;
            default:
                newHead = [snakeHead[0], snakeHead[1]];
        }
        currentSnake.push(newHead);

        currentSnake.forEach((val, i, array) => {
            // As long as its not checking against itself...
            if (i != array.length - 1) {
                // Check if its colluding with its body
                if (val.toString() == newHead.toString()) {
                    // Head has collided with body
                    //   console.log('collide');
                    winner = {winnerName: 'Daria', symbol: 'X'};
                }
            }
        });

        // collusion detection
        if (
            newHead[0] > 390 ||
            newHead[0] < 0 ||
            newHead[1] > 320 ||
            newHead[1] < 30
        ) {
            // Enable this is you want the wall collusion rule
            // this.startStop(true);

            // This is teleporting the snake through the walls
            let teleHead = currentSnake[currentSnake.length - 1];
            if (newHead[0] > 390) {
                teleHead[0] = teleHead[0] - 400;
                currentSnake.shift();
            }
            if (newHead[0] < 0) {
                teleHead[0] = teleHead[0] + 400;
                currentSnake.shift();
            }
            if (newHead[1] > 320) {
                teleHead[1] = teleHead[1] - 300;
                currentSnake.shift();
            }
            if (newHead[1] < 30) {
                teleHead[1] = teleHead[1] + 300;
                currentSnake.shift();
            }
        } else {
            // If food is eaten
            if (newHead[0] == target[0] && newHead[1] == target[1]) {
                let posX = Math.floor(Math.random() * (380 - 10 + 1)) + 10;
                let posY = Math.floor(Math.random() * (280 - 40 + 1)) + 40;
                posX = Math.ceil(posX / 10) * 10;
                posY = Math.ceil(posY / 10) * 10;
                this.setState(prevState => ({
                    snake: currentSnake,
                    food: [posX, posY],
                    score: prevState.score + 1
                }));
            } else {
                currentSnake.shift();
                if (this.state.active) {
                    this.setState({ snake: currentSnake });
                }
            }
        }
    }

    handleKeys = event => {
        let currentD = this.state.direction;
        console.log(currentD);
        let active = this.state.active;
        //  console.log(event.keyCode);
        if (event.keyCode === 13) {
            this.startStop(true);
        }
        if (event.keyCode === 65 && currentD != "right") {
            this.setState({ direction: "left" });
            this.swapClass();
        }
        if (event.keyCode === 68 && currentD != "left") {
            this.setState({ direction: "right" });
            this.swapClass();
        }
        if (event.keyCode === 87 && currentD != "down") {
            this.setState({ direction: "up" });
            this.swapClass();
        }
        if (event.keyCode === 83 && currentD != "up") {
            this.setState({ direction: "down" });
            this.swapClass();
        }
    };

    componentDidMount() {
        this.swapClass();
        document.addEventListener("keydown", this.handleKeys, false);
        if (this.state.active) {
            this.startStop(false);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // When the state changes, check if we've reached a % 5 milestone
        // Run speedUp once, but not again until next time (state updates each time snake moves)
        let score = this.state.score;
        if (score % 3 == 0 && score > 0 && score != prevState.score) {
            this.speedUp();
        }

        document.addEventListener("keydown", this.handleKeys, false);
    }

    speedUp = () => {
        let speed = this.state.speed;
        if (speed > 50) {
            speed = speed - 2;
        }
        clearInterval(this.interval);
        this.interval = setInterval(() => this.updateSnake(), speed);
        this.setState({ speed: speed });
    };

    // #root takes on the class of the direction, good for styling opportunities?
    swapClass = () => {
        var root = document.getElementById("snake-game-container");
        root.className = "";
        root.className = this.state.direction;
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        var theSnake = this.state.snake;
        var food = this.state.food;
        return (
            <div id="snake-game-container" className='snake-game-container'>
                <Menu active={this.state.active} />
                <Score score={this.state.score} high_score={this.state.high_score} />
                {theSnake.map((val, i) => (
                    <Part
                        key={i}
                        transition={this.state.speed}
                        direction={this.state.direction}
                        top={val[1]}
                        left={val[0]}
                    />
                ))}
                <Food top={food[1]} left={food[0]} />
                {(winner) && <GameOver winner={winner} onReset={() => {this.startStop(true)}} openingCode={123} />}
            </div>
        );
    }
}

class Score extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let snake = this.props.snake;
        return (
            <div className="score">
                <span>
                    Score: <strong>{this.props.score}</strong>
                </span>
            </div>
        );
    }
}

class Part extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var classes = "part " + this.props.direction;
        return (
            <article
                style={{
                    transition: this.props.transition + 50 + "ms",
                    top: this.props.top + "px",
                    left: this.props.left + "px"
                }}
                className={classes}
            />
        );
    }
}

class Food extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                style={{ top: this.props.top + "px", left: this.props.left + "px" }}
                className="food"
            />
        );
    }
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // message: 'Press <span>Enter</span> to start'
        };
    }

    render() {
        var menu_list = this.props.active ? "menu hidden" : "menu";
        return (
            <div className={menu_list}>
                Press <span>enter</span> to start<br />
                <span>w a s d</span> keys to control
            </div>
        );
    }
}

export default SnakeGame;
