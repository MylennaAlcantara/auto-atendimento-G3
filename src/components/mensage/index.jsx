import * as M from "./mensagem"

export const Mensage = ({onClose, message}) => {
    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <h3>Alerta do sistema!</h3>
                    <button onClick={onClose}>X</button>
                </M.Header>

                <p>{message.message}</p>
                <button onClick={onClose}>OK</button>
            </M.Container>
        </M.Modal>
    )
}