import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";

import tailwindStylesheetUrl from "~/styles/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <main className="relative min-h-screen bg-white sm:flex sm:items-start sm:justify-center">
          <div className="relative sm:pb-16">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-20">
                <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-4xl">
                  <Link to="/" className="block capitalize text-yellow-500">
                    Aston Martin Congiguration Parser
                  </Link>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center text-xl sm:max-w-3xl">
                  A utility tool to extract <Link className="text-yellow-500 hover:text-yellow-600" to="https://my.astnmrt.in/CFKOLIWSNF">Aston Martin configurator</Link> data in a structured comma-separated format given a Code.
                </p>
                <Outlet />
              </div>
            </div>
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
