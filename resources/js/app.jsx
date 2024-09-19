import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
// import "@splidejs/react-splide/css";

createInertiaApp({
    resolve: (name) => {
        name = name.replace(/\./g, "/");
        const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
        return pages[`./pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
