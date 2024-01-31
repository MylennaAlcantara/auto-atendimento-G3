import styled from "styled-components";

export const Container = styled.div`
    height: 60%;
    width: 70%;
    margin: auto;
    z-index: 1;
    box-shadow: 3px 5px 5px gray;
    background-color: white;
    border-radius: 5px;
    
    button{
        margin: auto;
        cursor: pointer;
        height: 24px;
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input:focus{
        box-shadow: 0 0 0 0;
        //border: none;
        //border-bottom: 1px solid #083b7e;
        border-radius: 2px;
        border: none;
        outline: 1px solid #083b7e;
    }

    @media(max-width: 1024px){
        height: 70%;
        width: 90%;
    }

    @media(max-width: 460px){
        margin-top: 5%;
        width: 95%;
        height: 80%;
    }
`
export const Header = styled.div`
    width: 100%;
    height: auto;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #F0F0F0;
    border-radius: 5px 5px 0px 0px;
    button{
        margin: 0px;
        height: 30px;
        width: 30px;
        border: none;
        border-radius: 0px 5px 0px 0px;
    }
    button:hover{
        background-color: red;
        color: white;
        border: none;
        outline: 0;
    }
`
export const NavBar = styled.div`
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: start;
    border-bottom: 1px solid black;
    button{
        margin: 0px;
        padding: 5px;
        background-color: #F0F0F0;
        cursor: pointer;
        border: 1px solid black;
        border-radius: 5px 5px 0 0;
        border-bottom: none;
    }
`

export const DadosGerais = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    form{
        margin: 0px auto;
        width: 95%;
        height: 80%;
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
            //border: none;
            //border-bottom: 1px solid black;
        }
        button{
            width: auto;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .box-doc{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 40%;
        width: auto;
        div{
            display: flex;
            align-items: center;
            justify-content: start;
        }
        input{
            height: 24px;
            width: auto;
            margin: 5px 5px 0px;
        }
        button{
            width: auto;
            height: 24px;
            margin: 0px 5px;
            cursor: pointer;
            margin-top:auto;
            margin-bottom:auto;
        }
        .form-cpf{
            width: 100%;
            display: flex;
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
            label{
                margin: 0px 5px;
            }
        }
    }
`

export const Keyboard = styled.div`
    width: 100vw;
    position: fixed;
    bottom: 0px;
    left: 0px;
`