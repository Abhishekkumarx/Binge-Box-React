import React, { useEffect } from "react";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, []);

  return (
    <div className="pt-24 text-white text-center p-6">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-300 text-lg max-w-3xl mx-auto">
        Welcome to BingeBox! We are a movie & series browsing platform built with 
        React and OMDB API. Our goal is to provide a simple and smooth user experience 
        for discovering your favorite movies and TV shows.
      </p>

      <p className="text-gray-400 text-sm mt-6">
        You will be redirected to the footer automatically.
      </p>
    </div>
  );
}
