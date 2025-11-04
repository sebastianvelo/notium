import { useEffect, RefObject } from "react";

/**
 * Hook personalizado que detecta clics fuera de un elemento específico
 * @param ref - Referencia al elemento que queremos monitorear
 * @param callback - Función que se ejecutará cuando se detecte un clic fuera
 */
const useClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T | null>, callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};

export default useClickOutside;