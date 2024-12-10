import React, {useState, useEffect} from 'react';
import './WordSearchGame.css';
import GameOver from "../../GameOver/GameOver";

// Lista 5 słów związanych ze Świętami Bożego Narodzenia w języku polskim
const WORDS = [
    'CHOINKA',
    'BOMBKA',
    'PREZENT',
    'GWIAZDKA',
    'MIKOŁAJ'
];

// Rozmiar siatki
const GRID_SIZE = 10;

// Funkcje pomocnicze
const getRandomInt = (max) => Math.floor(Math.random() * max);

// Kierunki, w których mogą być umieszczone słowa
const DIRECTIONS = [
    {x: 0, y: 1},   // Pionowo w dół
    {x: 1, y: 0},   // Poziomo w prawo
    {x: 1, y: 1},   // Po skosie w prawo-dół
    {x: -1, y: 1},  // Po skosie w lewo-dół
];

const WordSearchGame = ({openingCode}) => {
    const [grid, setGrid] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [selection, setSelection] = useState({start: null, end: null});
    const [message, setMessage] = useState('');
    const [wordPositions, setWordPositions] = useState([]);

    // Inicjalizacja siatki i rozmieszczenie słów
    useEffect(() => {
        const initializeGrid = () => {
            const newGrid = Array(GRID_SIZE)
                .fill(null)
                .map(() => Array(GRID_SIZE).fill(''));

            const placedWords = [];

            WORDS.forEach((word) => {
                let placed = false;
                let attempts = 0;

                while (!placed && attempts < 100) {
                    const direction = DIRECTIONS[getRandomInt(DIRECTIONS.length)];
                    const startX = getRandomInt(GRID_SIZE);
                    const startY = getRandomInt(GRID_SIZE);

                    const endX = startX + direction.x * (word.length - 1);
                    const endY = startY + direction.y * (word.length - 1);

                    // Sprawdzenie, czy słowo mieści się w siatce
                    if (
                        endX < 0 ||
                        endX >= GRID_SIZE ||
                        endY < 0 ||
                        endY >= GRID_SIZE
                    ) {
                        attempts++;
                        continue;
                    }

                    // Sprawdzenie, czy miejsce jest wolne lub zawiera tę samą literę
                    let conflict = false;
                    for (let i = 0; i < word.length; i++) {
                        const x = startX + direction.x * i;
                        const y = startY + direction.y * i;
                        if (
                            newGrid[y][x] !== '' &&
                            newGrid[y][x] !== word[i]
                        ) {
                            conflict = true;
                            break;
                        }
                    }

                    if (conflict) {
                        attempts++;
                        continue;
                    }

                    // Umieszczenie słowa w siatce
                    for (let i = 0; i < word.length; i++) {
                        const x = startX + direction.x * i;
                        const y = startY + direction.y * i;
                        newGrid[y][x] = word[i];
                    }

                    placedWords.push({
                        word: word,
                        start: {x: startX, y: startY},
                        end: {x: endX, y: endY},
                        direction: direction
                    });

                    placed = true;
                }
            });

            // Wypełnienie pustych miejsc losowymi literami
            for (let y = 0; y < GRID_SIZE; y++) {
                for (let x = 0; x < GRID_SIZE; x++) {
                    if (newGrid[y][x] === '') {
                        newGrid[y][x] = String.fromCharCode(65 + getRandomInt(26));
                    }
                }
            }

            setGrid(newGrid);
            setWordPositions(placedWords);
        };

        initializeGrid();
    }, []);

    // Obsługa kliknięć na litery
    const handleCellClick = (x, y) => {
        if (!selection.start) {
            setSelection({start: {x, y}, end: {x, y}});
        } else {
            setSelection({start: selection.start, end: {x, y}});
            checkSelection(selection.start, {x, y});
            setSelection({start: null, end: null});
        }
    };

    // Sprawdzenie, czy wybrany zakres odpowiada któremuś ze słów
    const checkSelection = (start, end) => {
        const selectedLetters = getLettersInRange(start, end).join('');

        // Sprawdzenie zarówno normalnej, jak i odwrotnej kolejności liter
        const reversed = selectedLetters.split('').reverse().join('');

        const matchedWord = WORDS.find(
            (word) =>
                word === selectedLetters ||
                word === reversed
        );

        if (matchedWord) {
            if (!foundWords.includes(matchedWord)) {
                setFoundWords([...foundWords, matchedWord]);
                setMessage(`Znalazłeś słowo: ${matchedWord}!`);
            } else {
                setMessage(`Słowo ${matchedWord} już zostało znalezione.`);
            }
        } else {
            setMessage('Nieprawidłowy wybór.');
        }
    };

    // Pobranie liter w wybranym zakresie
    const getLettersInRange = (start, end) => {
        const letters = [];

        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;

        const stepX = deltaX === 0 ? 0 : deltaX > 0 ? 1 : -1;
        const stepY = deltaY === 0 ? 0 : deltaY > 0 ? 1 : -1;

        let x = start.x;
        let y = start.y;

        // Obliczenie liczby kroków do wykonania
        const steps = Math.max(Math.abs(deltaX), Math.abs(deltaY)) + 1;

        for (let i = 0; i < steps; i++) {
            if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
                letters.push(grid[y][x]);
            }
            x += stepX;
            y += stepY;
        }

        return letters;
    };

    // Funkcja pomocnicza do sprawdzenia, czy komórka jest wybrana
    const isSelected = (x, y) => {
        if (!selection.start || !selection.end) return false;

        const selectedLetters = getLettersInRange(selection.start, selection.end).join('');
        const reversed = selectedLetters.split('').reverse().join('');

        return WORDS.includes(selectedLetters) || WORDS.includes(reversed);
    };

    // Funkcja pomocnicza do oznaczania znalezionych słów na siatce
    const getClassName = (x, y) => {
        let className = '';
        WORDS.forEach(word => {
            if (foundWords.includes(word)) {
                const wordObj = wordPositions.find(w => w.word === word);
                if (wordObj) {
                    const {start, end, direction} = wordObj;
                    for (let i = 0; i < word.length; i++) {
                        const currentX = start.x + direction.x * i;
                        const currentY = start.y + direction.y * i;
                        if (currentX === x && currentY === y) {
                            className += ' found-word';
                        }
                    }
                }
            }
        });
        return className.trim();
    };

    // Restart gry
    const restartGame = () => {
        window.location.reload();
    };

    // Jeśli siatka nie została jeszcze załadowana
    if (grid.length === 0) {
        return <div className="wordsearch-container"><p>Ładowanie siatki...</p></div>;
    }

    return (
        <div className="wordsearch-container">
            <h1>Poszukiwacz Słów: Święta Bożego Narodzenia</h1>
            <div className="game-info">
                <div className="words-to-find">
                    <h2>Słowa do znalezienia:</h2>
                    <ul>
                        {WORDS.map((word) => (
                            <li
                                key={word}
                                className={foundWords.includes(word) ? 'found' : ''}
                            >
                                {word}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="grid-container">
                    <table className="wordsearch-grid">
                        <tbody>
                        {grid.map((row, y) => (
                            <tr key={y}>
                                {row.map((letter, x) => (
                                    <td
                                        key={`${x}-${y}`}
                                        className={`${isSelected(x, y) ? 'selected' : ''} ${getClassName(x, y)}`}
                                        onClick={() => handleCellClick(x, y)}
                                    >
                                        {letter}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {message && <div className="message">{message}</div>}
            {foundWords.length === WORDS.length &&
                <GameOver hasWon={true} onReset={restartGame} openingCode={openingCode}/>}
        </div>
    );
};

export default WordSearchGame;
