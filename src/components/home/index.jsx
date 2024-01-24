import { useState } from "react";
import { FormClient } from "../formClient";
import * as H from "./home";

export const Home = () => {
    const [novo, setNovo] = useState(false);

    return (
        <H.Container>
            <div className="buttons">
                <button onClick={()=> setNovo(true)}><img alt="adicionar" src="/images/add.png"/>Novo</button>
            </div>
            {novo ? <FormClient/> : null}
        </H.Container>
    )
}