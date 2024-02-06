import {styled,css} from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
height: 100%; 
width : 100%;
border: 1px solid red;
`


export const Footer = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 10px;
padding: 10px;
margin-top: 20px;
`

export const CanvasContainer = styled.canvas`
display: flex;
object-fit: fill;
height: 100vh;
 @media (max-width: 767px) {
    height: 100vh;
    background: aliceblue;
}

`

export const Selector = styled.select`
padding: 10px;
font-size: 16px;
border: none;
border-radius: 4px;
background: #f0f0f0;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
outline: none;
appearance: none; 
`


export const ButtonContainer = styled.div`
    display: flex;
    position: absolute;
    justify-content: right;
    height:auto;
    width: 100%;
    background: transparent;
    padding-right: 20px;
    padding-top: 50px;
    z-index: 10000000;
    color: #fff;

`