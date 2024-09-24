import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Github01Icon, LinkSquare01Icon } from "hugeicons-react";

const Card = ({ project }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="relative w-full h-48 md:h-40 rounded-xl overflow-hidden group border border-base-700/20 shadow-xl shadow-base-900">
                    <img
                        loading={"lazy"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200"
                        src={`/storage/${project.image}`}
                        alt={project.name}
                    />
                    <div className="absolute inset-0 w-full h-full bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <div className="w-full h-full flex justify-center items-center">
                            <h1 className="text-lg font-bold text-primary-400">
                                {project.name}
                            </h1>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 w-11/12 h-fit mx-auto rounded-xl bg-base-700/40 backdrop-blur-xl border border-base-700/50 text-white overflow-hidden">
                <DialogHeader className={"relative h-fit overflow-hidden"}>
                    <img
                        className="w-full h-32 object-cover"
                        src={`/storage/${project.image}`}
                        alt={project.name}
                    />
                    <div className="absolute -top-1.5 left-0 w-full h-full bg-black/30">
                        <div className="w-full h-full flex justify-center items-center">
                            <DialogTitle className="text-lg font-bold">
                                {project.name}
                            </DialogTitle>
                        </div>
                    </div>
                </DialogHeader>
                <DialogDescription className="p-4 h-fit">
                    <div className="h-fit flex flex-col justify-between">
                        <div className="flex-1 h-fit">
                            <p className="text-base-200">
                                {project.description}
                            </p>
                        </div>
                        <div className="mt-4 h-fit flex justify-between gap-x-2 text-base-100">
                            <div className="">
                                <ul className="flex justify-between gap-x-1 text-[10px]">
                                    {project.stacks.map((stack, index) => (
                                        <li
                                            key={index}
                                            className="block px-2.5 py-[0.1px] rounded-xl bg-gradient-to-bl from-primary-400 to-primary-600 capitalize"
                                        >
                                            {stack}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-fit flex justify-end gap-x-1">
                                <ul className="flex justify-between gap-x-1 text-[10px]">
                                    {project.repository && (
                                        <li>
                                            <a
                                                className="px-2.5 py-[0.1px] rounded-xl border border-base-700 flex items-center gap-x-1"
                                                href={project.repository}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Github01Icon
                                                    className="size-3 fill-black text-white"
                                                    strokeWidth={2}
                                                />
                                                <span>Github</span>
                                            </a>
                                        </li>
                                    )}

                                    {project.homepage && (
                                        <li>
                                            <a
                                                className="px-2.5 py-[0.1px] rounded-xl border border-base-700 flex items-center gap-x-1"
                                                href={project.homepage}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <LinkSquare01Icon
                                                    className="size-3"
                                                    strokeWidth={1.5}
                                                />
                                                <span>Open</span>
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default function Projects({ projects }) {
    return (
        <div className="w-full h-full">
            <div className="my-4">
                <h2 className="text-lg">Some Project are listed below</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                {projects.map((project, index) => (
                    <Card key={index} project={project} />
                ))}
            </div>
        </div>
    );
}
