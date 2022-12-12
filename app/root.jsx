import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindStylesheetUrl from "./styles/tailwind.css";

export function meta() {
  return {
    charset: "utf-8",
    title: "DevFinder",
    viewport: "width=device-width,initial-scale=1",
  };
}

export function links() {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    {
      rel: "preload",
      href: "/Inter-roman.var.woff2?v=3.19",
      as: "font",
      type: "font/woff2",
      crossOrigin: "",
    },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
