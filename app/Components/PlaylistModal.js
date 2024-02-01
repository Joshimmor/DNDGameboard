"use client"
import React,{useState} from 'react'

export default function PlaylistModal({SetPlaylist,setAddPlayList,playlist}) {
    let [playlistID,SetID] = useState(playlist)
    let onChange = (e) => {
        SetID(e.target.value)
    }
    let sumbitChange = () =>{
        if(!playlistID) return
        SetPlaylist(playlistID)
        setAddPlayList(false)
    }
    let exit = () => {
        setAddPlayList(false)
    }
  return (
    <div className='fixed top-0 left-0 bg-slate-950 bg-opacity-70 w-screen h-screen flex justify-center items-center' onClick={exit}>
        <div className=' bg-slate-200 w-1/4 p-5 rounded-sm flex flex-col justify-center items-center'>
            <input  onChange={onChange} className='mt-5 block w-3/4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Enter playlist ID'/>
            <div className='mt-5 flex flex-row w-3/4 justify-end'>
            <button  onClick={sumbitChange} type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Submit</button>
            </div>
        </div>
        
    </div>
  )
}
