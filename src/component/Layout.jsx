import React from "react";
import { Outlet } from "react-router-dom"; // ⬅️ Page content yahaan render hoga
import Header from "./Header";
import AssuranceStrip from "./AssuranceStrip"; // ⬅️ Isko bhi layout mein daal dete hain
// import Footer from './Footer'; // (Agar aapke paas Footer hai)

export default function Layout() {
  return (
    <>
      <Header />
      
      {/* Page content (Home, Search, Login, etc.) yahaan Outlet ki jagah aayega */}
      <main>
        <Outlet />
      </main>

      {/* AssuranceStrip aur Footer sabhi pages par dikhenge */}
      <AssuranceStrip />
      {/* <Footer /> */}
    </>
  );
}
