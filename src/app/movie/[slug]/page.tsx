import React from 'react'

interface Props {
  params: {
    slug: string
  }
}

export default async function Movie(props : Props) {
  return (
    <div>Movie</div>
  )
}
