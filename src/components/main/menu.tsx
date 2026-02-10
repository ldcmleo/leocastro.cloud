import { useEffect, useRef, useState } from "react";
import ThemeButton from "./theme_button";
import UpButton from "./up_button";

export default function NavMenu() {
    const [open, setOpen] = useState(false);
    const themeButtonRef = useRef<HTMLButtonElement>(null);
    const upButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (open) {
            if (themeButtonRef.current) {
                themeButtonRef.current.style.top = "-45px";
            }
            if (upButtonRef.current) {
                upButtonRef.current.style.left = "-45px";
            }
        } else {
            if (themeButtonRef.current) {
                themeButtonRef.current.style.top = "0px";
            }
            if (upButtonRef.current) {
                upButtonRef.current.style.left = "0px";
            }
        }
    }, [open]);

    return (
        <div className="fixed right-4 bottom-4">
            <div className="relative">
                <button
                    className="bg-zinc-300 dark:bg-zinc-600 px-3 py-2 rounded-sm"
                    onClick={() => setOpen(!open)}
                >
                    <i
                        className={open ? "nf nf-fa-close" : "nf nf-md-menu"}
                    ></i>
                </button>
                <ThemeButton ref={themeButtonRef} />
                <UpButton ref={upButtonRef} />
            </div>
        </div>
    );
}
