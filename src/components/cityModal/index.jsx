import { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import * as FC from "../formClient/formClient";
import { Loading } from "../loading";
import * as CM from "./cityModal";

export const CityModal = ({ onClose, dadosCliente, setDadosCliente }) => {
    const [municipios, setMunicipios] = useState([]);
    const [busca, setBusca] = useState("");
    const [layout, setLayout] = useState("default");
    const keyboard = useRef();
    const [keyboardVisibility, setKeyboardVisibility] = useState(false);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios");
            const data = await response.json();
            setMunicipios(data);
            if (response.status === 200) {
                setCarregado(true);
            }
        }
        fetchData();
    }, []);

    const resultado = Array.isArray(municipios) && municipios.filter((city) => {
        return city.nome.toLowerCase().includes(busca);
    })

    const selecionar = (municipio) => {
        setDadosCliente({
            ...dadosCliente, 
            cod_municipio: municipio.id,
            CIDADE: municipio.nome,
            estado: municipio.microrregiao.mesorregiao.UF.sigla
        });
        onClose();
    }

    const onChange = (input) => {
        setBusca(input);
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKeyPress = (button) => {
        if (button === "{shift}" || button === "{lock}") handleShift();
    };

    const isTabletWithoutMouse = () => {
        return (
            /windows/i.test(navigator.userAgent) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 1
        );
    };

    const handleChange = (e) => {
        const input = e.target.value;
        setBusca(input);
        if(keyboard.current){
            keyboard.current.setInput(input);
        }
    };

    const onFocusHandler = (e) => {
        if (keyboard.current) {
            keyboard.current.setInput(busca);
        }
        
        setKeyboardVisibility(true);
    };

    return (
        <CM.Modal onClick={(e)=> e.stopPropagation()}>
            <CM.Container>
                <CM.Header>
                    <h3>Cidades</h3>
                    <button onClick={onClose}>X</button>
                </CM.Header>
                <div className="div-busca">
                    <input value={busca} onChange={handleChange} onFocus={onFocusHandler} placeholder="Buscar..." />
                    <button><img alt="lupa" src="/images/LUPA.png" /></button>
                </div>
                <div className="div-table">
                    {carregado ? (
                        <CM.Table>
                            <thead>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>UF</th>
                            </thead>
                            <tbody>
                                {resultado.map((municipio) => {
                                    return (
                                        <tr key={municipio.id} onDoubleClick={selecionar.bind(this, municipio)}>
                                            <td>{municipio.id}</td>
                                            <td>{municipio.nome}</td>
                                            <td>{municipio.microrregiao.mesorregiao.UF.sigla}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </CM.Table>
                    ) : (
                        <Loading />
                    )}
                </div>
            </CM.Container>
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
        </CM.Modal>
    )
}