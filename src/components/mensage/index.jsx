import * as M from "./mensagem"

export const Mensage = ({onCLose, mensage}) => {
    return(
        <M.Modal>
            <M.Container>
                <M.Header>
                    <h3>Alerta do sistema!</h3>
                    <button onClick={onCLose}>X</button>
                </M.Header>

                <p>{mensage}</p>
                <button onClick={onCLose}>OK</button>
            </M.Container>
        </M.Modal>
    )
}