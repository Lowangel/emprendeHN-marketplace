import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Catalog } from "./pages/Catalog";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { About } from "./pages/about";
import { ProviderDashboard } from "./pages/provider/Dashboard";
import { ProviderProducts } from "./pages/provider/Products";
import { ProviderSales } from "./pages/provider/Sales";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminUsers } from "./pages/admin/Users";
import { AdminProducts } from "./pages/admin/Products";
import { AdminOrders } from "./pages/admin/Orders";
import { Layout } from "./components/Layout";
import { Providers } from "./pages/Providers.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      {
        path: "catalog", Component: Catalog,

      },
      { path: "about", Component: About },
      {
        path: "providers", Component: Providers,
        children: [
          { index: true, Component: ProviderDashboard },
          { path: "products", Component: ProviderProducts },
          { path: "sales", Component: ProviderSales },
        ],
      },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/provider",
    Component: Layout,
    children: [
      { index: true, Component: ProviderDashboard },
      { path: "products", Component: ProviderProducts },
      { path: "sales", Component: ProviderSales },
    ],
  },
  {
    path: "/admin",
    Component: Layout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "users", Component: AdminUsers },
      { path: "products", Component: AdminProducts },
      { path: "orders", Component: AdminOrders },
    ],
  },
]);
