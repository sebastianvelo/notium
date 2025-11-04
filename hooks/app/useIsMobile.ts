import { useEffect, useState } from "react";

export enum ScreenSize {
    SM = 640,
    MD = 768,
    LG = 1024,
    XL = 1280,
    XL2 = 1536
}

const useIsMobile = (breakpoint: ScreenSize = ScreenSize.MD): boolean => {
    const query = `(max-width: ${breakpoint}px)`;
    const getMatch = () => typeof window !== "undefined" && window.matchMedia(query).matches;

    const [isMobile, setIsMobile] = useState(getMatch);

    useEffect(() => {
        const mql = window.matchMedia(query);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, [query]);

    return isMobile;
}

export default useIsMobile;
