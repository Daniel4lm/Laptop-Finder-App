import Link from "next/link";
import { useRouter } from "next/router";
import { useMobileContext } from '../../contexts/MobileContext';
import * as M from "./Mobile.style";

export default function MobileNavbar({ top }) {

    const { mobState, toggleNav } = useMobileContext();
    const router = useRouter();
    const { pathname } = router;
    const isFaqsPath: boolean = pathname.includes('/faq');

    console.log('Ako ga ima, ', top)

    const changeItem = () => {
        toggleNav(false);
    }

    return (
        <>
            <M.NavItems top={top}>
                {!isFaqsPath &&
                    <M.NavItem color="inherit" onClick={changeItem}>
                        <Link href='/faq'>
                            <a>FAQ</a>
                        </Link>
                    </M.NavItem>}
                <M.NavItem onClick={changeItem}><a>Contact</a></M.NavItem>
                <M.NavItem onClick={changeItem}><a>About</a></M.NavItem>
            </M.NavItems>
        </>
    )
}