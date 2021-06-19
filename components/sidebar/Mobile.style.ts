import styled from "styled-components";

const NavItems = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    position: absolute;
    justify-items: center;
    align-content: start;
    gap: 1rem;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    left: 0;
    top: 65px;
    padding-top: 4rem;
    background-color: #ffffff;
    animation: animate 0.3s linear;
    z-index: 100;

    @keyframes animate {
        0% {
            transform: translateX(-110%);
        }
        100% {
            transform: translateX(0);
        }
    }         
`;

const NavItem = styled.li`

    min-width: max-content;
    width: 225px;
    padding: 10px 2px;
    //background: #ffffff;
    text-align: center;
    border-radius: 0.2rem;
    box-shadow: inset 0 0px 0px 1px rgba(52, 52, 52, .225);

    &:hover {
        cursor: pointer;
        box-shadow: inset 0 0px 0px 1px rgba(97, 98, 201, 0.8);
    }

    a {
        //padding: 10px 15px;
    }

    &:active {
        box-shadow: none;
        color: #ffffff;
        background: rgb(132, 135, 226);
    }
`;

export {NavItems, NavItem};