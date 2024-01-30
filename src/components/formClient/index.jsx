import { useEffect, useRef, useState } from "react";
import * as FC from "./formClient";

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export const FormClient = ({ setNovo }) => {
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

    useEffect(() => {
        fetchEstados();
    }, [])

    const [layout, setLayout] = useState("default");
    const [inputName, setInputName] = useState("");
    const keyboard = useRef();
    const [keyboardVisibility, setKeyboardVisibility] = useState(false);

    const onChange = (input) => {
        console.log(input);
        if (dadosCliente[inputName] !== input) {
            setDadosCliente({ ...dadosCliente, [inputName]: input });
        }
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKeyPress = (button) => {
        if (button === "{shift}" || button === "{lock}") handleShift();
    };

    const handleChange = (e) => {
        const input = e.target.value;
        setDadosCliente({ ...dadosCliente, [inputName]: input })
        keyboard.current.setInput(input);
    };

    const isTabletWithoutMouse = () => {
        return (
            /windows/i.test(navigator.userAgent) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 1
        );
    };

    const onFocusHandler = () => {
        if (keyboard.current) {
            keyboard.current.clearInput();
            keyboard.current.setInput(dadosCliente[inputName]);
        }
        setKeyboardVisibility(true);
    };

    return (
        <FC.Container onClick={(e) => { e.stopPropagation(); /*setKeyboardVisibility(false)*/ }} style={{ position: keyboardVisibility && isTabletWithoutMouse() && "absolute", top: keyboardVisibility && isTabletWithoutMouse() && "0px", left: keyboardVisibility && isTabletWithoutMouse() && "auto", right: keyboardVisibility && isTabletWithoutMouse() && "auto" }}>
            <FC.Header>
                <h3>Cadastro Cliente</h3>
                <button onClick={() => setNovo(false)}>X</button>
            </FC.Header>
            <FC.NavBar>
                <button onClick={() => setAba("gerais")} style={{ backgroundColor: aba === "gerais" ? "white" : "" }}>Dados Gerais</button>
                <button onClick={() => setAba("documentos")} style={{ backgroundColor: aba === "documentos" ? "white" : "" }}>Documentos</button>
            </FC.NavBar>
            {aba === "gerais" ? (
                <FC.DadosGerais >
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
                                <input
                                    className="input-large"
                                    name="nome"
                                    value={dadosCliente.nome}
                                    onChange={handleChange}
                                    onFocus={onFocusHandler}
                                />
                            </div>

                            <div>
                                <input
                                    className="input-large"
                                    name="nome_fantasia"
                                    value={dadosCliente.nome_fantasia}
                                    onChange={handleChange}
                                    onFocus={onFocusHandler}
                                />
                            </div>
                            <div className="cep-complemento">
                                <input className="codigo" name="cep" value={dadosCliente.cep} onChange={handleChange} onFocus={onFocusHandler} onKeyDown={(e) => e.key === "13" ? { pesquisarCep } : null} />
                                <button onClick={(e) => { e.preventDefault(); pesquisarCep() }}><img alt="lupa" src="/images/lupa.png" /></button>
                                <label>Complemento: </label>
                                <input className="input-large" name="complemento" value={dadosCliente.complemento} onChange={handleChange} onFocus={onFocusHandler} />
                            </div>
                            <div>
                                <input className="input-large" name="logradouro" value={dadosCliente.logradouro} onChange={handleChange} onFocus={onFocusHandler} />
                                <label> - </label>
                                <input className="codigo" name="numero" value={dadosCliente.numero} onChange={handleChange} onFocus={onFocusHandler} />
                            </div>
                            <div>
                                <input className="input-large" name="bairro" value={dadosCliente.bairro} onChange={handleChange} onFocus={onFocusHandler} />
                            </div>
                            <div>
                                <input className="codigo" name="cod_municipio" value={dadosCliente.cod_municipio} onChange={handleChange} onFocus={onFocusHandler} />
                                <button><img alt="lupa" src="/images/lupa.png" /></button>
                                <input className="input-large" name="CIDADE" value={dadosCliente.CIDADE} onChange={handleChange} onFocus={onFocusHandler} />
                                <label>UF: </label>
                                <select className="codigo">
                                    <option value={dadosCliente.estado}>{dadosCliente.estado}</option>
                                    {estados.map((estado, index) => {
                                        return (
                                            <option value={estado.sigla} key={index}>{estado.sigla}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <input name="telefone" value={dadosCliente.telefone} onChange={handleChange} onFocus={onFocusHandler} />
                                <label>Celular: </label>
                                <input name="celular" value={dadosCliente.celular} onChange={handleChange} onFocus={onFocusHandler} />
                            </div>
                            <input type="date" name="DATA_NASC" value={dadosCliente.DATA_NASC} onChange={handleChange} onFocus={onFocusHandler} />
                            <div>
                                <input className="input-large" name="email" value={dadosCliente.email} onChange={handleChange} onFocus={onFocusHandler} />
                            </div>
                        </div>
                    </form>
                </FC.DadosGerais>
            ) : (
                <FC.Documentos>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="box-doc">
                            <div>
                                <input type="checkbox" checked={dadosCliente.tipo_pessoa === "J" ? true : false} />
                                <label>Pessoa Juridica</label>
                            </div>
                            <div className="form-cpf">
                                <div className="labels">
                                    <label>CNPJ: </label>
                                    <label>IM: </label>
                                </div>
                                <div className="inputs">
                                    <div>
                                        <input name="cpf_cnpj" value={dadosCliente.cpf_cnpj} onChange={handleChange} onFocus={onFocusHandler} />
                                        <button><img alt="lupa" src="/images/lupa.png" /></button>
                                    </div>
                                    <div>
                                        <input name="inscricao_municipal" value={dadosCliente.inscricao_municipal} onChange={handleChange} onFocus={onFocusHandler} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-doc">
                            <div>
                                <input type="checkbox" checked={dadosCliente.tipo_pessoa === 'F' ? true : false} />
                                <label>Pessoa Fisica</label>
                            </div>
                            <div className="form-cpf">
                                <div className="labels">
                                    <label>CPF: </label>
                                    <label>RG: </label>
                                    <label>Orgão: </label>
                                </div>
                                <div className="inputs">
                                    <input name="cpf" value={dadosCliente.cpf} onChange={handleChange} onFocus={onFocusHandler} />
                                    <input name="rg" value={dadosCliente.rg} onChange={handleChange} onFocus={onFocusHandler} />
                                    <input name="orgao_rg" value={dadosCliente.orgao_rg} onChange={handleChange} onFocus={onFocusHandler} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-doc">
                        <div>
                            <label>Ins. Estadual: </label>
                            <input name="inscricao_estadual" value={dadosCliente.inscricao_estadual} onChange={handleChange} onFocus={onFocusHandler} />
                            <button><img alt="lupa" src="/images/lupa.png" /></button>
                        </div>
                        <div>
                            <label>Contribuinte de ICMS: </label>
                            <input type="checkbox" checked={dadosCliente.contrib_icms ? true : false} />
                        </div>
                    </div>
                </FC.Documentos>
            )}
            <button><img alt="salvar" src="/images/salvar.png" />Salvar</button>
            {keyboardVisibility && isTabletWithoutMouse() ? (
                <FC.Keyboard>
                    <Keyboard
                        keyboardRef={(r) => (keyboard.current = r)}
                        layoutName={layout}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                        disableCaretPositioning={false}
                    />
                </FC.Keyboard>
            ) : null}
        </FC.Container>
    )
}