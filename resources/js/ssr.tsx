import "core-js/stable";
import { createInertiaApp } from "@inertiajs/react";
import { renderToString } from "react-dom/server";

async function renderApp(page: any) {
  return await createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
      return pages[`./pages/${name}.tsx`];
    },
    setup: ({ App, props }) => <App {...props} />,
  });
}

// @ts-ignore
globalThis.renderApp = renderApp;

// @ts-ignore
globalThis.window = undefined;
