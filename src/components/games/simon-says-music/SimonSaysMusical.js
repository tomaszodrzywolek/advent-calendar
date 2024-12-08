import React, {useState, useRef} from 'react';
import './SimonSaysMusical.css'
import GameOver from "../../GameOver/GameOver";

const Simon = ({openingCode}) => {
    const [score, setScore] = useState('');
    const [sequence, setSequence] = useState([]);
    const [guesses, setGuesses] = useState([]);
    const [css, setCss] = useState([]);
    const [title, setTitle] = useState('Rametta');
    const [soundOn, setSoundOn] = useState(true);
    const [on, setOn] = useState(false);

    // Refs to audio elements
    const sound1Ref = useRef(null);
    const sound2Ref = useRef(null);
    const sound3Ref = useRef(null);
    const sound4Ref = useRef(null);

    const sounds = [sound1Ref, sound2Ref, sound3Ref, sound4Ref];

    const onStart = () => {
        onReset();
        playSequence();
    };

    const onReset = () => {
        setScore(0);
        setSequence([]);
        setGuesses([]);
        setCss([]);
        setTitle('Rametta');
        setOn(true);
    };

    const onSound = () => {
        setSoundOn(prev => !prev);
    };

    const nextSequence = () => Math.floor(Math.random() * 4);

    const getClassArray = (panel) => {
        let cssArr = [];
        for (let i = 0; i < panel; i++) {
            cssArr.push('');
        }
        cssArr.push('simon-active');
        return cssArr;
    };

    const playSequence = () => {
        setGuesses([]);
        setSequence(prevSequence => {
            const newSequence = [...prevSequence, nextSequence()];
            let i = 0;
            const id = setInterval(() => {
                blinkPanel(newSequence[i++]);
                if (i === newSequence.length) clearInterval(id);
            }, 1000);
            return newSequence;
        });
    };

    const blinkPanel = (panel) => {
        const cssArr = getClassArray(panel);
        setTimeout(() => {
            setCss(cssArr);
            playSound(panel);
        }, 500);
        setTimeout(() => setCss([]), 1000);
    };

    const panelClick = (guess) => {
        if (!on) return;
        playSound(guess);
        const newGuesses = [...guesses, guess];

        // Check for a wrong guess
        for (let i = 0; i < newGuesses.length; i++) {
            if (newGuesses[i] !== sequence[i]) {
                setTitle('Game Over');
                return;
            }
        }

        setGuesses(newGuesses);

        // Check if the entire sequence is correct
        if (newGuesses.length === sequence.length) {
            let correct = true;
            for (let i = 0; i < sequence.length; i++) {
                if (sequence[i] !== newGuesses[i]) correct = false;
            }
            if (correct) {
                setScore(prevScore => prevScore + 1);
                playSequence();
            }
        }
    };

    const playSound = (panel) => {
        if (soundOn && sounds[panel].current) {
            sounds[panel].current.play();
        }
    };

    const renderPanels = () => {
        const pans = ['green', 'red', 'blue', 'yellow'];
        return pans.map((panel, i) => {
            const panelClass = `simon-${panel}-panel ${css[i] || ''}`;
            return <use key={i} className={panelClass} href="#panel" onClick={() => panelClick(i)}></use>;
        });
    };

    return (
        <>
            <audio id="sound1" ref={sound1Ref} src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
                   preload="auto"></audio>
            <audio id="sound2" ref={sound2Ref} src="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
                   preload="auto"></audio>
            <audio id="sound3" ref={sound3Ref} src="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
                   preload="auto"></audio>
            <audio id="sound4" ref={sound4Ref} src="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
                   preload="auto"></audio>

            <h3>Odtwórz sekwencję i zdobądź przynajmniej 6 punktów żeby odblokować kod</h3>
            <h3>Żeby zacząć, wciśnij start</h3>
            <svg className="simon" viewBox="0 0 1280 850">
                <defs>
                    <path id="panel"
                          d="M324.808323,9.24242491e-14 L323.128064,-5.68434189e-14 C150.82522,12.1741718 13.171985,149.852138 1,322.185938 L1,323.866499 L194.440467,323.866499 C204.652681,256.739477 257.693359,203.68927 324.808323,193.47522 L324.808323,1.42180138e-13 L324.808323,9.24242491e-14 Z"></path>
                </defs>
                <g transform="translate(85, 77)">
                    <circle className="simon-big-circle"></circle>
                    {renderPanels()}
                </g>
                <path className="simon-control-panel"
                      d="M729.42003,389.999999 C733.667892,400.844403 736,412.649855 736,425 C736,478.019336 693.019336,521 640,521 C586.980664,521 544,478.019336 544,425 C544,412.649855 546.332108,400.844403 550.57997,389.999999 L729.420038,390 Z"></path>
                <text x="353" y="416">{soundOn ? 'SOUND' : <tspan>&nbsp;OFF</tspan>}</text>
                <text x="410" y="416">RESET</text>
                <text x="466" y="416">START</text>
                <text className="simon-title" x="364" y="371">{title}</text>
                <circle id="simon-btn-yellow" cx="374" cy="436" onClick={onSound}></circle>
                <circle id="simon-btn-red" cx="430" cy="436" onClick={onReset}></circle>
                <circle id="simon-btn-blue" cx="486" cy="436" onClick={onStart}></circle>
                <rect className="simon-scoreboard" x="379" y="463"></rect>
                <text className="simon-placeholders" x="381" y="490">88888</text>
                <text id="simon-score" x="381" y="490">{score}</text>
            </svg>
            {'Game Over' === title && <GameOver hasWon={score > 5} onReset={onReset} openingCode={openingCode}/>}
        </>
    );
};

export default Simon;
