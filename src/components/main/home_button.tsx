import { forwardRef } from "react";

const HomeButton = forwardRef<HTMLButtonElement>((_, ref) => {
    const handleClick = () => {
        window.location.href = "/";
    };

    return (
        <button
            onClick={handleClick}
            className="absolute bg-zinc-300 dark:bg-zinc-600 px-3 py-2 rounded-sm left-0 transition-all ease-in"
            style={{
                zIndex: -1,
            }}
            ref={ref}
        >
            <i className="nf nf-fa-home"></i>
        </button>
    );
});

export default HomeButton;
