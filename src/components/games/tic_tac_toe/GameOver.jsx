export default function GameOver({ winner, onReset, openingCode }) {
    return <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner.winnerName} won!</p>}
        {winner && winner.symbol ==='X' && <p>Code to open the tresure: {openingCode}</p>}
        {!winner && <p>It's a draw!</p>}
        <button onClick={onReset}>Rematch!</button>
    </div>
}