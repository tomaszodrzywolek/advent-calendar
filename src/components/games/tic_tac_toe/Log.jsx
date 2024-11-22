export default function Log({ turns }) {

    return <ol id="log">
        {turns.map(turn => <li key={`row-${turn.square.row}-col-${turn.square.col}`}>Player {turn.player} selected {turn.square.row}, {turn.square.col}</li>)}
    </ol>

}