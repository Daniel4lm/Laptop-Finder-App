import styled from "styled-components";
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import router, { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import { getBrands, BrandType } from '../lib/getBrands';
import { getModels, ModelType } from '../lib/getModels';
import SelectModel from "../components/SelectModel/SelectModel";

interface SearchType {
  lapBrands: BrandType[];
  lapModels: ModelType[];
  singleColumn?: boolean;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 'auto',
    maxWidth: 550,
    padding: '1.5rem 1rem 1rem 1rem',
    boxShadow: `inset 0 0px 1px 1px ${theme.palette.primary.light}`,
    borderRadius: '0.4rem'
  },
  formTitle: {
    width: '100%',
    paddingBottom: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const StyledSearch = styled.div`

  background: #f0f2f5;
  min-height: 100vh;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  //align-items: center;

  .main {
    padding: 2rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    //align-items: center;
  }

`;

const prices = [150, 250, 400, 500, 800, 1200, 1500];

export default function SearchLaptops({ lapBrands, lapModels, singleColumn }: SearchType) {

  const classes = useStyles();
  const { query } = useRouter();

  const initialValues = {
    brand: query.brand ? query.brand.toString() : 'all',
    model: query.model ? query.model.toString() : 'all',
    maxPrice: query.maxPrice ? query.maxPrice.toString() : 'all',
    minPrice: query.minPrice ? query.minPrice.toString() : 'all',
  }

  const mediumSize = singleColumn ? 12 : 6;

  const returnBrand = (br: string) => {
    const matchBrand = lapBrands.find((lbrand: BrandType) => lbrand.brand === br);
    if (matchBrand) {
      return `${matchBrand.brand} (${matchBrand.count})`
    } else {
      return 'All brands';
    }
  }

  const submitFunc = (values) => {
    router.push({
      pathname: '/laptops',
      query: { ...values }
    }, undefined, { shallow: true })
  }

  return (
    <StyledSearch>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Formik
          initialValues={initialValues}
          onSubmit={submitFunc}
        >
          {({ values }) => (
            <Form>
              <Paper elevation={2} className={classes.formControl}>

                <Grid container className={classes.formTitle} >
                  <Typography align='center'>Please select the model</Typography>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={mediumSize}>
                    <FormControl fullWidth variant="outlined" >
                      <InputLabel id="search-brand">Brand</InputLabel>
                      <Field
                        name='brand'
                        as={Select}
                        labelId="search-brand"
                        label="Brand"
                      >
                        <MenuItem value='all'>
                          <em>All brands</em>
                        </MenuItem>
                        {lapBrands.map((brand: BrandType) => {
                          return (
                            <MenuItem key={brand.brand} value={brand.brand}>
                              {`${brand.brand} (${brand.count})`}
                            </MenuItem>
                          )
                        })}
                      </Field>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={mediumSize}>
                    <SelectModel brand={values.brand} name='model' lapModels={lapModels} />
                  </Grid>

                  <Grid item xs={12} sm={mediumSize}>
                    <FormControl fullWidth variant="outlined" >
                      <InputLabel id="search-min-price">Min price</InputLabel>
                      <Field
                        name='minPrice'
                        as={Select}
                        labelId="search-min-price"
                        label="Min price"
                      >
                        <MenuItem value='all'>
                          <em>All prices</em>
                        </MenuItem>
                        {prices.map(price => {
                          return (
                            <MenuItem key={price} value={price}>
                              {price}
                            </MenuItem>
                          )
                        })}
                      </Field>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={mediumSize}>
                    <FormControl fullWidth variant="outlined" >
                      <InputLabel id="search-max-price">Min price</InputLabel>
                      <Field
                        name='maxPrice'
                        as={Select}
                        labelId="search-max-price"
                        label="Max price"
                      >
                        <MenuItem value='all'>
                          <em>All prices</em>
                        </MenuItem>
                        {prices.map(price => {
                          return (
                            <MenuItem key={price} value={price}>
                              {price}
                            </MenuItem>
                          )
                        })}
                      </Field>
                    </FormControl>

                  </Grid>

                  <Grid item xs={12} >
                    <Button fullWidth type='submit' color='primary' variant='contained'>Search</Button>
                  </Grid>

                </Grid>
              </Paper>
            </Form>
          )}
        </Formik>
      </main>
    </StyledSearch>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const qBrand = (Array.isArray(context.query.brand) ? context.query.brand[0] : context.query.brand);

  //const lapBrands = await getBrands();
  //const lapModels = await getModels(qBrand);

  const [lapBrands, lapModels] = await Promise.all([
    getBrands(),
    getModels(qBrand)
  ]);

  return {
    props: {
      lapBrands,
      lapModels
    }
  }
}
