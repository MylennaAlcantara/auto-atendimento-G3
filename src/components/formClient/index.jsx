import { useEffect, useState } from "react";
import * as FC from "./formClient";

export const FormClient = () => {
    const [aba, setAba] = useState("gerais");
    const [dadosCliente, setDadosCliente] = useState({
        id: 0,
        nome: "",
        nome_fantasia: "",
        cep: "",
        complemento: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cod_municipio: "",
        CIDADE: "",
        estado: "",
        telefone: "",
        celular: "",
        DATA_NASC: null,
        email: "",
        inscricao_estadual: "",
        contrib_icms: false,
        tipo_pessoa: "J",
        orgao_rg: "",
        cpf: "",
        inscricao_municipal: "",
        cpf_cnpj: "",
        rg: "",
    });
    const [estados, setEstados] = useState([]);

    async function pesquisarCep() {
        const response = await fetch(`https://viacep.com.br/ws/${dadosCliente.cep}/json/`);
        const data = await response.json();
        setDadosCliente({
            ...dadosCliente,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cod_municipio: data.ibge,
            CIDADE: data.localidade
        });
    }

    async function fetchEstados() {
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        const data = await response.json();
        setEstados(data);
    }

    useEffect(()=>{
        fetchEstados();
    },[])

    return (
        <FC.Container>
            <FC.NavBar>
                <button onClick={()=> setAba("gerais")} style={{backgroundColor: aba === "gerais" ? "white" : ""}}>Dados Gerais</button>
                <button onClick={()=> setAba("documentos")} style={{backgroundColor: aba === "documentos" ? "white" : ""}}>Documentos</button>
            </FC.NavBar>
            {aba === "gerais" ? (
                <FC.DadosGerais>
                    <form>
                        <div className="labels">
                            <label>Nome: </label>
                            <label>Fantasia: </label>
                            <label>Cep: </label>
                            <label>Logradouro: </label>
                            <label>Bairro: </label>
                            <label>Municipio: </label>
                            <label>Telefone: </label>
                            <label>Data Nasc.: </label>
                            <label>Email: </label>
                        </div>
                        <div className="inputs">
                            <div>
                                <input className="input-large" value={dadosCliente.nome} onChange={(e)=> setDadosCliente({...dadosCliente, nome: e.target.value})}/>
                            </div>
                            <div>
                                <input className="input-large" value={dadosCliente.nome_fantasia} onChange={(e)=> setDadosCliente({...dadosCliente, nome_fantasia: e.target.value})}/>
                            </div>
                            <div className="cep-complemento">
                                <input className="codigo" value={dadosCliente.cep} onChange={(e)=> setDadosCliente({...dadosCliente, cep: e.target.value})} onKeyDown={(e)=> e.key==="13" ? {pesquisarCep} : null}/>
                                <button onClick={(e)=>{e.preventDefault(); pesquisarCep()}}><img alt="lupa" src="/images/lupa.png"/></button>
                                <label>Complemento: </label>
                                <input className="input-large" value={dadosCliente.complemento} onChange={(e)=> setDadosCliente({...dadosCliente, complemento: e.target.value})}/>
                            </div>
                            <div>
                                <input className="input-large" value={dadosCliente.logradouro} onChange={(e)=> setDadosCliente({...dadosCliente, logradouro: e.target.value})}/>
                                <label> - </label>
                                <input className="codigo" value={dadosCliente.numero} onChange={(e)=> setDadosCliente({...dadosCliente, numero: e.target.value})}/>
                            </div>
                            <div>
                                <input className="input-large" value={dadosCliente.bairro} onChange={(e)=> setDadosCliente({...dadosCliente, bairro: e.target.value})}/>
                            </div>
                            <div>
                                <input className="codigo" value={dadosCliente.cod_municipio} onChange={(e)=> setDadosCliente({...dadosCliente, cod_municipio: e.target.value})}/>
                                <button><img alt="lupa" src="/images/lupa.png"/></button>
                                <input className="input-large" value={dadosCliente.CIDADE} onChange={(e)=> setDadosCliente({...dadosCliente, CIDADE: e.target.value})}/>
                                <label>UF: </label>
                                <select className="codigo">
                                    <option value={dadosCliente.estado}>{dadosCliente.estado}</option>
                                    {estados.map((estado, index)=>{
                                        return(
                                            <option value={estado.sigla} key={index}>{estado.sigla}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <input value={dadosCliente.telefone} onChange={(e)=> setDadosCliente({...dadosCliente, telefone: e.target.value})}/>
                                <label>Celular: </label>
                                <input value={dadosCliente.celular} onChange={(e)=> setDadosCliente({...dadosCliente, celular: e.target.value})}/>
                            </div>
                            <input type="date"  value={dadosCliente.DATA_NASC} onChange={(e)=> setDadosCliente({...dadosCliente, DATA_NASC: e.target.value})}/>
                            <div>
                                <input className="input-large" value={dadosCliente.email} onChange={(e)=> setDadosCliente({...dadosCliente, email: e.target.value})}/>
                            </div>
                        </div>
                    </form>
                </FC.DadosGerais>
            ) : (
                <FC.Documentos>
                    <div className="box-doc">
                        <div>
                            <label>Ins. Estadual: </label>
                            <input value={dadosCliente.inscricao_estadual} onChange={(e)=> setDadosCliente({...dadosCliente, inscricao_estadual: e.target.value})}/>
                            <button><img alt="lupa" src="/images/lupa.png"/></button>
                        </div>
                        <div>
                            <label>Contribuinte de ICMS: </label>
                            <input type="checkbox" checked={dadosCliente.contrib_icms ? true : false}/>
                        </div>
                    </div>
                    <div className="box-doc">
                        <div>
                            <input type="checkbox" checked={dadosCliente.tipo_pessoa === "J" ? true : false}/>
                            <label>Pessoa Juridica</label>
                        </div>
                        <div className="form-cpf">
                            <div className="labels">
                                <label>CNPJ: </label>
                                <label>IM: </label>
                            </div>
                            <div className="inputs">
                                <div>
                                    <input value={dadosCliente.cpf_cnpj.length > 11 ? dadosCliente.cpf_cnpj : ""} onChange={(e)=> setDadosCliente({...dadosCliente, cpf_cnpj: e.target.value})}/>
                                    <button><img alt="lupa" src="/images/lupa.png"/></button>
                                </div>
                                <div>
                                    <input value={dadosCliente.inscricao_municipal} onChange={(e)=> setDadosCliente({...dadosCliente, inscricao_municipal: e.target.value})}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-doc">
                        <div>
                            <input type="checkbox" checked={dadosCliente.tipo_pessoa === 'F' ? true : false}/>
                            <label>Pessoa Fisica</label>
                        </div>
                        <div className="form-cpf">
                            <div className="labels">
                                <label>CPF: </label>
                                <label>RG: </label>
                                <label>Orgão: </label>
                            </div>
                            <div className="inputs">
                                <input value={dadosCliente.cpf} onChange={(e)=> setDadosCliente({...dadosCliente, cpf: e.target.value})}/>
                                <input value={dadosCliente.rg} onChange={(e)=> setDadosCliente({...dadosCliente, rg: e.target.value})}/>
                                <input value={dadosCliente.orgao_rg} onChange={(e)=> setDadosCliente({...dadosCliente, orgao_rg: e.target.value})}/>
                            </div>
                        </div>
                    </div>
                </FC.Documentos>
            )}
            <button><img alt="salvar" src="/images/salvar.png"/>Salvar</button>
        </FC.Container>
    )
}