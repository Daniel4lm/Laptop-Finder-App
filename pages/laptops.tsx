import { GetServerSideProps } from "next";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

import SearchLaptops from ".";

import { getBrands, BrandType } from '../lib/getBrands';
import { getModels, ModelType } from '../lib/getModels';
import LaptopModel from "../model/Laptop";
import { getLaptops } from "../lib/getLaptops";

const StyledList = styled.div`

    background: #f0f2f5;
    min-height: 100vh;
    padding: 1rem;
    //display: flex;    
    //gap: 4px;
`;

interface ListTypes {
    lapBrands: BrandType[];
    lapModels: ModelType[];
    laptops: LaptopModel[];
    totalPages: number;
}

export default function LaptopsList({ lapBrands, lapModels, laptops, totalPages }: ListTypes) {

    return (
        <StyledList>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={5} md={3} >
                    <SearchLaptops singleColumn lapBrands={lapBrands} lapModels={lapModels} />
                </Grid>
                <Grid item xs={12} sm={7} md={9} >
                    <pre style={{ fontSize: '1rem' }}>{JSON.stringify({ totalPages, laptops }, null, 2)}</pre>
                </Grid>
            </Grid>
        </StyledList>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const qBrand = (Array.isArray(context.query.brand) ? context.query.brand[0] : context.query.brand);

    //const lapBrands = await getBrands();
    //const lapModels = await getModels(qBrand);

    const [lapBrands, lapModels, pagination] = await Promise.all([
        getBrands(),
        getModels(qBrand),
        getLaptops(context.query)
    ]);

    return {
        props: {
            lapBrands,
            lapModels,
            laptops: pagination.laptops,
            totalPages: pagination.totalPages
        }
    }
}