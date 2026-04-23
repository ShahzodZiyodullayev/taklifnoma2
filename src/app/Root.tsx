import { Suspense, type JSX } from "react";
import { RouterProvider } from "react-router-dom";

import { Router } from "@/app/routing/app-router";
import { withProviders } from "@/app/providers";

const _Root = (): JSX.Element => {
  return (
    <Suspense fallback={<div className="app-loader">Taklifnoma yuklanmoqda</div>}>
      <RouterProvider router={Router()} />
    </Suspense>
  );
};

export const Root = withProviders(_Root);
