import ParallaxText from "@/components/ui/scroll";
import { StaggerAnimate } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
    AiBrowserIcon,
    Bug01Icon,
    PuzzleIcon,
    SourceCodeIcon,
} from "hugeicons-react";
import React from "react";

export default function About() {
    return (
        <div className="w-full h-full">
            <div>
                <h2 className="text-md font-bold">
                    Hola, I'm Asmin, a Web Developer.
                </h2>
                <p className="leading-7 font-light">
                    I am a student who is passionate about web development and
                    has a deep interest in learning new technologies. With
                    experience using various frameworks and libraries such as
                    Laravel, Flask, Express, React, Next.js, and Tailwind CSS.
                </p>
                <p className="mt-2 leading-7 font-light">
                    I have become accustomed to the fast pace of the software
                    development world. My ability to learn quickly and adapt to
                    change allows me to always be at the forefront of adopting
                    the latest technologies. In addition, I also have a creative
                    and innovative spirit, thus always striving to create unique
                    solutions and provide the best user experience.
                </p>
            </div>
            <section className="mt-8">
                <h1 className="text-3xl font-bold">What i'm doing</h1>
                <AnimatePresence mode="wait">
                    <motion.div
                        variants={StaggerAnimate.parent}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="my-4 grid grid-cols-1 lg:grid-cols-2 gap-4"
                    >
                        <motion.div
                            variants={StaggerAnimate.children}
                            className="p-8 rounded-xl bg-gradient-to-tl from-base-800/20 to-base-800 shadow-3xl shadow-base-900 border-t border-l border-base-700/50"
                        >
                            <div className="flex gap-x-4">
                                <AiBrowserIcon
                                    className="text-primary-400 size-10"
                                    strokeWidth={1}
                                />
                                <div className="flex-1">
                                    <h1 className="text-lg font-bold">
                                        Web Development
                                    </h1>
                                    <p className="text-sm text-base-300 mt-2 font-light">
                                        Design and develop user-friendly
                                        websites.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={StaggerAnimate.children}
                            className="p-8 rounded-xl bg-gradient-to-tl from-base-800/20 to-base-800 shadow-3xl shadow-base-900 border-t border-l border-base-700/50"
                        >
                            <div className="flex gap-x-4">
                                <PuzzleIcon
                                    className="text-primary-400 size-10 rotate-90"
                                    strokeWidth={1}
                                />
                                <div className="flex-1">
                                    <h1 className="text-lg font-bold">
                                        Slicing UI
                                    </h1>
                                    <p className="text-sm text-base-300 mt-2 font-light">
                                        Transforming designs into code with
                                        TailwindCss
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={StaggerAnimate.children}
                            className="p-8 rounded-xl bg-gradient-to-tl from-base-800/20 to-base-800 shadow-3xl shadow-base-900 border-t border-l border-base-700/50"
                        >
                            <div className="flex gap-x-4">
                                <Bug01Icon
                                    className="text-primary-400 size-10"
                                    strokeWidth={1}
                                />
                                <div className="flex-1">
                                    <h1 className="text-lg font-bold">
                                        Web Crawling and Scraping
                                    </h1>
                                    <p className="text-sm text-base-300 mt-2 font-light">
                                        Crawl and scrape data from websites
                                        using Python and transform it into JSON
                                        or CSV format
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={StaggerAnimate.children}
                            className="p-8 rounded-xl bg-gradient-to-tl from-base-800/20 to-base-800 shadow-3xl shadow-base-900 border-t border-l border-base-700/50"
                        >
                            <div className="flex gap-x-4">
                                <SourceCodeIcon
                                    className="text-primary-400 size-10"
                                    strokeWidth={1}
                                />
                                <div className="flex-1">
                                    <h1 className="text-lg font-bold">
                                        API Development
                                    </h1>
                                    <p className="text-sm text-base-300 mt-2 font-light">
                                        Creating RESTful APIs with Flask,
                                        Express. In addition, I am also familiar
                                        with Laravel
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </section>
            <div className="w-full mx-auto overflow-hidden pb-16 lg:pb-6">
                <ParallaxText baseVelocity={4}>
                    <div className="flex">
                        <h1 className="text-4xl font-bold mr-12">Python</h1>
                        <h1 className="text-4xl font-bold mr-12">Javascript</h1>
                        <h1 className="text-4xl font-bold mr-12">PHP</h1>
                    </div>
                </ParallaxText>
                <ParallaxText baseVelocity={-3}>
                    <div className="flex">
                        <h1 className="text-4xl font-bold mr-12">Flask</h1>
                        <h1 className="text-4xl font-bold mr-12">Laravel</h1>
                        <h1 className="text-4xl font-bold mr-12">Express</h1>
                        <h1 className="text-4xl font-bold mr-12">React</h1>
                        <h1 className="text-4xl font-bold mr-12">NextJS</h1>
                        <h1 className="text-4xl font-bold mr-12">
                            TailwindCss
                        </h1>
                    </div>
                </ParallaxText>
            </div>
        </div>
    );
}
