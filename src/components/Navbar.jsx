import React from 'react'

const Navbar = () => {
  const handleSearch = (e) => {
    const val = e.target.value
    console.log('Search:', val)
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white drop-shadow-sm">Notes</h1>
          </div>
          <div className="relative w-60">
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              className="w-full py-1.5 px-3 rounded-md text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
