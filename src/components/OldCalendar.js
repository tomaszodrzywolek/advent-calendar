import React, { useState } from 'react';
import Calendar from './Calendar';
import Modal from './Modal';
import './OldCalendar.css';

export function OldCalendar() {
    
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const snowflakes = Array.from({ length: 9 }, (_, i) => (
        <div className="snowflake" key={i}>❄️</div>
    ));

    return (
        <div className="old-calendar">
            <h1>🎄 Kalendarz Adwentowy Darii 🎄</h1>
            {snowflakes}
            <Calendar openModal={openModal} />
            {showModal && <Modal closeModal={closeModal} />}
        </div>
    );
}