"use client";

import Header from "@/components/Header";
import { MovieT } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import requests from "@/utils/request";

export default function Home() {
  const [movies, setMovies] = useState<MovieT[]>([]);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  // Fetch initial trending movies on component mount
  useEffect(() => {
    const fetchInitialMovies = async () => {
      const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`;
      try {
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching initial movies:", error);
      }
    };
    fetchInitialMovies();
  }, [API_KEY]);

  const handleCategorySelect = async (category: string) => {
    const selectedKey = Object.keys(requests).find(
      (key) => requests[key].title === category
    );

    if (selectedKey) {
      const url = requests[selectedKey].url;
      const fullUrl = `https://api.themoviedb.org/3${url}`;
      try {
        const response = await axios.get(fullUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
  };

  const titles = Object.values(requests).map((category) => category.title);

  return (
    <div className="pt-20">
      <Header />
      <ul className="max-w-[1000px] flex items-center justify-between py-10 mx-auto">
        {titles.map((title, index) => (
          <li
            key={index}
            className="cursor-pointer"
            onClick={() => handleCategorySelect(title)}
          >
            {title}
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movies.map((movie: MovieT) => (
          <Image
            key={movie.id}
            width={200}
            height={300}
            alt={movie.title || movie.name || "Movie poster"}
            src={`${BASE_URL}${movie.poster_path}`}
            className="rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}