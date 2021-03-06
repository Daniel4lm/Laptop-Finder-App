import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import fs from 'fs';
import { join } from 'path';

import { openDB } from "../../../../lib/openDB";
import LaptopModel from "../../../../model/Laptop";

/* material-ui */
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Link } from '@material-ui/core';
import MemoryIcon from '@material-ui/icons/Memory';
import LaptopMacRoundedIcon from '@material-ui/icons/LaptopMacRounded';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import AddToQueueRoundedIcon from '@material-ui/icons/AddToQueueRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import { Modal as Magnifier } from "../../../../components/modal/Modal";
import { Box, Button } from '@material-ui/core';
import homeStyles from '../../../../styles/Home.module.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 10,
        background: '#f0f2f5'
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    gallery: {
        width: '100%',
    },
    imageContainer: {
        position: 'relative',
        width: 'inherit',
        height: 'inherit',
        "&:hover *": {
            opacity: 1
        }
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        cursor: 'pointer'
    },
    img: {
        width: '20%',
        borderBottom: '4px solid transparent',
        margin: '0 0.2rem',
        cursor: 'pointer',
        "&:hover": {
            borderColor: 'rgb(0, 112, 243)',
            background: "rgb(7, 177, 77, 0.7)",
        }
    },
    specs: {
        [theme.breakpoints.down(450)]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    title: {
        color: 'rgb(0, 112, 243)',
        width: 'max-content',
        margin: '1rem',
        fontSize: '1.8rem',
        fontWeight: 200,
    },
    panel: {
        /*marginTop: '0.6rem',
        marginBottom: '0.8rem',*/
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.2em',
        '& > *': {
            margin: theme.spacing(2)
        },
        "& span": {
            color: 'gray',
            fontWeight: 200
        }
    },
    typo: {
        color: 'rgb(70, 70, 70)',
        margin: '0.5rem 0.5rem',
        "& > *": {
            marginRight: '0.4rem',
        },
        [theme.breakpoints.down(450)]: {
            flexDirection: 'column'
        },
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        "& > *": {
            marginRight: '0.4rem',
        },
    },
    price: {
        margin: '0 0.4rem',
    },
    priceContainer: {
        "& p": {
            fontSize: '1.2rem',
        }
    },
    divider: {
        width: '100%',
        height: '0.05rem',
        background: '#b2bec3',
        margin: '0.4rem 0'
    },
    zoomIcon: {
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(-50%, 50%)',
        fontSize: '2.5rem',
        color: 'rgb(107, 107, 107)',
        background: '#fff',
        borderRadius: '0.2rem',
        opacity: 0,
        transition: 'all 500ms ease-in-out',
    }
}));

interface LaptopDetailType {
    laptop: LaptopModel | null | undefined;
}

export default function LaptopDetail({ laptop }: LaptopDetailType) {

    const router = useRouter();
    const classes = useStyles();

    const [curImg, setCurImg] = useState<string>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    if (!laptop) {
        return (
            <div>
                <h2>Sorry, laptop not found in our database :(</h2>
            </div>
        );
    }

    const { id, brand, name, display, processor, memory, memory_type, graphics, storage, storage_unit, imgUrl, price } = laptop;

    return (
        <div className={classes.root}>
            <Head>
                <title>{brand}{' '}{name}</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <Box className={classes.panel}>
                <a className={homeStyles.navbar_link} onClick={() => router.back()}>Back</a>
                <div>
                    <Link href='/'>Home</Link>
                    <span>/</span>
                    <Link href='/laptops'>Laptops</Link>
                    <span>/</span>
                    <span>{name}</span>
                </div>
            </Box>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sm container direction="column" >
                        <Grid item container spacing={2}>
                            <Grid className={classes.imageContainer}
                                onClick={() => setOpenModal(true)}
                            >
                                <img className={classes.image} alt={name}
                                    src={curImg !== null ? curImg : imgUrl[0]}
                                />
                                <ZoomInIcon className={classes.zoomIcon} />
                            </Grid>

                            <Magnifier
                                isOpen={openModal}
                                onClose={() => setOpenModal(!openModal)}
                            >
                                <img className={classes.image} alt={name}
                                    src={curImg !== null ? curImg : imgUrl[0]}
                                />
                            </Magnifier>

                            <Grid item className={classes.gallery} direction="row" justify="center" container spacing={2}>
                                {imgUrl.map(img => (
                                    <img key={img} className={classes.img} alt={img} src={img}
                                        onClick={() => setCurImg(img)}
                                    />
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} container>
                        <Grid xs item container direction="row" justify="center" alignItems="center" spacing={2}>
                            <Grid xs={12} md className={classes.specs} item container direction="column" >
                                <Typography className={classes.title} color="primary">
                                    Specifications
                                </Typography>
                                <Grid className={classes.typo} item container direction="row" justify="flex-start" alignItems="center">
                                    <Typography className={classes.row}><LaptopMacRoundedIcon /> Product name:</Typography>
                                    <Typography variant="h6" color="textPrimary">{brand}{' '}{name}</Typography>
                                </Grid>
                                <Grid className={classes.typo} item container direction="row" justify="flex-start" alignItems="center">
                                    <Typography className={classes.row}><AddToQueueRoundedIcon /> Display diagonal:</Typography>
                                    <Typography variant="h6" color="textPrimary"><b>{display}</b></Typography>
                                </Grid>
                                <Grid className={classes.typo} item container direction="row" justify="flex-start" alignItems="center">
                                    <Typography className={classes.row}><MemoryIcon /> Processor:</Typography>
                                    <Typography variant="h6" color="textPrimary">{processor}</Typography>
                                </Grid>
                                <Grid className={classes.typo} item container direction="row" justify="flex-start" alignItems="center">
                                    <Typography className={classes.row}><MemoryIcon /> Internal memory:</Typography>
                                    <Typography variant="h6" color="textPrimary">{memory}{' '}{memory_type}</Typography>
                                </Grid>
                                <Grid className={classes.typo} item container direction="row" justify="flex-start" alignItems="center">
                                    <Typography className={classes.row}><ImageRoundedIcon /> Graphics:</Typography>
                                    <Typography variant="h6" color="textPrimary">{graphics}</Typography>
                                </Grid>
                                <Grid className={classes.typo} item container direction="row" justify="flex-start" alignItems="center">
                                    <Typography className={classes.row}><StorageRoundedIcon /> Storage:</Typography>
                                    <Typography variant="h6" color="textPrimary">{storage}{' '}{storage_unit}</Typography>
                                </Grid>
                                <div className={classes.divider} />
                                <Typography variant="body1">
                                    Click the image for Full resolution ??? JPG/JPEG/PNG
                                </Typography>

                                <Typography className={classes.typo} variant="body2" color="textSecondary">
                                    ID: 00{id}
                                </Typography>
                            </Grid>

                            <Grid className={classes.priceContainer} item container justify="center" alignItems="center">
                                <p>Price: </p>
                                <Typography className={classes.price} variant="h6">{price.toFixed(2)} KM</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const serviceDirectory = join(process.cwd(), 'public');
    const lapId = context.params.id;
    const dbConnection = await openDB();

    const laptop = await dbConnection.get<LaptopModel | undefined>(
        "SELECT Laptop.id, Brand.brandName AS brand, name, display, processor, memory, memory_type, graphics, storage, storage_unit, imgUrl, price FROM Laptop " +
        "INNER JOIN Brand WHERE Laptop.brand = Brand.id AND Laptop.id = ?;", [lapId]);

    if (laptop?.imgUrl) {
        const imgNames: string[] = fs.readdirSync(`${serviceDirectory}${laptop.imgUrl}`, "utf-8");
        const images = imgNames.map(img => `${laptop.imgUrl}${img}`);
        laptop.imgUrl = images;
    }
    return {
        props: { laptop: laptop || null }
    }
}