import { useEffect, useRef, useState } from "react";

export default function useOutsideClick(func) {

    let menuRef = useRef(null);
    let hamburgerRef = useRef(null);

    useEffect(() => {

        const handleClick = (event) => {

            if (!menuRef.current || menuRef.current.contains(event.target)) {
                return;
            }
            if (hamburgerRef.current && !hamburgerRef.current.isEqualNode(event.target)) {
                console.log('fsdfsf')
                func(false);
            }           
        }

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, [menuRef, hamburgerRef, func]);

    const setElemRef = (fref, sref) => {
        menuRef = fref;
        hamburgerRef = sref;
    }

    return { setElemRef };
}