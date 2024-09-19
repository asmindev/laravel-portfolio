import React from "react";

/**
 * The default layout for the application.
 *
 * @param {React.ReactNode} children The page content
 * @param {string} [className] Additional classes for the layout container
 * @returns {React.ReactElement} The component
 */
export default function Layout({ children }) {
    return (
        <div className="w-full flex flex-col justify-center min-h-screen">
            <div className="w-full h-full md:w-11/12 lg:w-10/12 mx-auto md:p-4 lg:p-6 rounded-3xl min-h-[90vh] bg-base-800/5 text-white">
                {children}
            </div>
        </div>
    );
}
