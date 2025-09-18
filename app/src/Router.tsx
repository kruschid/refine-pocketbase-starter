import { Authenticated, ErrorComponent } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/react-router";
import { IconBrandApple, IconBrandGoogle } from "@tabler/icons-react";
import { Outlet, Route, Routes } from "react-router";
import { Layout, Login } from "refine-mantine";
import { CategoryCreate } from "./pages/category/CategoryCreate";
import { CategoryEdit } from "./pages/category/CategoryEdit";
import { CategoryList } from "./pages/category/CategoryList";
import { CategoryShow } from "./pages/category/CategoryShow";
import { ProductCreate } from "./pages/product/ProductCreate";
import { ProductEdit } from "./pages/product/ProductEdit";
import { ProductList } from "./pages/product/ProductList";
import { ProductShow } from "./pages/product/ProductShow";
import { resources } from "./resources";

export const Router = () => (
  <Routes>
    <Route
      element={
        <Authenticated
          key="authenticated-inner"
          redirectOnFail={"/login"}
        >
          <Layout>
            <Outlet />
          </Layout>
        </Authenticated>
      }
    >
      <Route
        index
        element={<NavigateToResource resource={resources.product.name} />}
      />
      {/* product */}
      <Route
        path={resources.product.list}
        element={<ProductList />}
      />
      <Route
        path={resources.product.create}
        element={<ProductCreate />}
      />
      <Route
        path={resources.product.edit}
        element={<ProductEdit />}
      />
      <Route
        path={resources.product.show}
        element={<ProductShow />}
      />
      {/* category */}
      <Route
        path={resources.category.list}
        element={<CategoryList />}
      />
      <Route
        path={resources.category.create}
        element={<CategoryCreate />}
      />
      <Route
        path={resources.category.edit}
        element={<CategoryEdit />}
      />
      <Route
        path={resources.category.show}
        element={<CategoryShow />}
      />
      {/* client */}
      {/* segment */}
      {/* order */}
    </Route>
    <Route path={"/login"} element={
      <Login
        method="mfa"
        registerLink="/register"
        forgotPasswordLink="/forgot-password"
        providers={[{
          name: "google",
          label: "Continue with Google",
          icon: <IconBrandGoogle />,
          buttonProps: {
            variant: "light",
            color: "red",
          }
        }, {
          name: "apple",
          label: "Continue with Apple",
          icon: <IconBrandApple />,
          buttonProps: {
            variant: "light",
            color: "gray",
          }
        }]}
      />
    } />
    <Route path="*" element={<ErrorComponent />} />
  </Routes>
);
