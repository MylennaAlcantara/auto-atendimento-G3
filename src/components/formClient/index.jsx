import { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { CityModal } from "../cityModal";
import { Mensage } from "../mensage";
import * as FC from "./formClient";

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
        cod_municipio: "2604106",
        cidade: "Caruaru",
        estado: "PE",
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
    const [layout, setLayout] = useState("default");
    const [inputName, setInputName] = useState("");
    const keyboard = useRef();
    const [keyboardVisibility, setKeyboardVisibility] = useState(false);
    const [cityModal, setCityModal] = useState(false);
    const [message, setMessage] = useState({
        message: "",
        messageOpen: false,
        salvo: false
    })

    async function pesquisarCep() {
        const response = await fetch(`https://viacep.com.br/ws/${dadosCliente.cep}/json/`);
        const data = await response.json();
        setDadosCliente({
            ...dadosCliente,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cod_municipio: data.ibge,
            cidade: data.localidade
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

    const onChange = (input) => {
        if (dadosCliente[inputName] !== keyboard.current.input) {
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
        if (inputName === "cpf") {
            setDadosCliente({ ...dadosCliente, cpf: input, cpf_cnpj: input })
        } else {
            setDadosCliente({ ...dadosCliente, [inputName]: input })
        }
        if (keyboard.current) {
            keyboard.current.setInput(input);
        }
    };

    const isTabletWithoutMouse = () => {
        return (
            /windows/i.test(navigator.userAgent) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 1
        );
    };

    const onFocusHandler = (e) => {
        const inputName = e.target.name;
        setInputName(inputName);
        if (!dadosCliente[inputName]) {
            if (keyboard.current) {
                keyboard.current.clearInput();
            }
        } else {
            if (keyboard.current) {
                keyboard.current.setInput(dadosCliente[inputName]);
            }
        }

        setKeyboardVisibility(true);
    };

    const save = async () => {
        if (verifyInputVoids().length === 0) {
            const documentResult = await verifyDocument();
            if ((Array.isArray(documentResult) && documentResult.length === 0) || documentResult === null) {
                fetch(process.env.REACT_APP_LINK_CADASTRAR_CLIENTE+`/autoAtendimento/cadastroCliente`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dadosCliente)
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.text();
                        } else if (res.status === 400) {
                            return res.json().then(data => Promise.reject(data));
                        } else {
                            throw new Error('Erro na requisição: ' + res.status);
                        }
                    })
                    .then(data => {
                        setMessage({
                            salvo: true,
                            messageOpen: true,
                            message: data
                        });
                    })
                    .catch(error => {
                        setMessage({
                            novo: false,
                            messageOpen: true,
                            message: Array.isArray(error) ? error.map((err)=> err.defaultMessage + "\n") : error.defaultMessage
                        });
                    });
            } else {
                setMessage({
                    novo: false,
                    messageOpen: true,
                    message: "Cliente já cadastrado: " + documentResult
                });
            }
        } else {
            setMessage({
                novo: false,
                messageOpen: true,
                message: "Preencha os campos: " + verifyInputVoids()
            });
        }
    }
    
    const verifyDocument = async () => {
        const response = await fetch(process.env.REACT_APP_LINK_CONSULTAR_CLIENTE+`/${dadosCliente.cpf_cnpj}`);
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    var resultado = data[0] + " - " + data[1];
                    return resultado;
                } else {
                    console.log('Nenhum documento encontrado');
                    // Retornar algo apropriado para indicar que nenhum documento foi encontrado
                    return null;
                }
            } else {
                console.error('Resposta não contém JSON válido');
                // Retornar algo apropriado para indicar um erro, se necessário
                return null;
            }
        } else {
            console.error('Erro na requisição: ' + response.status);
            // Lidar com o erro de resposta não bem-sucedida aqui, se necessário
            return null;
        }
    }

    const verifyInputVoids = () => {
        const inputs = ["nome", "nome_fantasia", "cep", "celular", "cod_municipio", dadosCliente.tipo_pessoa === "J" ? "cpf_cnpj" : "cpf", dadosCliente.contrib_icms ? "inscricao_estadual" : ''];
        var inputsEmpty = [];
        for (var i of inputs) {
            if (dadosCliente[i] === "") {
                inputsEmpty.push(i.toString());
            }
        }
        return inputsEmpty;
    }

    const openCityModal = () => {
        setCityModal(true);
    }

    const onClickContainerHandler = (e) => {
        e.stopPropagation();
        if (e.target.classList.contains("dados") || e.target.classList.contains("labels") || e.target.classList.contains("documentos") || e.target.classList.contains("box-doc")) {
            setKeyboardVisibility(false);
        } else if (e.target.tagName.toLowerCase() === 'input') {
            setKeyboardVisibility(true);
        }
    }

    return (
        <FC.Container onClick={onClickContainerHandler} style={{ position: keyboardVisibility && isTabletWithoutMouse() && "absolute", top: keyboardVisibility && isTabletWithoutMouse() && "0px", left: keyboardVisibility && isTabletWithoutMouse() && "auto", right: keyboardVisibility && isTabletWithoutMouse() && "auto" }}>
            <FC.Header>
                <h3>Cadastro Cliente</h3>
                <button onClick={() => setNovo(false)}>X</button>
            </FC.Header>
            <FC.NavBar>
                <button onClick={() => setAba("gerais")} style={{ backgroundColor: aba === "gerais" ? "white" : "" }}>Dados Gerais</button>
                <button onClick={() => setAba("documentos")} style={{ backgroundColor: aba === "documentos" ? "white" : "" }}>Documentos</button>
            </FC.NavBar>
            {aba === "gerais" ? (
                <FC.DadosGerais className="dados">
                    <form onSubmit={(e) => { e.preventDefault() }}>
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
                                    onFocus={(e) => onFocusHandler(e)}
                                />
                            </div>

                            <div>
                                <input
                                    className="input-large"
                                    name="nome_fantasia"
                                    value={dadosCliente.nome_fantasia}
                                    onChange={handleChange}
                                    onFocus={(e) => onFocusHandler(e)}
                                />
                            </div>
                            <div className="cep-complemento">
                                <input className="codigo" name="cep" value={dadosCliente.cep} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} onKeyDown={(e) => e.key === "13" ? { pesquisarCep } : null} />
                                <button onClick={(e) => { e.preventDefault(); pesquisarCep() }}><img alt="lupa" src="/images/LUPA.png" /></button>
                                <label>Complemento: </label>
                                <input className="input-large" name="complemento" value={dadosCliente.complemento} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} />
                            </div>
                            <div>
                                <input className="input-large" name="logradouro" value={dadosCliente.logradouro} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} />
                                <label> - </label>
                                <input className="codigo" name="numero" value={dadosCliente.numero} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} />
                            </div>
                            <div>
                                <input className="input-large" name="bairro" value={dadosCliente.bairro} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} />
                            </div>
                            <div>
                                <input className="codigo" name="cod_municipio" value={dadosCliente.cod_municipio} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} style={{ outline: 0 }} disabled />
                                <button onClick={openCityModal}><img alt="lupa" src="/images/LUPA.png" /></button>
                                <input className="input-large" name="cidade" value={dadosCliente.cidade} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} style={{ outline: 0 }} disabled />
                                <label>UF: </label>
                                <select className="codigo" onChange={(e) => setDadosCliente({ ...dadosCliente, sigla: e.target.value })}>
                                    <option value={dadosCliente.estado}>{dadosCliente.estado}</option>
                                    {estados.map((estado, index) => {
                                        return (
                                            <option value={estado.sigla} key={index}>{estado.sigla}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <input name="telefone" value={dadosCliente.telefone} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} />
                                <label>Celular: </label>
                                <input name="celular" value={dadosCliente.celular} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} />
                            </div>
                            <input type="date" name="DATA_NASC" value={dadosCliente.DATA_NASC} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} />
                            <div>
                                <input className="input-large" name="email" value={dadosCliente.email} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} />
                            </div>
                        </div>
                    </form>
                </FC.DadosGerais>
            ) : (
                <FC.Documentos>
                    <div className="documentos" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="box-doc">
                            <div>
                                <input type="checkbox" checked={dadosCliente.tipo_pessoa === "J" ? true : false} onChange={() => setDadosCliente({ ...dadosCliente, tipo_pessoa: "J" })} />
                                <label>Pessoa Juridica</label>
                            </div>
                            <div className="form-cpf">
                                <div className="labels">
                                    <label>CNPJ: </label>
                                    <label>IM: </label>
                                </div>
                                <div className="inputs">
                                    <div>
                                        <input name="cpf_cnpj" value={dadosCliente.cpf_cnpj} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} style={{ outline: dadosCliente.tipo_pessoa === "J" ? "" : 0 }} disabled={dadosCliente.tipo_pessoa === "J" ? false : true} />
                                        <button><img alt="lupa" src="/images/LUPA.png" /></button>
                                    </div>
                                    <div>
                                        <input name="inscricao_municipal" value={dadosCliente.inscricao_municipal} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} style={{ outline: dadosCliente.tipo_pessoa === "J" ? "" : 0 }} disabled={dadosCliente.tipo_pessoa === "J" ? false : true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-doc">
                            <div>
                                <input type="checkbox" checked={dadosCliente.tipo_pessoa === 'F' ? true : false} onChange={() => setDadosCliente({ ...dadosCliente, tipo_pessoa: "F" })} />
                                <label>Pessoa Fisica</label>
                            </div>
                            <div className="form-cpf">
                                <div className="labels">
                                    <label>CPF: </label>
                                    <label>RG: </label>
                                    <label>Orgão: </label>
                                </div>
                                <div className="inputs">
                                    <input name="cpf" value={dadosCliente.cpf} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} style={{ outline: dadosCliente.tipo_pessoa === "F" ? "" : 0 }} disabled={dadosCliente.tipo_pessoa === "F" ? false : true} />
                                    <input name="rg" value={dadosCliente.rg} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} style={{ outline: dadosCliente.tipo_pessoa === "F" ? "" : 0 }} disabled={dadosCliente.tipo_pessoa === "F" ? false : true} />
                                    <input name="orgao_rg" value={dadosCliente.orgao_rg} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} style={{ outline: dadosCliente.tipo_pessoa === "F" ? "" : 0 }} disabled={dadosCliente.tipo_pessoa === "F" ? false : true} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-doc">
                        <div>
                            <label>Ins. Estadual: </label>
                            <input name="inscricao_estadual" value={dadosCliente.inscricao_estadual} onChange={handleChange} onFocus={(e) => onFocusHandler(e)} />
                            <button><img alt="lupa" src="/images/LUPA.png" /></button>
                        </div>
                        <div>
                            <label>Contribuinte de ICMS: </label>
                            <input type="checkbox" value={dadosCliente.contrib_icms} checked={dadosCliente.contrib_icms ? true : false} onChange={(e) => setDadosCliente({ ...dadosCliente, contrib_icms: !dadosCliente.contrib_icms })} />
                        </div>
                    </div>
                </FC.Documentos>
            )}
            <button onClick={save}><img alt="salvar" src="/images/salvar.png" style={{ margin: "5px" }} />Salvar</button>
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
            {cityModal && <CityModal onClose={() => setCityModal(false)} dadosCliente={dadosCliente} setDadosCliente={setDadosCliente} />}
            {message.messageOpen && <Mensage onClose={() => {if(message.salvo){ setMessage({messageOpen: false}); setNovo(false)}else{setMessage({messageOpen: false})}}} message={message} />}
        </FC.Container>
    )
}