import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthProvider/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ProtectedLayout } from "./components/ProtectedLayout/ProtectedLayout";
import { Login } from "./containers/Login/Login";
import { Home } from "./containers/Home/Home";
import { Register } from "./containers/Register/Register";
import { Product } from "./containers/Product/Product";
import { ProductType } from "./containers/ProductType/ProductType";
import { ProductCategoryList } from "./containers/ProductCategory/ProductCategoryList";
import { Search } from "./containers/Search/Search";
import { KartList } from "./containers/Kart/KartList";
import { Profile } from "./containers/Profile/Profile";
import { DropsList } from "./containers/Drops/DropsList";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/products/types/:type" element={<ProductType />} />
              <Route path="/products/search/:search" element={<Search />} />
              <Route path="/drops" element={<DropsList />} />
              <Route
                path="/products/categories/:id"
                element={<ProductCategoryList />}
              />{" "}
              <Route
                path="/profile/:type"
                element={
                  <ProtectedLayout isLogin={false}>
                    <Profile />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/kart"
                element={
                  <ProtectedLayout isLogin={false}>
                    <KartList />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectedLayout isLogin={true}>
                    <Login />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedLayout isLogin={true}>
                    <Register />
                  </ProtectedLayout>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
