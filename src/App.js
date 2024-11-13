import './App.css';
import React, { useState } from 'react';
import Calendar from './components/Calendar';
import Modal from './components/Modal';

function App() {

  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const snowflakes = Array.from({ length: 9 }, (_, i) => (
    <div className="snowflake" key={i}>❄️</div>
  ));

  return (
    <div className="App">
      <h1>🎄 Kalendarz Adwentowy Darii 🎄</h1>
      {snowflakes}
      <Calendar openModal={openModal} />
      {showModal && <Modal closeModal={closeModal} />}
    </div>
  );
}

export default App;
