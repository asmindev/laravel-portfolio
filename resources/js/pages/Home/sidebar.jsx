import React from "react";
import { motion } from "framer-motion";
import { StaggerAnimate } from "@/lib/utils";
import {
    Github01Icon,
    InstagramIcon,
    Linkedin01Icon,
    Location05Icon,
    Mail02Icon,
    SmartPhone01Icon,
} from "hugeicons-react";

const socials = [
    {
        id: 1,
        name: "Instagram",
        href: "https://www.instagram.com/iniasmin_/",
        icon: <InstagramIcon className="size-6" />,
    },
    {
        id: 2,
        name: "Github",
        href: "https://github.com/asmindev",
        icon: <Github01Icon className="size-6" />,
    },
    {
        id: 3,
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/asmindev/",
        icon: <Linkedin01Icon className="size-6" />,
    },
];
export default function Sidebar() {
    return (
        <div className="w-full h-full lg:w-1/4 px-2 py-3">
            <div className="border-[0.5px] border-base-700 lg:min-h-[90svh] bg-base-800/50 rounded-3xl p-4">
                <div className="flex flex-col gap-4 h-full divide-y divide-zinc-700">
                    <div className="lg:px-12 lg:pt-12">
                        <div className="flex gap-x-4 lg:flex-col">
                            <img
                                src="https://codewithsadee.github.io/vcard-personal-portfolio/assets/images/my-avatar.png"
                                alt="My Avatar"
                                className="w-1/4 lg:w-full rounded-3xl mx-auto bg-gradient-to-br from-base-700/50 to-base-800/50"
                            />
                            <div className="w-3/4 lg:w-full text-left lg:text-center">
                                <h1 className="text-xl font-bold mt-2">
                                    Asmin
                                </h1>
                                <h2 className="w-fit lg:mx-auto text-sm bg-base-700/50 px-3 py-2 text-zinc-300 rounded-xl mt-2 whitespace-nowrap">
                                    Web Developer
                                </h2>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        variants={StaggerAnimate.parent}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex-1 flex flex-col gap-y-4 lg:gap-y-6 py-4"
                    >
                        <motion.div
                            variants={StaggerAnimate.children}
                            className="flex gap-x-2 lg:gap-x-4"
                        >
                            <span className="p-2 lg:p-3 bg-gradient-to-br from-base-700/50 to-base-800/50 rounded-xl h-fit border-t-[0.2px] border-l-[0.2px] border-zinc-700 ">
                                <Mail02Icon
                                    strokeWidth={1.2}
                                    className="text-primary-400 size-4 lg:size-6"
                                />
                            </span>
                            <div className="w-full text-xs">
                                <h2 className="text-base-300 uppercase">
                                    Email
                                </h2>
                                <p className="text-base-400">
                                    asminmin477@gmail.com
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={StaggerAnimate.children}
                            className="flex gap-x-2 lg:gap-x-4"
                        >
                            <span className="p-2 lg:p-3 bg-gradient-to-br from-base-700/50 to-base-800/50 rounded-xl h-fit border-t-[0.2px] border-l-[0.2px] border-zinc-700">
                                <SmartPhone01Icon
                                    strokeWidth={1.2}
                                    className="text-primary-400 size-4 lg:size-6"
                                />
                            </span>
                            <div className="w-full text-xs">
                                <h2 className="text-base-300 uppercase">
                                    Phone
                                </h2>
                                <p className="text-base-400">
                                    +62 812 4287 3775
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={StaggerAnimate.children}
                            className="flex gap-x-2 lg:gap-x-4"
                        >
                            <span className="p-2 lg:p-3 bg-gradient-to-br from-base-700/50 to-base-800/50 rounded-xl h-fit border-t-[0.2px] border-l-[0.2px] border-zinc-700">
                                <Github01Icon className="text-primary-400 size-4 lg:size-6" />
                            </span>
                            <div className="w-full text-xs">
                                <h2 className="text-base-300 uppercase">
                                    Github
                                </h2>
                                <a
                                    href="https://github.com/asmindev"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-base-400 text-sm"
                                >
                                    asmindev
                                </a>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={StaggerAnimate.children}
                            className="flex gap-x-2 lg:gap-x-4"
                        >
                            <span className="p-2 lg:p-3 bg-gradient-to-br from-base-700/50 to-base-800/50 rounded-xl h-fit border-t-[0.2px] border-l-[0.2px] border-zinc-700">
                                <Location05Icon className="text-primary-400 size-4 lg:size-6" />
                            </span>
                            <div className="w-full text-xs">
                                <h2 className="text-base-300 uppercase">
                                    Location
                                </h2>
                                <a
                                    href="https://github.com/asmindev"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-base-400 text-sm"
                                >
                                    Kendari, Sulawesi Tenggara, Indonesia.
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                    <div className="flex gap-4 justify-center items-center pt-3">
                        {socials.map((social) => (
                            <a
                                key={social.id}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
