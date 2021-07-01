import { useState, useEffect } from "react";

function useWindowsWidth(width) {
    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth);

    let checkScreenSize = () => {
        setIsScreenSmall(window.innerWidth);
    };
    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return isScreenSmall;
};

export default useWindowsWidth;