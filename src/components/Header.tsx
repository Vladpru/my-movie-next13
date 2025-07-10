import Link from 'next/link'

const Header = () => {
  return (
    <header className='p-6 fixed top-0 border-b w-full backdrop-blur z-50'>
      <nav className='flex justify-between'>
        <Link href='/'>
          <h1 className='text-2xl'>My Movie</h1>
        </Link>
        <Link href='/'>
          <h1 className='text-xl'>About</h1>
        </Link>
        <div className="flex gap-10 items-center">
          <input type="search" name="" id="" className='border-2 rounded-md px-2' placeholder='Search movie'/>
          <Link href='/'>
            <p>My Favorites</p>
          </Link>
          <Link href='/'>
            <p>Sign in</p>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header