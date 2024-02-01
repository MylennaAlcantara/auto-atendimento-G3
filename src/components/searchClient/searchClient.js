import styled from "styled-components";

export const Container = styled.div`
    min-height: 20%;
    max-height: 50%;
    overflow: auto;
    width: 50%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border-radius: 5px;
    .search-field{
        width: 100%;
        margin-top: 5px;
        display: flex;
        align-items: start;
        justify-content: center;
        button{
            margin-left: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: auto;
            width: auto;
            cursor: pointer;
        }
        img{
            height: 24px;
            width: 24px;
        }
        input{
            height: 24px;
            width: 90%;
        }
    }
`
export const ItemLista = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: start;
    margin-top: 5px;
    border-radius: 5px;
    font-weight: bold;
    label{
        cursor: pointer;
        margin: 0px 5px;
    }
    &&:hover{
        cursor: pointer;
        background-color: #07a4eb;
    }
`
export const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: space-between;
    background-color: #F0F0F0;
    border-radius: 5px;
    position: sticky;
    top: 0px;
    button{
        height: 30px;
        width: 30px;
        border-radius: 0px 5px 0px 0px;
        border: none;
    }

    button:hover{
        cursor: pointer;
        color: white;
        background-color: red;
    }
`