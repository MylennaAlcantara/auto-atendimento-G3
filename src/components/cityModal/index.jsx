import * as CM from "./cityModal";

export const CityModal = ({onClose}) => {
    return(
        <CM.Modal>
            <CM.Container>
                <CM.Header>
                    <h3>Cidades</h3>
                    <button onClick={onClose}>X</button>
                </CM.Header>
            </CM.Container>
        </CM.Modal>
    )
}