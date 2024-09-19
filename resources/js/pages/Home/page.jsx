import Layout from "@/layout";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./sidebar";

const Projects = React.lazy(() => import("./projects"));
const Resume = React.lazy(() => import("./resume"));
const Contact = React.lazy(() => import("./contact"));
const About = React.lazy(() => import("./about"));
export default function Home() {
    const links = [
        {
            id: 1,
            href: "/about",
            name: "About Me",
            component: <About />,
        },

        {
            id: 4,
            href: "/resume",
            name: "Resume",
            component: <Resume />,
        },
        {
            id: 5,
            href: "/portfolio",
            name: "Portfolio",
            component: <Projects />,
        },
        {
            id: 3,
            href: "/contact",
            name: "Contact",
            component: <Contact />,
        },
    ];

    const [item, setItem] = useState(links[0]);
    return (
        <Layout>
            <div className="w-full h-full relative">
                <div className="flex flex-col lg:flex-row lg:gap-x-4">
                    <Sidebar />
                    <div className="w-full lg:w-3/4 px-2 lg:px-0 py-3">
                        <div className="w-full border-[0.5px] border-base-700 min-h-[90svh] bg-base-800/50 rounded-3xl overflow-hidden">
                            <div className="w-full h-full flex justify-between">
                                <div className="flex-1 min-h-full flex items-end px-8 relative after:absolute after:-bottom-3 after:left-8 after:bg-gradient-to-br after:from-primary-600 after:to-primary-400 after:h-1.5 after:w-14 after:rounded-xl ">
                                    <AnimatePresence mode="wait">
                                        <motion.h1
                                            initial={{
                                                opacity: 0,
                                                filter: "blur(5px)",
                                            }}
                                            animate={{
                                                opacity: 1,
                                                filter: "blur(0px)",
                                            }}
                                            exit={{
                                                opacity: 0,
                                                filter: "blur(5px)",
                                            }}
                                            transition={{ duration: 0.3 }}
                                            key={item.id}
                                            className="mt-6 lg:mt-0 text-xl md:text-2xl lg:text-4xl font-bold md:font-extrabold"
                                        >
                                            {item.name}
                                        </motion.h1>
                                    </AnimatePresence>
                                </div>
                                <div className="hidden lg:block w-3/5 border-l-[0.5px] border-b-[0.5px] border-base-700 h-full px-8 py-4 rounded-bl-3xl bg-gradient-to-bl from-base-700/80 to-base-800/50">
                                    <ul className="flex gap-x-8 justify-evenly">
                                        {links.map((link, index) => (
                                            <li key={index}>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setItem(link)
                                                    }
                                                    className={`text-base-300 transition-colors text-sm ${
                                                        item.id === link.id
                                                            ? "text-primary-400"
                                                            : "hover:text-primary-300"
                                                    }
                                    `}
                                                >
                                                    {link.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <section className="w-full h-full mt-12 px-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={item.id}
                                        initial={{
                                            opacity: 0,
                                            filter: "blur(5px)",
                                        }}
                                        animate={{
                                            opacity: 1,
                                            filter: "blur(0px)",
                                        }}
                                        exit={{
                                            opacity: 0,
                                            filter: "blur(5px)",
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {item.component}
                                    </motion.div>
                                </AnimatePresence>
                            </section>
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-0 w-full h-16 lg:hidden">
                    <div className="w-full h-full bg-base-700/50 backdrop-blur-lg rounded-t-2xl border border-base-700 p-4">
                        <div className="w-10/12 mx-auto flex justify-between text-sm">
                            {links.map((link, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setItem(link)}
                                    className={`text-base-300 transition-colors ${
                                        item.id === link.id
                                            ? "text-primary-600"
                                            : "hover:text-primary-400"
                                    }
                                    `}
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
