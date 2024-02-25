import React from "react";
import Footer from "../components/footer/footer.jsx";
import Header from "../components/header/header.jsx";

export default function Layout({ children }) {
  return (
    <>
      <div className="content">
        <Header />
        <div id="root">{children}</div>
        <Footer />
      </div>
    </>
  );
}
