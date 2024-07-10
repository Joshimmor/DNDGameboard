"use client"
import React, {useEffect, useState} from 'react'
import Link from 'next/link'

export default function page({params}) {
  let [games,setGames] = useState([])
  let [selected,setSelected] = useState(null)
  let [open,setSideBar] = useState(false)
  useEffect(()=>{
        fetch("/api/users?id=" + params.id)
        .then(n => n.json())
        .then(n => setGames(n))
        
    },[params])
  const selectGame = (index) => {
    setSelected(games[index])
    if(!open) toggleDrawer()
  }
  const toggleDrawer = () =>{
    setSideBar(!open)
  }
  return (
    <div className="bg-gray-100">

    <div className="h-screen flex overflow-hidden bg-gray-200">
        
        <div className={`${open?null:"-translate-x-full"} absolute bg-gray-800 text-white w-1/3 min-h-screen overflow-y-auto transition-transform transform  ease-in-out duration-300`}
            id="sidebar">
           
            <div className="p-4">
                {/* <h1 className="text-2xl font-semibold">{selected?selected.id:null}</h1> */}
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Map URL
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={selected?selected.map:"Enter map url"}/>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Youtube Playlist ID
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={selected?selected.playlist:"Enter just the ID of the playlist"}/>
                    </div>

                    <div className="flex items-center justify-end">
                    <button className="m-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                       Save
                      </button>
                      <button className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                       Play
                      </button>
                     
                    </div>
                  </form>
            </div>
        </div>

      
        <div className="flex-1 flex flex-col overflow-hidden">
            
            <div className="bg-white shadow">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center py-4 px-2">
                        <h1 className="text-xl text-gray-900 font-semibold"></h1>

                        <button className="text-gray-500 hover:text-gray-600" id="open-sidebar" onClick={toggleDrawer}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    </div>
                </div>
            </div>
            
            <div className='flex row flex-wrap w-full'>
                  {games.map((game,i) => {
                      
                      return(
                      <div key={i} href={`/map/${game.id}`} className='m-2 w-1/4 h-[25vh] bg-white' style={{backgroundImage:`url(${game.map})`,backgroundSize: 'cover',
                      backgroundPosition: 'center'}} onClick={()=>selectGame(i)}>
                        
                      </div>
                  )
                  })}
            </div>
        </div>
    </div>



</div>
  )
}
