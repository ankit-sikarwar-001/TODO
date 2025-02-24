// import React from 'react'

const Navbar = () => {
  return (
    <>
          <nav className="bg-slate-700 max-w-[100vw] px-5 h-[7vh] flex items-center justify-between text-lg text-amber-50 font-semibold">
              <div className="font-serif tracking-widest cursor-pointer text-[21px]">iTask</div>
            <ul className="flex gap-5 ">
                <li className="cursor-pointer hover:text-amber-300 hover:text-[19px] transition-all duration-100">Home</li>
                  <li className=" cursor-pointer hover:text-amber-300 hover:text-[19px] transition-all duration-100">Your tasks</li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar
