import styled from "styled-components";

export const StyledNav = styled.nav`
    width: 100%;
    background: #ffffff;
    color: rgb(52, 52, 52);
    padding: 0.6rem;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-left {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .title {        
            font-size: 18px;
            font-weight: 700;
        }

        .nav-icon {
            margin: 0 0.4rem;
            background: rgb(132, 135, 226);
            color: #fff;
            padding: 0.2rem;
            border-radius: 0.2rem;
            display: grid;
            align-content: center;
        }
    }   

    .nav-items {
        list-style: none;
        margin: 0;
        padding: 0;

        .nav-item { 
            display: inline-block;
            padding: 0 2px;
            user-select: none;
        }

        a {
            display: block;
            border: 1px solid transparent;
            padding: 6px 10px;
            text-decoration: none;
            text-transform: uppercase;
            transition: all 0.1s ease-in-out;
        }

        a:hover {
            cursor: pointer;
            //color: $blue;
            border: 1px solid rgb(132, 135, 226);     
        }

        a:active {
            color: #ffffff;
            background: rgb(132, 135, 226);
        }
    }

    @media screen and (max-width: 600px) {

        flex-direction: column;
        padding: 15px 0;
        //gap: 5px;

        .nav-items {
            position: absolute;
            display: grid;
            align-content: start;
            justify-items: center;
            gap: 1rem;
            width: 100%;
            height: 100%;
            left: 0;
            top: 65px;
            padding-top: 4rem;
            background-color: inherit;
            animation: animate 0.3s linear;
            z-index: 100;

            .nav-item {
                min-width: max-content;
                width: 125px;
                text-align: center;
            }

            a {
                //border: 1px solid rgb(132, 135, 226);
                border-radius: 0.2rem;
                padding: 10px 15px;
                box-shadow: inset 0 0px 0px 1px rgba(52, 52, 52, .225);
            }

            a:hover {
                border-color: transparent;
                box-shadow: inset 0 0px 0px 1px rgba(97, 98, 201, 0.8);
            }

            a:active {
                box-shadow: none;
            }

            @keyframes animate {
                0% {
                    transform: translateX(-110%);
                }
                100% {
                    transform: translateX(0);
                }
            }
        }    
    }
`;