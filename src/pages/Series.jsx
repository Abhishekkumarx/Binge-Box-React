// src/pages/Series.jsx
import React, { useEffect, useState } from "react";

const apiKey = "875daaf7";

export default function Series() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=game&type=series`; 
    // "game" is just default search keyword. You can change it.

    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") setSeries(data.Search);
    setLoading(false);
  };

  if (loading) return <p className="text-white text-center">Loading Series...</p>;

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Popular Series</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {series.map((item) => (
          <div key={item.imdbID} className="bg-gray-800 p-3 rounded-lg">
            <img src={item.Poster} alt={item.Title} className="rounded-md mb-2" />
            <p className="font-semibold">{item.Title}</p>
            <p className="text-sm text-gray-400">{item.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
