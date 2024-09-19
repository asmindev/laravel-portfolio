import { SentIcon } from "hugeicons-react";

import React from "react";

export default function Contact() {
    return (
        <div>
            <div className="border rounded-xl border-base-700/60 shadow-xl shadow-base-900 overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.974809065139!2d122.46818707939713!3d-4.048436734354761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d988d4d936d98fb%3A0xe124a34b63c89fb!2sBUMI%20ARUM%20RESIDENCE!5e0!3m2!1sen!2sid!4v1726211237688!5m2!1sen!2sid"
                    className="grayscale contrast-100 invert w-full h-96"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            <div className="w-full h-full my-12">
                <h2 className="text-2xl font-medium">Contact Form</h2>
                <form action="" onClick={(e) => e.preventDefault()}>
                    <div className="mt-4 flex flex-col lg:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            className="w-full p-3 border rounded-xl border-base-700/60 bg-base-700/20 text-base-50 placeholder-base-50"
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-xl border-base-700/60 bg-base-700/20 text-base-50 placeholder-base-50"
                        />
                    </div>
                    <div>
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Message"
                            className="w-full p-3 mt-4 border rounded-xl border-base-700/60 bg-base-700/20 text-base-50 placeholder-base-50"
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-fit flex gap-2 items-center px-8 py-3 border-t border-l rounded-xl border-base-700 bg-base-700/20 text-base-50 hover:bg-base-50 hover:text-base-900 transition-colors duration-100"
                        >
                            <span>
                                <SentIcon className="text-primary-400 size-6" />
                            </span>
                            <span>Submit</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
