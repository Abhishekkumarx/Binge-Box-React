import React, { useEffect } from "react";
import Footer from "../components/Footer";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, []);

  return (
    <div className="pt-24 p-6 min-h-screen bg-[--bg-light] dark:bg-[--bg-dark] text-[--text-light] dark:text-[--text-dark]">

     
    </div>
  );
}
