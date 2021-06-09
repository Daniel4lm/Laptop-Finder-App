import styled from "styled-components";

import { AccordionDetails, Typography, Grid } from "@material-ui/core";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { GetStaticProps } from "next";
import { openDB } from "../lib/openDB";
import FaqModel from "../model/Faq";

import Accordion from "../components/accordion/Accordion";

interface FaqProps {
    faqs: FaqModel[];
}

const useStyles = makeStyles((theme) => ({
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

const StyledFaq = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: inherit;

    .faq-cover {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding: 1.5rem 1rem;
        margin-bottom: 1rem;
        font-size: 25px;
        font-weight: bold;
        background: rgb(100, 149, 237);
        color: #fff;
    }

    .faq-title {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding: 0.5rem 0;
        margin: 1rem 0;
    }

    .container {
        //margin: auto;
    }

    @media screen and (max-width: 600px) {
        .container {
            width: 90%;
        }
        .faq-cover {
            font-size: 20px;
            justify-content: flex-start;
        }
        .faq-title {
            width: 90%;
            padding: 0 0.5rem;
        }
    }

    @media screen and (min-width: 600px) {
        .container {
            width: 50%;
        }
    }
`;

export default function Faq({ faqs }: FaqProps) {

    return (
        <StyledFaq>
            <div className="faq-cover" >
                <span>How we can help you ?</span>
            </div>
            <h3 className="faq-title" >
                    Help Center - Frequently Asked Questions
                </h3>
            <div className="container" >               
                
                {faqs.map(faq => (
                    <Accordion key={faq.id} title={faq.question}>
                        <span>{faq.answer}</span>
                    </Accordion>
                ))}
            </div>
        </StyledFaq>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {

    const dbCon = await openDB();
    const faqs = await dbCon.all("SELECT * FROM FAQ ORDER BY createDate DESC;")

    return {
        props: { faqs }
    }
}