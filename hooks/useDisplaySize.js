import { useEffect, useState } from "react";

//const isBrowser = () => typeof window !== "undefined";

export default function useDisplaySize() {

    const [displaySize, setDisplaySize] = useState({
        width: 0,
        height: 0
    });
   
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {

        function getSize() {
            setDisplaySize({
                width: window.innerWidth,
                height: window.innerHeight
            });

            (window.innerWidth > 600) ? setIsMobile(false) : setIsMobile(true);
        }

        window.addEventListener('resize', getSize);

        return () => {
            window.removeEventListener('resize', getSize);
        }

    }, [])

    return { isMobile, displaySize };
}