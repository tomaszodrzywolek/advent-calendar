import { useState } from 'react';

export default function Player({ initialPlayerName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialPlayerName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((prevValue) => !prevValue);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={handlePlayerNameChange} />;
  }

  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
