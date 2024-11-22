import './Door.css'
import { StyledDoor } from './DoorStyles';

const Door = ({ doorData: { id, nr, text, img, open, code }, handleClick, openModal }) => {

    function launchGame() {
        openModal(id, code)
    }


    return (
        <StyledDoor background={img} onClick={() => handleClick(id)}>
            <div className={open ? "front open" : "front"}>
                <p>{nr}</p>
            </div>
            <div className={open ? "back open" : "back"}>
                <p onClick={launchGame}>Kliknij aby zagrać. Wygraj aby dostać kod</p>
            </div>
        </StyledDoor>
    )
};

export default Door;