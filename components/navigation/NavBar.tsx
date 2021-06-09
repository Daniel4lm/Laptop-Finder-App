import { useRouter } from "next/router";
import Link from "next/link";

/* styled-component imports */
import { StyledNav } from "./NavBar.style";

import AppsIcon from '@material-ui/icons/Apps';


interface NavBarType {
    title: string;
    menuIcon: boolean;
}

export default function NavBar({ title, menuIcon }: NavBarType) {

    const router = useRouter();
    const { pathname } = router;
    const isLaptopsPath: boolean = pathname.startsWith('/laptops');
    const isFaqsPath: boolean = pathname.includes('/faq');

    const renderTitle = () => {
        //const { curPageNum, numOfPages } = props;
        //console.log('Total pages: ', numOfPages, ' - current page ', curPageNum)

        return (
            <div>
                <span >
                    Our laptps offer
                </span>
            </div>
        );
    }

    return (
        <StyledNav >
            <div className="nav-left">
                <Link href='/'>
                    {menuIcon &&
                        <div className="nav-icon">
                            <AppsIcon />
                        </div>
                    }
                </Link>
                <span className="title">{title}</span>
            </div>

            {isLaptopsPath && renderTitle()}

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

        </StyledNav>
    );
}