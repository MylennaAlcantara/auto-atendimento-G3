import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('/images/logo.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-attachment: local;

    img{
        height: 20px;
        width: 20px;
    }

    .buttons{
        height: 5%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        bottom: 20%;
        button{
            width: 100px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    }
    @media(max-width: 460px){
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: start;
    }
`