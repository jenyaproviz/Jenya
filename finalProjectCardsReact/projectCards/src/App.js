import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/NavigationBar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import About from "./Components/About";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Logout from "./Components/Logout";
import BizSignup from "./Components/BizSignup";
import CreateCard from "./Components/CreateCard";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import ProtectedRoute from "./Components/ComponentsCommon/protectedRoute";
import MyCards from "./Components/MyCards";
import EditCard from "./Components/EditCard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <header>
        <Navbar user={user} />
      </header>
      <main style={{ minHeight: 900 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route
            path="/my-cards"
            element={<ProtectedRoute element={<MyCards />} biz={true} />}
          />
          <Route
            path="/my-cards/edit/:id"
            element={<ProtectedRoute element={<EditCard />} biz={true} />}
          />
          <Route
            path="/create-card"
            element={<ProtectedRoute element={<CreateCard />} biz={true} />}
          />
          <Route
            path="/biz-signup"
            element={<ProtectedRoute component={<BizSignup />} />}
          />
          <Route
            path="/logout"
            element={<ProtectedRoute element={<Logout />} />}
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}

export default App;
