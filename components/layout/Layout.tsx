import * as React from "react";
import Head from "next/head";
import NavBar from "../../components/navigation/NavBar";
import { useMobileContext } from "../../contexts/MobileContext";
import MobileNavbar from "../../components/sidebar/MobileNavbar";
import Hamburger from "../hamburger-button/Hamburger";

type LayoutType = {
    children?: React.ReactChild | React.ReactChild[]
}

export default function Layout(props: LayoutType) {

    const { mobState, isMobile, toggleNav } = useMobileContext();

    React.useEffect(() => {

        if (!isMobile && mobState.toggle) {
            toggleNav(false);
        }

    }, [isMobile]);

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.svg" />
                <meta charSet='utf-8' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>
            <div >
                <NavBar title='Laptop Finder App' menuIcon />
                
                {mobState.toggle && <MobileNavbar />}
                <main>{props.children}</main>
            </div>
        </>
    );// className={styles.layout_content}
} // {isMobile && <Hamburger />}