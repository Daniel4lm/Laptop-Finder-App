import { AccordionDetails, Typography, Grid } from "@material-ui/core";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { GetStaticProps } from "next";
import { openDB } from "../lib/openDB";
import FaqModel from "../model/Faq";

interface FaqProps {
    faqs: FaqModel[];
}

const Accordion = withStyles({
    root: {
        marginBottom: '0.4rem',
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&:last-child': {
            borderRadius: 0,
        },
        '&$expanded': {
            margin: '0.2rem auto',
            borderBottomLeftRadius: '0.2rem',
            borderBottomRightRadius: '0.2rem',
        },

    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .02)',
        //borderBottom: '1px solid rgba(0, 0, 0, .125)',
        borderBottom: '3px solid transparent',
        marginBottom: -1,
        "&:hover": {
            //background: 'rgb(235, 235, 235)',
            borderBottomColor: '#0984e3',
        },
        '&$expanded': {
            background: 'rgba(0, 0, 0, .09)',
            borderBottom: '1px solid rgba(0, 0, 0, .125)',
        },
    },
    content: {
        '&$expanded': {
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1),
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
            color: 'red',
            borderBottomLeftRadius: '0.2rem',
            borderBottomRightRadius: '0.2rem',
            border: '4px solid rgba(0, 0, 0, .125)',
        },

    },
    heading: {
        background: 'rgb(240, 240, 240)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        "&:hover": {
            background: 'rgb(230, 230, 230)',

        }
    },
    title: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        margin: 'auto'
    }
}));

export default function Faq({ faqs }: FaqProps) {

    const classes = useStyles();

    return (
        <Grid xs={12} md={6} className={classes.container} >
            <Typography style={{ margin: '1rem 0' }} variant='h5' color='inherit'>
                Help Center
            </Typography>
            <Typography style={{ margin: '0.5rem 0' }} variant='h6' color='inherit'>
                Frequently Asked Questions
            </Typography>

            {faqs.map(faq => (
                <Accordion key={faq.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.title}>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {faq.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            ))}
        </Grid>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {

    const dbCon = await openDB();
    const faqs = await dbCon.all("SELECT * FROM FAQ ORDER BY createDate DESC;")

    return {
        props: { faqs }
    }
}