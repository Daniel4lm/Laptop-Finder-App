import { ReactChild } from "react";
import styled from "styled-components";

interface GridTypes {
    space?: string;
    sm?: string;
    md?: string;
    lg?: string;
    padd?: string;
    direction?: "row" | "column";
    
    children?: ReactChild | ReactChild[];
}

export default function StyledGrid({ children, ...props }: GridTypes) {

    return (
        <Grid {...props}>
            {children}
        </Grid>
    )
}

const Grid = styled.div<GridTypes>`


    @media screen and (max-width: 600px) {
        
    }

    @media screen and (max-width: 960px) {
        
    }

    @media screen and (min-width: 960px) {
        
    }

`;