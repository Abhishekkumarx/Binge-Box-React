import React from 'react'

function Footer() {
  return (
     <footer
        className="w-full bg-black text-gray-300 py-4 bg-cover bg-center bg-no-repeat relative pt-20"
      >

        <h1 className='text-white'>BingeBox is a free TV shows streaming website with zero ads.
             It allows you to watch TV shows online, <b>watch TV shows online free in high quality for free.</b> 
              You can also download full TV shows and watch them later if you want.</h1>
              <h2>This site does not store any files on our server; we only link to the media hosted on 3rd party services.</h2>
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-5xl mx-auto flex items-center justify-center space-x-8 text-lg py-6">
        <a href="#" className="text-red-500 underline underline-offset-4">Home</a>
        <a href="#" className="hover:text-red-500 transition">Movies</a>
        <a href="#" className="hover:text-red-500 transition">TV Series</a>
        <a href="#" className="hover:text-red-500 transition">Contact Us</a>
        <a href="#" className="hover:text-red-500 transition">Terms of Service</a>
      </div>
    </footer>   
    
  )
}

export default Footer
