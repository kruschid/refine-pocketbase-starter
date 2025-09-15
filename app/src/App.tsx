import {
  Authenticated,
  AuthPage,
  ErrorComponent,
  Refine,
  type ResourceProps,
} from "@refinedev/core";
import {
  HeadlessCreateInferencer,
  HeadlessEditInferencer,
  HeadlessListInferencer,
  HeadlessShowInferencer,
} from "@refinedev/inferencer/headless";
import routerBindings, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import {
  type AuthOptions,
  authProvider,
  dataProvider,
  liveProvider,
} from "refine-pocketbase";
import { renderPath, template } from "typesafe-routes";
import { CustomPage } from "./pages/custom/CustomPage";
import { Collections } from "./pocketbase.generated";
import { r } from "./routes";
import { pb } from "./utils/pocketbase";

const authOptions: AuthOptions = {
  registerRedirectTo: renderPath(r.login, {}),
  loginRedirectTo: renderPath(r.orgs, {}),
  updatePasswordRedirectTo: renderPath(r.login, {}),
};

const providers = {
  dataProvider: dataProvider(pb),
  liveProvider: liveProvider(pb),
  authProvider: authProvider(pb, authOptions),
};

const resources: ResourceProps[] = [
  {
    name: Collections.Orgs,
    list: template(r.orgs),
    create: template(r.orgs.create),
    edit: template(r.orgs.edit),
    show: template(r.orgs.show),
    meta: {
      canDelete: true,
    },
  },
];

export const App = () => (
  <BrowserRouter>
    <Refine
      {...providers}
      routerProvider={routerBindings}
      resources={resources}
      options={{
        liveMode: "auto",
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
      }}
    >
      <Routes>
        <Route
          element={
            <Authenticated
              key="authenticated-inner"
              redirectOnFail={renderPath(r.login, {})}
            >
              <Outlet />
            </Authenticated>
          }
        >
          <Route
            index
            element={<NavigateToResource resource={Collections.Orgs} />}
          />
          <Route index path={template(r.custom)} element={<CustomPage />} />
          <Route path={template(r.orgs)}>
            <Route
              index
              element={<HeadlessListInferencer resource={Collections.Orgs} />}
            />
            <Route
              path={template(r.orgs._.create)}
              element={<HeadlessCreateInferencer resource={Collections.Orgs} />}
            />
            <Route
              path={template(r.orgs._.edit)}
              element={<HeadlessEditInferencer resource={Collections.Orgs} />}
            />
            <Route
              path={template(r.orgs._.show)}
              element={<HeadlessShowInferencer resource={Collections.Orgs} />}
            />
          </Route>
        </Route>
        <Route
          path={template(r.register)}
          element={<AuthPage type="register" />}
        />
        <Route path={template(r.login)} element={<AuthPage type="login" />} />
        <Route
          path={template(r.forgotPassword)}
          element={<AuthPage type="forgotPassword" />}
        />
        <Route
          path={template(r.updatePassword)}
          element={<AuthPage type="updatePassword" />}
        />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </Refine>
  </BrowserRouter>
);
