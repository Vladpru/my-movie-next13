"use client";

import Header from "@/components/Header";
import { MovieT } from "@/types";
import axios from "axios";
import Image from "next/image";
import requests from "@/utils/request";
import { useEffect } from "react";

import { useState } from "react";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState<MovieT[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [API_KEY]);


  const titles = Object.values(requests).map((category) => category.title);

  return (
    <div className="pt-20">
      <Header />
      <ul className="max-w-[1000px] flex items-center justify-between py-10 mx-auto">
        {titles.map((title, index) => (
          <li
            key={index}
            className="cursor-pointer"
            // onClick={() => handleCategorySelect(title)}
          >
            {title}
          </li>
        ))}
      </ul>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie: MovieT) => (
          <div key={movie.id} className="flex justify-center items-center">
            <Link href={`/movie/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}