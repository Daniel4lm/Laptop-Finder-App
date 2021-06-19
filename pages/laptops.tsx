import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import fs from 'fs';
import { join } from 'path';
import SearchLaptops from ".";

import { getBrands, BrandType } from '../lib/getBrands';
import { getModels, ModelType } from '../lib/getModels';
import LaptopModel from "../model/Laptop";
import { getLaptops } from "../lib/getLaptops";
import { asString } from "../helpers/asString";
import { stringify } from "querystring";
import LaptopPagination from "../components/pagination/LaptopPagination";
import StyledPagination from "../components/pagination/paginator/Paginator";
import LaptopCard from "../components/cards/LaptopCard";


const StyledList = styled.div`

    background: #f0f2f5;
    min-height: 100vh;
    padding: 1rem;
    //display: flex;    
`;

interface ListTypes {
    lapBrands: BrandType[];
    lapModels: ModelType[];
    laptops: LaptopModel[];
    totalPages: number;
    totalCount: number;
}

export default function LaptopsList({ lapBrands, lapModels, laptops, totalPages, totalCount }: ListTypes) {

    const { query } = useRouter();

    const { data } = useSWR(`/api/laptops?${stringify(query)}`, {
        dedupingInterval: 15000
    });
    //console.log(`/api/laptops?${stringify(query)}`);
    //console.log('data from api/laptops ', data);

    return (
        <StyledList>
            <Head>
                <title>Search laptops</title>
            </Head>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5} md={3} >
                    <SearchLaptops singleColumn lapBrands={lapBrands} lapModels={lapModels} />
                </Grid>
                <Grid container item xs={12} sm={7} md={9} >
                    <Grid item xs={12} >
                        <StyledPagination
                            pageCount={totalPages}
                            cursor={parseInt(asString(query.page))}
                            query={query}
                            //pageBuffer={Math.round(totalPages/2) <= 1 ? totalPages : Math.round(totalPages/2)}
                            onPageChange={cursor => console.log("Change:", cursor)}
                        />
                        <ShowCounter totalCount={totalCount} />
                    </Grid>

                    {laptops.map(laptop => (
                        <Grid key={laptop.id} item xs={12} sm={6} >
                            <LaptopCard laptop={laptop} />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <LaptopPagination totalPages={data?.totalPages} />
                    </Grid>
                </Grid>
            </Grid>
        </StyledList>
    )
} 

export function ShowCounter({ totalCount }) {

    if (totalCount > 0) {
        return (
            <div style={{ paddingLeft: '5px' }}>
                {totalCount > 1 ?
                    <h3>{totalCount} laptops for sale</h3>
                    :
                    <h3>{totalCount} laptop for sale</h3>
                }
            </div>
        );
    } else {
        return (
            <div style={{ paddingLeft: '5px' }}>
                <h4>None laptop found</h4>
            </div>
        )
    }
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

    const serviceDirectory = join(process.cwd(), 'public');

    pagination.laptops.map((laptop) => {
        const imgNames: string[] = fs.readdirSync(`${serviceDirectory}${laptop.imgUrl}`, "utf-8");
        const images = imgNames.map(img => `${laptop.imgUrl}${img}`);
        laptop.imgUrl = images;
    })

    return {
        props: {
            lapBrands,
            lapModels,
            laptops: pagination.laptops,
            totalPages: pagination.totalPages,
            totalCount: pagination.totalCount
        }
    }
}