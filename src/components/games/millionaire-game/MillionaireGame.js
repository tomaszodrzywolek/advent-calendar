import React, {useState, useEffect} from 'react';
import './MillionaireGame.css';
import GameOver from "../../GameOver/GameOver";

const allQuestions = [
    {
        question: 'Jaki tradycyjny napój piwnego wieczoru wigilijnego jest popularny w Polsce?',
        options: {
            A: 'Kompot z suszu',
            B: 'Grzane wino',
            C: 'Mleko z miodem',
            D: 'Coca-Cola'
        },
        correct: 'A'
    },
    {
        question: 'Jak nazywa się tradycyjna polska kolęda?',
        options: {
            A: 'Sto lat',
            B: 'Cicha noc',
            C: 'Wśród nocnej ciszy',
            D: 'Happy Birthday'
        },
        correct: 'C'
    },
    {
        question: 'Który dzień obchodzimy Wigilię Bożego Narodzenia w Polsce?',
        options: {
            A: '24 grudnia',
            B: '25 grudnia',
            C: '31 grudnia',
            D: '1 stycznia'
        },
        correct: 'A'
    },
    {
        question: 'Co tradycyjnie znajduje się pod obrusem na polskim stole wigilijnym?',
        options: {
            A: 'Sól i pieprz',
            B: 'Opłatek',
            C: 'Świeczka',
            D: 'Skarpetka'
        },
        correct: 'B'
    },
    {
        question: 'Jak nazywa się postać, która przynosi prezenty dzieciom w Polsce?',
        options: {
            A: 'Święty Mikołaj',
            B: 'Janosik',
            C: 'Smok Wawelski',
            D: 'Królowa Śniegu'
        },
        correct: 'A'
    },
    {
        question: 'Co tradycyjnie wkładamy do wieńca adwentowego?',
        options: {
            A: 'Orzechy',
            B: 'Świece',
            C: 'Jabłka',
            D: 'Cynamon'
        },
        correct: 'B'
    },
    {
        question: 'Jak nazywa się tradycyjny polski piernik?',
        options: {
            A: 'Piernik toruński',
            B: 'Piernik warszawski',
            C: 'Piernik krakowski',
            D: 'Piernik gdański'
        },
        correct: 'A'
    },
    {
        question: 'Która z poniższych potraw nie znajduje się na tradycyjnym polskim stole wigilijnym?',
        options: {
            A: 'Barszcz czerwony',
            B: 'Uszka',
            C: 'Karp smażony',
            D: 'Łamanie opłatka'
        },
        correct: 'D'
    },
    {
        question: 'Jak nazywa się tradycyjna polska zabawa w czasie Wigilii?',
        options: {
            A: 'Śpiewanie kolęd',
            B: 'Dziadek Mróz',
            C: 'Łamanie opłatka',
            D: 'Rozpakowywanie prezentów'
        },
        correct: 'C'
    },
    {
        question: 'Który zwierzak jest symbolem świąt Bożego Narodzenia w Polsce?',
        options: {
            A: 'Renifer',
            B: 'Jeleń',
            C: 'Świnia',
            D: 'Lis'
        },
        correct: 'A'
    },
    {
        question: 'Jak nazywa się tradycyjny polski deser wigilijny?',
        options: {
            A: 'Makowiec',
            B: 'Sernik',
            C: 'Szarlotka',
            D: 'Tiramisu'
        },
        correct: 'A'
    },
    {
        question: 'Który z poniższych jest tradycyjną polską potrawą wigilijną?',
        options: {
            A: 'Zupa pomidorowa',
            B: 'Ryba po grecku',
            C: 'Lasagne',
            D: 'Sushi'
        },
        correct: 'B'
    },
    {
        question: 'Co symbolizuje gwiazda betlejemska na szczycie choinki?',
        options: {
            A: 'Gwiazda Polarna',
            B: 'Gwiazda Światełka',
            C: 'Gwiazda Betlejemska',
            D: 'Gwiazda Poranna'
        },
        correct: 'C'
    },
    {
        question: 'W jakim języku tradycyjnie śpiewane są kolędy w Polsce?',
        options: {
            A: 'Polski',
            B: 'Niemiecki',
            C: 'Angielski',
            D: 'Łaciński'
        },
        correct: 'A'
    },
    {
        question: 'Jak nazywa się tradycyjny polski prezent bożonarodzeniowy?',
        options: {
            A: 'Słodycze',
            B: 'Książka',
            C: 'Rękawiczki',
            D: 'Wszystkie powyższe'
        },
        correct: 'D'
    },
    {
        question: 'Jakie zwierzę jest często przedstawiane na polskich ozdobach bożonarodzeniowych?',
        options: {
            A: 'Koziołek',
            B: 'Kura',
            C: 'Koń',
            D: 'Świnia'
        },
        correct: 'A'
    }
];

// Funkcja do losowego wyboru 5 pytań z 15
const getRandomQuestions = (questions, num = 5) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

const MillionaireGame = ({openingCode}) => {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [usedLifelines, setUsedLifelines] = useState({
        fiftyFifty: false,
        phoneAFriend: false,
        askTheAudience: false
    });
    const [removedOptions, setRemovedOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);

    // Wybierz losowe 5 pytań na początku gry
    useEffect(() => {
        const questions = getRandomQuestions(allQuestions, 5);
        setSelectedQuestions(questions);
    }, []);

    const handleAnswer = (option) => {
        const correctOption = selectedQuestions[currentQuestion].correct;
        if (option === correctOption) {
            if (currentQuestion === selectedQuestions.length - 1) {
                setGameOver(true);
            } else {
                setCurrentQuestion(currentQuestion + 1);
                setRemovedOptions([]);
                setMessage('');
            }
        } else {
            setGameOver(true);
        }
    };

    const useFiftyFifty = () => {
        if (usedLifelines.fiftyFifty) return;
        const correct = selectedQuestions[currentQuestion].correct;
        const options = Object.keys(selectedQuestions[currentQuestion].options).filter(
            (key) => key !== correct
        );
        const removed = options.sort(() => 0.5 - Math.random()).slice(0, 2);
        setRemovedOptions(removed);
        setUsedLifelines({...usedLifelines, fiftyFifty: true});
    };

    const usePhoneAFriend = () => {
        if (usedLifelines.phoneAFriend) return;
        const correct = selectedQuestions[currentQuestion].correct;
        const hint = Math.random() > 0.5
            ? correct
            : Object.keys(selectedQuestions[currentQuestion].options).filter(key => key !== correct)[Math.floor(Math.random() * 3)];
        setMessage(`Przyjaciel sugeruje opcję: ${hint}`);
        setUsedLifelines({...usedLifelines, phoneAFriend: true});
    };

    const useAskTheAudience = () => {
        if (usedLifelines.askTheAudience) return;
        const correct = selectedQuestions[currentQuestion].correct;
        const percentages = {A: 0, B: 0, C: 0, D: 0};
        const correctPercentage = Math.floor(Math.random() * 41) + 40; // 40-80%
        percentages[correct] = correctPercentage;
        let remaining = 100 - correctPercentage;
        const options = Object.keys(selectedQuestions[currentQuestion].options).filter(key => key !== correct);
        options.forEach((key, index) => {
            if (index === options.length - 1) {
                percentages[key] = remaining;
            } else {
                const perc = Math.floor(Math.random() * (remaining + 1));
                percentages[key] = perc;
                remaining -= perc;
            }
        });
        let audienceMessage = 'Głosowanie publiczności:\n';
        for (let key in percentages) {
            audienceMessage += `${key}: ${percentages[key]}%\n`;
        }
        setMessage(audienceMessage);
        setUsedLifelines({...usedLifelines, askTheAudience: true});
    };

    const restartGame = () => {
        const questions = getRandomQuestions(allQuestions, 5);
        setSelectedQuestions(questions);
        setCurrentQuestion(0);
        setUsedLifelines({
            fiftyFifty: false,
            phoneAFriend: false,
            askTheAudience: false
        });
        setRemovedOptions([]);
        setMessage('');
        setGameOver(false);
    };

    // Jeśli pytania nie zostały jeszcze załadowane
    if (selectedQuestions.length === 0) {
        return <div className="game-container"><p>Ładowanie pytań...</p></div>;
    }

    const currentQ = selectedQuestions[currentQuestion];

    return (
        <div className="game-container">
            {!gameOver ? (
                <>
                    <h2>Pytanie {currentQuestion + 1} z {selectedQuestions.length}</h2>
                    <p className="question">{currentQ.question}</p>
                    <div className="options">
                        {Object.entries(currentQ.options).map(([key, value]) => (
                            !removedOptions.includes(key) && (
                                <button
                                    key={key}
                                    className="option-button"
                                    onClick={() => handleAnswer(key)}
                                >
                                    <strong>{key}:</strong> {value}
                                </button>
                            )
                        ))}
                    </div>
                    <div className="lifelines">
                        <button
                            onClick={useFiftyFifty}
                            disabled={usedLifelines.fiftyFifty}
                            className="lifeline-button"
                        >
                            50:50
                        </button>
                        <button
                            onClick={usePhoneAFriend}
                            disabled={usedLifelines.phoneAFriend}
                            className="lifeline-button"
                        >
                            Telefon do przyjaciela
                        </button>
                        <button
                            onClick={useAskTheAudience}
                            disabled={usedLifelines.askTheAudience}
                            className="lifeline-button"
                        >
                            Pytanie do publiczności
                        </button>
                    </div>
                    {message && <div className="message">{message}</div>}
                </>
            ) : <GameOver hasWon={currentQuestion === selectedQuestions.length - 1} onReset={restartGame}
                          openingCode={openingCode}/>
            }
        </div>
    );
};

export default MillionaireGame;
