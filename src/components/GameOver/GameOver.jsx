export default function GameOver({ hasWon, onReset, openingCode }) {
    return <div id="game-over">
        <h2>Koniec Gry!</h2>
        {hasWon && <p>Wygrałaś!</p>}
        {!hasWon && <p>Nie udało się zdobyć kodu. Spróbuj jeszcze raz!</p>}
        {hasWon && <p>Kod do skrzyni: {openingCode}</p>}
        <button onClick={onReset}>Jeszcze raz!</button>
    </div>
}