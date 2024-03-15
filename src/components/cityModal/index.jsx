import { useEffect, useState } from "react";
import { Loading } from "../loading";
import * as CM from "./cityModal";

export const CityModal = ({ onClose }) => {
    const [municipios, setMunicipios] = useState([]);
    const [busca, setBusca] = useState("");

    // Estado para verificar se obteve 200 da api caso não, mostre a mensagem de sem dados
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

    return (
        <CM.Modal>
            <CM.Container>
                <CM.Header>
                    <h3>Cidades</h3>
                    <button onClick={onClose}>X</button>
                </CM.Header>
                <div className="div-busca">
                    <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar..." />
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
                                        <tr key={municipio.id} >
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
        </CM.Modal>
    )
}