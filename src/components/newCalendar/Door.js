import './Door.css'
import { StyledDoor } from './DoorStyles';

const Door = ({ doorData: { id, nr, text, img, open }, handleClick, openModal }) => {

    function launchGame() {
        openModal()
    }


    return (
        <StyledDoor background={img} onClick={() => handleClick(id)}>
            <div className={open ? "front open" : "front"}>
                <p>{nr}</p>
            </div>
            <div className={open ? "back open" : "back"}>
                <p onClick={launchGame}>Wyświetl Kod</p>
            </div>
        </StyledDoor>
    )
};

export default Door;