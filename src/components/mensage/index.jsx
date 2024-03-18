import * as M from "./mensagem"

export const Mensage = ({onClose, mensage}) => {
    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <h3>Alerta do sistema!</h3>
                    <button onClick={onClose}>X</button>
                </M.Header>

                <p>{mensage}</p>
                <button onClick={onClose}>OK</button>
            </M.Container>
        </M.Modal>
    )
}