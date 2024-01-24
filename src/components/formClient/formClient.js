import styled from "styled-components";

export const Container = styled.div`
    height: 80%;
    width: 60%;
    margin: auto;
    //position: absolute;
    //top: 0;
    //left: 0;
    z-index: 1;
    box-shadow: 3px 5px 5px gray;
    background-color: white;
`
export const NavBar = styled.div`
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: start;
    button{
        padding: 5px;
        background-color: #F0F0F0;
        cursor: pointer;
        border: 1px solid black;
        border-radius: 5px 5px 0 0;
    }
`

export const DadosGerais = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    margin-top: 20px;
    form{
        margin: 0px auto;
        width: 95%;
        height: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .labels{
        margin-left: 5px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: end;
        justify-content: space-around;
    }

    .inputs{
        width: 100%;
        margin-left: 5px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-around;
        div{
            width: 100%;
            display: flex;
        }
        input{
            height: 24px;
        }
        button{
            height: 24px;
            margin: 0px 5px;
            cursor: pointer;
            margin-top:auto;
            margin-bottom:auto;
        }
        label{
            margin: 0px 5px;
        }
        .input-large{
            width: 100%;
        }
        .codigo{
            width: 60px;
        }
    }
`

export const Documentos = styled.div`
    height: 80%;
    width: 100%;
`