import { useRouter } from "next/router";
import Link from "next/link";

/* styled-component imports */
import { StyledNav } from "./NavBar.style";

import AppsIcon from '@material-ui/icons/Apps';

import { MdLaptopMac } from "react-icons/md";
import { useMobileContext } from "../../contexts/MobileContext";
import Hamburger from "../hamburger-button/Hamburger";


interface NavBarType {
    title: string;
    menuIcon: boolean;
}

export default function NavBar({ title, menuIcon }: NavBarType) {

    const router = useRouter();
    const { pathname } = router;
    //const isLaptopsPath: boolean = pathname.startsWith('/laptops');
    const isFaqsPath: boolean = pathname.includes('/faq');
    const { isMobile } = useMobileContext();

    const renderTitle = () => {
        return (
            <div>
                <span >
                    Our laptps offer
                </span>
            </div>
        );
    }

    return ( // {isLaptopsPath && renderTitle()}

        <StyledNav >
            {isMobile && <Hamburger />}
            <div className="nav-left">
                <Link href='/'>
                    {menuIcon &&
                        <div className="nav-icon">
                            <MdLaptopMac />
                        </div>
                    }
                </Link>
                <span className="title">{title}</span>
            </div>

            <ul className="nav-items">
                {!isFaqsPath &&
                    <li className="nav-item" color="inherit">
                        <Link href='/faq'>
                            <a>FAQ</a>
                        </Link>
                    </li>}
                <li className="nav-item"><a>Contact</a></li>
                <li className="nav-item"><a>About</a></li>
            </ul>

            {isMobile && <div />}

        </StyledNav>
    );
}