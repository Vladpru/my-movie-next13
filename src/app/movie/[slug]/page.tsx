import axios from 'axios';
import React from 'react'

interface Props {
  params: {
    slug: string
  }
}

export default async function MoviePage(movie_id : Props) {

  const getMovieBySlug = async (id : string) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
      const response = await axios.get(url);
      const movie = response.data;
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div>
      
    </div>
  )
}
