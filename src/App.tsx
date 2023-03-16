import { Outlet } from "react-router-dom";

import "react-toastify/dist/ReactToastify.min.css";

import { ToastContainer } from "react-toastify";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { NavbarMobile } from "./components/Navbar/NavbarMobile";

function App() {
  return (
    <div className="bg-neutral-100">
      <Navbar />
      <NavbarMobile />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
