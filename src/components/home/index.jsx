import { useState } from "react";
import { FormClient } from "../formClient";
import * as H from "./home";

export const Home = () => {
    const [novo, setNovo] = useState(false);

    return (
        <H.Container onClick={()=> setNovo(false)}>
            <div className="buttons">
                <button onClick={(e)=> {e.stopPropagation(); setNovo(true)}}><img alt="adicionar" src="/images/add.png"/>Novo</button>
            </div>
            {novo ? <FormClient setNovo={setNovo}/> : null}
        </H.Container>
    )
}