import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import rootReducers from "./store/reducer/index";
import {legacy_createStore as createStore} from "redux";
import {Provider} from "react-redux";
import Profile from "./components/Profile";
import AddProduct from "./components/products/AddProduct";
import Buy from "./components/products/Buy";
import EditProduct from "./components/products/EditProduct";
import Product from "./components/products/product";
import Sell from "./components/products/Sell";
import ErrorPage from "./components/ErrorPage";



const store = createStore(rootReducers);

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/update/:pId" element={<EditProduct />} />
        <Route path="/product/:pId" element={<Product />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;