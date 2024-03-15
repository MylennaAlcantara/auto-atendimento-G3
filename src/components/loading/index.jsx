import React from "react";
import { Animacao } from "./loading";

export const Loading = () => {
    return(
        <Animacao>
                <div className="image">
                    <img alt="" src="/favicon.ico"/>
                </div>
                <div id="pontos">
                    <label>Carregando</label>
                    <div className="ponto1"/>
                    <div className="ponto2"/>
                    <div className="ponto3"/>
                </div>
        </Animacao>
    )
}