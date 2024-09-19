import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const parent = {
    initial: {
        opacity: 0,
        y: 50,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            ease: "easeOut",
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
    exit: {
        opacity: 0,
        y: 50,
        transition: {
            ease: "easeOut",
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const children = {
    animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            type: "easing",
        },
    },
    initial: {
        opacity: 0,
        y: 50,
        filter: "blur(3px)",
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
    exit: {
        opacity: 0,
        y: 50,
        filter: "blur(3px)",
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
};

export const StaggerAnimate = {
    parent,
    children,
};
