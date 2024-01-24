import { useState } from "react";
import * as FC from "./formClient";

export const FormClient = () => {
    const [aba, setAba] = useState("gerais");


    return (
        <FC.Container>
            <FC.NavBar>
                <button onClick={()=> setAba("gerais")}>Dados Gerais</button>
                <button onClick={()=> setAba("documentos")}>Documentos</button>
            </FC.NavBar>
            {aba === "gerais" ? (
                <FC.DadosGerais>
                    <form>
                        <div className="labels">
                            <label>Nome: </label>
                            <label>Fantasia: </label>
                            <label>Cep: </label>
                            <label>Logadouro: </label>
                            <label>Bairro: </label>
                            <label>Municipio: </label>
                            <label>Telefone: </label>
                            <label>Data Nasc.: </label>
                            <label>Email: </label>
                        </div>
                        <div className="inputs">
                            <div>
                                <input className="input-large"/>
                            </div>
                            <div>
                                <input className="input-large"/>
                            </div>
                            <div className="cep-complemento">
                                <input className="codigo"/>
                                <button><img alt="lupa" src="/images/lupa.png"/></button>
                                <label>Complemento: </label>
                                <input className="input-large"/>
                            </div>
                            <div>
                                <input className="input-large"/>
                                <label> - </label>
                                <input className="codigo"/>
                            </div>
                            <div>
                                <input className="input-large"/>
                            </div>
                            <div>
                                <input className="codigo"/>
                                <button><img alt="lupa" src="/images/lupa.png"/></button>
                                <input className="input-large"/>
                                <label>UF: </label>
                                <select className="codigo"></select>
                            </div>
                            <div>
                                <input />
                                <label>Celular: </label>
                                <input />
                            </div>
                            <input type="date" />
                            <div>
                                <input className="input-large"/>
                            </div>
                        </div>
                    </form>
                </FC.DadosGerais>
            ) : (
                <FC.Documentos>
                    <div className="box-doc">
                        <div>
                            <label>Ins. Estadual: </label>
                            <input />
                            <button>lupa</button>
                        </div>
                        <div>
                            <label>Contribuinte de ICMS: </label>
                            <input type="checkbox" />
                        </div>
                    </div>
                    <div className="box-doc">
                        <div>
                            <input type="checkbox" />
                            <label>Pessoa Juridica</label>
                        </div>
                        <div className="labels">
                            <label>CNPJ: </label>
                            <label>IM: </label>
                        </div>
                        <div className="inputs">
                            <div>
                                <input />
                                <button>lupa</button>
                            </div>
                            <div>
                                <input />
                            </div>
                        </div>
                    </div>
                    <div className="box-doc">
                        <div>
                            <input type="checkbox" />
                            <label>Pessoa Fisica</label>
                        </div>
                        <div className="labels">
                            <label>CPF: </label>
                            <label>RG: </label>
                            <label>Orgão: </label>
                        </div>
                        <div className="input">
                            <input />
                            <input />
                            <input />
                        </div>
                    </div>
                </FC.Documentos>
            )}
        </FC.Container>
    )
}