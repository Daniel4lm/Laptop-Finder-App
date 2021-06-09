import { ReactChild, useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AccordionStyle, AccordionType } from "./Accordion.style";

//import style from "./Accordion.module.scss";

interface AccordionTypes {
    title: string;
    content?: string;
    children: ReactChild | ReactChild[];
}

export default function Accordion({ title, content, children }: AccordionTypes) {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [contentHeight, setHeightState] = useState<string>("0px");

    const contentRef = useRef(null);

    const toggleAccordion = () => {
        setExpanded(!expanded);
        setHeightState(expanded ? '0px' : `${contentRef.current.scrollHeight}px`);
    }

    return (
        <AccordionStyle expanded={expanded} borderColor='rgba(0, 0, 0, .35)' >
            <button className={expanded ? "title expanded" : "title"}
                onClick={toggleAccordion}>
                <span>{title}</span>
                <span className="toggle" >{expanded ? <FiChevronUp /> : <FiChevronDown />}</span>
            </button>

            <div
                ref={contentRef}
                style={{ maxHeight: `${contentHeight}` }}
                className="content"
            >
                <p className="text">{children}</p>
            </div>
        </AccordionStyle>
    )
}