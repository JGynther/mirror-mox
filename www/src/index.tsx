import "@css/index.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Layout from "@components/layout";

import Home from "@pages/home";
import { SingleCard, TwoCards } from "@pages/cardview";

import { useGetCardData, Database } from "@lib/database";

const Data = ({ children }: React.PropsWithChildren) => {
    const { isLoading, data } = useGetCardData();
    if (isLoading) return;
    if (!data) throw new Error();
    return <Database.Provider value={data}>{children}</Database.Provider>;
};

const router = createBrowserRouter([
    {
        element: (
            <Data>
                <Outlet />
            </Data>
        ),
        children: [
            {
                element: (
                    <Layout>
                        <Outlet />
                    </Layout>
                ),
                children: [{ path: "/", element: <Home /> }],
            },
            {
                element: (
                    <Layout hasSearch>
                        <Outlet />
                    </Layout>
                ),
                children: [
                    { path: "/cards/:slug", element: <SingleCard /> },
                    { path: "/cards/:parent/:child", element: <TwoCards /> },
                ],
            },
        ],
    },
]);

const rootEl = document.getElementById("root");

if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>,
    );
}
