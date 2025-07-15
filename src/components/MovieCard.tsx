import { MovieT } from '@/types'
import Image from 'next/image';
import React from 'react'

interface MovieCardProps {
  movie : MovieT;
}

const BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie } : MovieCardProps) => {
  return (
    <div className='p-3 border-1'>
      <Image
        key={movie.id}
        width={200}
        height={300}
        alt={movie.title || movie.name || 'Movie poster'}
        src={`${BASE_URL}${movie.poster_path}`}
        className="rounded-lg"
      />
    </div>
  )
}

export default MovieCard