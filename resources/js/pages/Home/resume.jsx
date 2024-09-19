import { StaggerAnimate } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen01Icon, NewJobIcon } from "hugeicons-react";

const TimelineHeading = ({ children }) => (
    <motion.div
        variants={StaggerAnimate.children}
        className="first:mt-0 relative after:-z-50 after:absolute after:top-1 after:bottom-0 after:start-3.5 after:w-px after:h-full after:-translate-x-[0.5px] after:bg-base-700"
    >
        {children}
    </motion.div>
);

const TimelineIcon = () => (
    <div className="relative last:after:hidden after:absolute after:top-1 after:bottom-0 after:start-3.5 after:w-px after:h-full after:-translate-x-[0.5px] after:bg-base-700">
        <div className="relative top-1.5 left-[5.8px] z-10 size-4 flex justify-center items-center border-2 border-base-700 rounded-full">
            <div className="size-2 rounded-full bg-gradient-to-tl from-primary-600 to-primary-400" />
        </div>
    </div>
);

const TimelineContent = ({ children }) => (
    <div className="grow pb-8">{children}</div>
);

const TimelineItem = ({ children }) => (
    <motion.div className="flex gap-x-8" variants={StaggerAnimate.children}>
        <TimelineIcon />
        <TimelineContent>{children}</TimelineContent>
    </motion.div>
);

export default function Resume() {
    return (
        <div>
            <motion.div
                variants={StaggerAnimate.parent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
            >
                <TimelineHeading>
                    <div className="flex gap-x-4 pb-2">
                        <span className="p-2 relative -left-0.5 bg-gradient-to-br from-base-700 to-base-800 rounded-xl h-fit border-t-[0.2px] border-l-[0.2px] border-zinc-700">
                            <BookOpen01Icon className="text-primary-400 size-4" />
                        </span>
                        <h2 className="text-lg font-medium">Education</h2>
                    </div>
                </TimelineHeading>
                <TimelineItem>
                    <div className="">
                        <h2 className="text-lg">
                            Haluoleo University, Kendari
                        </h2>
                        <span className="flex gap-x-2">
                            <p className="text-primary-400">2021 - Present,</p>
                            <p>Informatics Engineering</p>
                        </span>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Saepe, eum!
                        </p>
                    </div>
                </TimelineItem>
                <TimelineItem>
                    <div className="">
                        <h2 className="text-lg">SMKN 2 Baubau</h2>
                        <span className="flex gap-x-2">
                            <p className="text-primary-400">2016 - 2019,</p>
                            <p>Electronica Engineering</p>
                        </span>
                        <p>
                            Exercitationem eligendi est, illum, unde eveniet
                            consequatur tenetur.
                        </p>
                    </div>
                </TimelineItem>
            </motion.div>
            <motion.div
                variants={StaggerAnimate.parent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
            >
                <TimelineHeading>
                    <div className="flex gap-x-4 pb-2">
                        <span className="p-2 relative -left-0.5 bg-gradient-to-br from-base-700 to-base-800 rounded-xl h-fit border-t-[0.2px] border-l-[0.2px] border-zinc-700">
                            <NewJobIcon className="text-primary-400 size-4" />
                        </span>
                        <h2 className="text-lg font-medium">Experience</h2>
                    </div>
                </TimelineHeading>
                <TimelineItem>
                    <div className="">
                        <span className="flex gap-x-2 items-center">
                            <h2 className="text-lg">CV Listy Amal</h2>-
                            <p className="text-primary-400">2020 - 2021</p>
                        </span>
                        <p>Service and maintenance Air Conditioners</p>
                    </div>
                </TimelineItem>
                <TimelineItem>
                    <div className="">
                        <span className="flex gap-x-2 items-center">
                            <h2 className="text-lg">Freelancer</h2>-
                            <p className="text-primary-400">2021 - Present</p>
                        </span>
                        <ul className="list-outside list-disc ml-3 text-sm space-y-2 text-base-200 font-light">
                            <li>
                                <h2>
                                    <strong>Konda satu</strong>, September 2022
                                    - Desember 2022
                                </h2>
                                <p>
                                    Creating Konda Satu village website using
                                    express.js
                                </p>
                            </li>
                            <li>
                                <h2>
                                    <strong>Teknik Informatika</strong>, Mei
                                    2024 - Juni 2024
                                </h2>
                                <p>
                                    Creating a website for informatics
                                    engineering majors using laravel
                                </p>
                            </li>
                            <li>
                                <h2>
                                    <strong>Kowioha</strong>, Agustus 2024 -
                                    September 2024
                                </h2>
                                <p>
                                    Creating a kowioha village website using
                                    Laravel + Inertia + React
                                </p>
                            </li>
                        </ul>
                    </div>
                </TimelineItem>
            </motion.div>
        </div>
    );
}
