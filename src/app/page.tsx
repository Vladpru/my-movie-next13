import Header from "@/components/Header";
import MovieTypes from "@/components/MovieTypes";
import { MovieT } from "@/types";
import axios from "axios";
import Image from "next/image";


export default async function Home() {

  const API_KEY = process.env.API_KEY
  const BASE_URL = 'https://image.tmdb.org/t/p/original'

  let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`
  const response = await axios.get(url);
  const movies: MovieT[] = response.data.results;

  return (
    <div className="pt-20">
      <Header />
      <MovieTypes />
      {movies.map((movie: MovieT) => (
        <Image
          key={movie.id}
          width={50}
          height={50}
          alt='fe'
          src={`${BASE_URL}${movie.poster_path}`}
        />
      ))}
    </div>
  );
}
