import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateComponent from "./components/PrivateComponent";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductListing from "./components/ProductListing";
import UpdateProduct from "./components/UpdateProduct";
import ProfileDetails from "./components/ProfileDetails";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductListing />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:productid" element={<UpdateProduct />} />
            <Route path="/profile" element={<ProfileDetails/>} />
            <Route path="/logout" element={<h1>Logout</h1>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
