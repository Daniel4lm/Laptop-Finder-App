import * as React from "react";
import Head from "next/head";
import { NavBar } from "../../components/navigation/NavBar";
import { useMobileContext } from "../../contexts/MobileContext";
import MobileNavbar from "../../components/sidebar/MobileNavbar";

type LayoutType = {
    children?: React.ReactChild | React.ReactChild[];
}

export default function Layout(props: LayoutType) {

    const { mobState, isMobile, toggleNav } = useMobileContext();

    const navRef = React.useRef(null);

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
            <div>
                <NavBar ref={navRef} title='Laptop Finder App' menuIcon />
                {mobState.toggle && <MobileNavbar top={navRef.current?.offsetHeight} />}
                <main>{props.children}</main>
            </div>
        </>
    );
}