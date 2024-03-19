import styled from "styled-components";

export const Modal = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0,0,0,0.4);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Container = styled.div`
    height: 20%;
    width: 30%;
    background-color: white;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: auto;
    button{
        margin: 5px;
    }
    p{
        text-align: left;
        white-space: normal;
        margin: 0px 5px;
        word-wrap: break-word;
    }
`

export const Header = styled.header`
    width: 100%;
    height: auto;
    background-color: #F0F0F0;
    display: flex;
    justify-content: space-between;
    border-radius: 3px 3px 0px 0px;
    button{
        margin: 0px;
        height: 30px;
        width: 40px;
        border: none;
        border-radius: 0px 3px 0px 0px;
    }
    button:hover{
        background-color: red;
        color: white;
    }
`