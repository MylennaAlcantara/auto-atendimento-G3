import styled from "styled-components";

export const Animacao = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
        height: 100px;
        width: 100px;
    }
    .image{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 120px;
        background-color: #033B85;
        border-radius: 100%;
        margin-top: 10%;
        animation-name: logo;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-direction: alternate; 
    }
    @keyframes logo {
        25%{
            background-color: #064EB0;
        }
        50%{
            background-color: #0761DC;
        }
        75%{
            background-color: #2E6CB7;
        }
        100%{
            background-color: #6AB4FD;
        }
    }
    #pontos{
        display: flex;
        align-items: center;
        height: 20px;
        label{
            color: #033B85;
            font-weight: bold;
        }
        .ponto1{
            border-radius: 100%;
            height: 5px;
            width: 5px;
            margin: 5px;
            position: relative;
            background-color: #033B85;
            animation-name: ponto1;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-direction: alternate; 
        }
        .ponto2{
            border-radius: 100%;
            height: 5px;
            width: 5px;
            margin: 5px;
            position: relative;
            background-color: #033B85;
            animation-name: ponto2;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-direction: alternate;
        }
        .ponto3{
            border-radius: 100%;
            height: 5px;
            width: 5px;
            margin: 5px;
            position: relative;
            background-color: #033B85;
            animation-name: ponto3;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-direction: alternate;
        }
    }
    @keyframes ponto1{
        0%{
            bottom: 0px;
        }
        50%{
            bottom: 2px
        }
        100%{
            bottom: -2px;
        }
    }
    @keyframes ponto2{
        0%{
            bottom: 0px;
        }
        50%{
            bottom: -2px
        }
        100%{
            bottom: 2px;
        }
    }
    @keyframes ponto3{
        0%{
            bottom: 0px;
        }
        50%{
            bottom: 2px
        }
        100%{
            bottom: -2px;
        }
    }
`