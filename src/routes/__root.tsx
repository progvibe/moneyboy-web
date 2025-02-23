import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{" "}
          <Link
            to="/about"
            activeProps={{
              className: "font-bold",
            }}
          >
            About
          </Link>
          <Link
            to="/transactions"
            activeProps={{
              className: "font-bold",
            }}
          >
            Transactions
          </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}
