import React, {useState} from "react";
import {createCalendar} from "../../helpers/helpers";
import Door from "./Door";
import './NewCalendar.css';
import Modal from "../Modal";

export function NewCalendar() {
    const [doors, setDoors] = useState(createCalendar());

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleOpenDoor = id => {
        const updatedDoors = doors.map(door =>
            door.id === id ? (door.open ? door : {...door, open: !door.open}) : door
        );
        setDoors(updatedDoors);
    }

    return (
        <div className="calendar">
            {doors.map(door => <Door
                key={door.id}
                doorData={door}
                handleClick={handleOpenDoor}
                openModal={openModal}
            />)}
            {showModal && <Modal closeModal={closeModal} />}
        </div>
    );

}