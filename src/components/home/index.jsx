import { useState } from "react";
import { FormClient } from "../formClient";
import { SearchClient } from "../searchClient";
import * as H from "./home";

export const Home = () => {
    const [novo, setNovo] = useState(false);
    const [buscar, setBuscar] = useState(false);

    return (
        <H.Container onClick={()=> setNovo(false)}>
            <div className="buttons">
                <button onClick={(e)=> {e.stopPropagation(); setNovo(true)}}><img alt="adicionar" src="/images/add.png"/>Novo</button>
                <button onClick={(e)=> {e.stopPropagation(); setBuscar(true)}}><img alt="lupa" src="/images/LUPA.png"/>Buscar</button>
            </div>
            {novo ? <FormClient setNovo={setNovo}/> : null}
            {buscar ? <SearchClient onClose={()=> setBuscar(false)}/> : null}
        </H.Container>
    )
}