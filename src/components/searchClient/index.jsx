import { useState } from "react";
import * as SC from "./searchClient";

export const  SearchClient = ({onClose}) => {
    const [busca, setBusca] = useState("");
    const [cliente, setCliente] = useState([])
    
    const buscarCliente = async () => {
        const result = await fetch(`http://localhost:8080/clienteNome/${busca}`);
        const data = await result.json();
        setCliente(data);
    }

    return(
        <SC.Container>
            <SC.Header>
                <h3>Buscar Cliente</h3>
                <button onClick={onClose}>X</button>
            </SC.Header>
            <div className="search-field">
                <input placeholder="Buscar..." value={busca} onChange={(e)=> setBusca(e.target.value)} onKeyDown={(e)=> {if(e.key === "Enter"){ buscarCliente(); }}}/>
                <button onClick={buscarCliente}><img alt="lupa" src="/images/LUPA.png"/></button>
            </div>
            {cliente.map((cliente, index)=> {
                return(
                    <SC.ItemLista key={index} style={{backgroundColor: index%2 === 0 ? "#F0F0F0" : "#ffffe6"}}>
                        <label>Cód.: {cliente.id} - {cliente.nome}</label>
                    </SC.ItemLista>
                )
            })}
        </SC.Container>
    )    
}