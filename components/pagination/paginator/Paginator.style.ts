import styled from "styled-components";

export const PaginatorStyle = styled.div`

    padding-top: 2rem;
    margin: 5px;
    display: flex;
    flex-wrap: wrap;
    --btnColor: #3e68ff;
    --btnHoverColor: #3257da;
    --btnActiveColor: #1e3ba3;

    .navBtn {
        //box-sizing: border-box;
        font-family: Roboto;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.8);
        border: none;
        outline: none;
        text-align: center;
        border-radius: 4px;
        display: grid;
        align-content: center;
        padding: 0.35em 0.75em;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.18);
        font-size: 15px;
        font-weight: 400;
        margin: 0 2px;
        transition: 220ms all ease-in-out;

    }

    .active {
        outline-color: transparent;        
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.13);
        color: inherit;
    }

    .chevron {
        font-size: 18px;
        padding: 0.35em 0.45em;
    }

    .active:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }

    .selected {
        background-color: var(--btnColor);
        color: #fff;
    }

    .selected:hover {
        background-color: var(--btnHoverColor);
    }

    .not-active {
        color: #8d8d8d;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
        pointer-events: none;
    }
`;