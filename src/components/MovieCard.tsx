import { MovieT } from '@/types'
import Image from 'next/image';
import React from 'react'

interface MovieCardProps {
  movie : MovieT;
}

const BASE_URL = 'https://image.tmdb.org/t/p/original/';

const MovieCard = ({ movie } : MovieCardProps) => {
  return (
    <div className='p-3 border-1 max-w-[230px] flex flex-col items-center gap-6'>
      <Image
        key={movie.id}
        width={200}
        height={300}
        alt={movie.title || movie.name || 'Movie poster'}
        src={`${BASE_URL}${movie.poster_path}`}
        className="rounded-lg"
      />
      <h1>{movie.title}</h1>
    </div>
  )
}

export default MovieCard