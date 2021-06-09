import styled, { css } from "styled-components";

export interface AccordionType {
    borderColor?: string;
    expanded: boolean;
}

export const AccordionStyle = styled.article<AccordionType>`
    width: 100%;
    margin-bottom: 0.4rem;    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1px;
    box-shadow: inset 0 0px 1px 1px ${(props) => (props.borderColor ? props.borderColor : "#6162c9")};
    
    .title {
        width: 100%;
        border: none;
        outline: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: inherit;
        background: transparent;
        font-size: inherit;
        padding: 0.6rem;
        cursor: pointer;

        &:hover {
            background: rgb(226, 236, 255);
        } 

        .toggle {
            background: transparent;
            border: none;
            outline: none;
            padding: 0;
            color: inherit;
            font-size: 20px;
            display: grid;
            align-content: center;
        }
    }

    .content {
        width: 100%;     
        overflow: auto;      
        transition: max-height 0.4s cubic-bezier(.5,0,.1,1);

        .text {
            padding-left: 10px;
            padding-right: 10px;
        }
    }

    &:hover {
        box-shadow: inset 0 0px 1px 1px #6162c9;
    }        

    .expanded {
        background: #eff0eb;
        border-bottom: 1px solid #d0d1cd;
        //color: #fff;
    }

    ${({ expanded }) => expanded ? `
            //border-color: rgb(132, 135, 226);
            box-shadow: inset 0 0px 1px 1px #6162c9;
        ` :
        null
    }

`;
