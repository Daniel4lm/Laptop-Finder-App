import * as React from 'react';
import Link from "next/link";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import * as colors from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import LaptopModel from "../../model/Laptop";

export interface LaptopCardTypes {
    laptop: LaptopModel;
}

const useStyles = makeStyles((theme) => ({
    root: {
        //maxWidth: 345,
        margin: '0.5rem',
        border: '2px solid transparent',
        "&:hover": {
            //borderColor: 'rgba(52, 52, 52, 0.5)',
            boxShadow: '0px 0px 8px 0px rgba(52, 52, 52, 0.4)',
            cursor: 'pointer',
        },
    },
    media: {
        height: 0,
        paddingTop: '66.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',

    },
    content: {
        color: 'rgb(52, 52, 52)',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: colors.green[400],//'rgba(0, 128, 0, 0.6)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeInOut
        }),
        "&:hover": {
            //boxShadow: '0px 0px 0px 1px rgba(97, 98, 201, 0.9)',
            cursor: 'pointer',
            transform: 'scale(1.2)'
        },
    }
}))

export default function LaptopCard({ laptop }: LaptopCardTypes) {

    const classes = useStyles();

    return (
        <Link href={`/laptop/${laptop.brand}/${laptop.name}/${laptop.id}`}>
            <a>
                <Card elevation={2} className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar} aria-label="recipe">{laptop.brand.charAt(0)}</Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={`${laptop.brand} ${laptop.name}`}
                        subheader={`${laptop.price} KM`}
                    />
                    <CardMedia
                        className={classes.media}
                        image={laptop.imgUrl[0]}
                        title={`${laptop.brand} ${laptop.name}`}
                    />
                    <CardContent>
                        <Typography variant="body2" className={classes.content}>
                            <b>Brand: </b>{laptop.brand}, <b>model: </b> {laptop.name}, <b>Processor: </b> {laptop.processor}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </a>
        </Link>
    )
}