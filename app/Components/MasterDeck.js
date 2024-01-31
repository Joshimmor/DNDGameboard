"use client"
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'

export default function MasterDeck({blocks,setBlocks,keyToggle}) {
    let [youtubeLinks ,setYoutube] = useState([])
    let [index,setIndex] = useState(0)

    let SetPlaylist = () => {
        fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=PLYnIbp1vpAu7nPlqOPjnHTP_hSqZ5pQLO&maxResults=50&key=${process.env.NEXT_PUBLIC_GOOGLE}`,
        {
            method: 'GET',
            mode: "cors",
        })
        .then( n => n.json())
        .then(n => setYoutube(n.items))
        .catch(err => setYoutube([]))
    }
    let handleClick = (e) =>{
        let rect = e.target.getBoundingClientRect()
        let x = e.pageX + 100
        let y = e.pageY 
        console.log(x,y)
        let start = {
            name:"Click to name",
            x:x,
            y:y,
            visable:true
        }
        setBlocks([...blocks,start])
        e.preventDefault()
    }
    let handleVisiblity = (visable,index) =>{
        let updatedblocks = []
        for(let i = 0; i < blocks.length; i++){
            let block = {...blocks[i]}
            if(i == index){
                block.visable = !visable
            }
            updatedblocks.push(block)
        } 
        setBlocks(updatedblocks)
    }
    const handlePress = (e) =>{
        let targ = e.key
        console.log(e.key)
    }
    useEffect(()=>{
        if(keyToggle  && keyToggle <= blocks.length){
            handleVisiblity(blocks[keyToggle-1].visable,keyToggle-1)
        }
    },[keyToggle,handleVisiblity,blocks])
  return (
    <div className={`absolute top-0 left-0  rounded-md  w-[5vw] h-[100vh] flex flex-col justify-between`}

        style={{
            transition:"all 100ms ease-in"
        }}
    >
        <div className='z-10  flex flex-col justify-start'> 
        {/* <button className=" mt-5 text-slate-900 font-bold border-1 border-slate-600 py-5 hover:bg-slate-900 hover:text-slate-200" onClick={()=>setVisable(!visable)}>&lt;</button> */}
        <button className="flex justify-center items-center mt-5 text-slate-900 font-bold border-1 border-slate-600 py-2  hover:bg-slate-900 hover:text-slate-200 " onClick={handleClick}>
        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.3116 12.6473L20.8293 10.7154C21.4335 8.46034 21.7356 7.3328 21.5081 6.35703C21.3285 5.58657 20.9244 4.88668 20.347 4.34587C19.6157 3.66095 18.4881 3.35883 16.2331 2.75458C13.978 2.15033 12.8504 1.84821 11.8747 2.07573C11.1042 2.25537 10.4043 2.65945 9.86351 3.23687C9.27709 3.86298 8.97128 4.77957 8.51621 6.44561C8.43979 6.7254 8.35915 7.02633 8.27227 7.35057L8.27222 7.35077L7.75458 9.28263C7.15033 11.5377 6.84821 12.6652 7.07573 13.641C7.25537 14.4115 7.65945 15.1114 8.23687 15.6522C8.96815 16.3371 10.0957 16.6392 12.3508 17.2435L12.3508 17.2435C14.3834 17.7881 15.4999 18.0873 16.415 17.9744C16.5152 17.9621 16.6129 17.9448 16.7092 17.9223C17.4796 17.7427 18.1795 17.3386 18.7203 16.7612C19.4052 16.0299 19.7074 14.9024 20.3116 12.6473Z" stroke="#1C274C" strokeWidth="1.5"></path> <path opacity="0.5" d="M16.415 17.9741C16.2065 18.6126 15.8399 19.1902 15.347 19.6519C14.6157 20.3368 13.4881 20.6389 11.2331 21.2432C8.97798 21.8474 7.85044 22.1495 6.87466 21.922C6.10421 21.7424 5.40432 21.3383 4.86351 20.7609C4.17859 20.0296 3.87647 18.9021 3.27222 16.647L2.75458 14.7151C2.15033 12.46 1.84821 11.3325 2.07573 10.3567C2.25537 9.58627 2.65945 8.88638 3.23687 8.34557C3.96815 7.66065 5.09569 7.35853 7.35077 6.75428C7.77741 6.63996 8.16368 6.53646 8.51621 6.44531" stroke="#1C274C" strokeWidth="1.5"></path> <path d="M11.7769 10L16.6065 11.2941" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path opacity="0.5" d="M11 12.8975L13.8978 13.6739" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
        </button>
        {
            blocks.length > 0 ? blocks.map((n,i) =>{
            return(
                <button 
                    onClick={()=>handleVisiblity(n.visable,i)}
                    key={i}
                    className="flex justify-center items-center text-slate-900 font-bold border-1 border-slate-600 py-5 hover:bg-slate-900 hover:text-slate-200">
                    <svg width="85px" height="85px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="2" stroke="#1C274C" strokeWidth="1.5"></circle> <path d="M12 10C17 10 16.6 22 9 22" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M12.3115 14C7.31152 14 7.71152 2 15.3115 2" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path opacity="0.5" d="M10.6313 10.6961C14.1669 7.16053 22.3693 15.9287 16.9953 21.3027" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" stroke-dasharray="2 2"></path> <path opacity="0.5" d="M13.6802 13.3039C10.1447 16.8395 1.94222 8.07135 7.31623 2.69734" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" stroke-dasharray="2 2"></path> <path opacity="0.5" d="M10.8516 13.5242C7.31605 9.98865 16.0842 1.78622 21.4582 7.16023" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" stroke-dasharray="2 2"></path> <path opacity="0.5" d="M13.4599 10.4758C16.9955 14.0113 8.22736 22.2138 2.85334 16.8398" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" stroke-dasharray="2 2"></path> <path d="M10 12.3115C10 7.31152 22 7.71152 22 15.3115" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M14 12C14 17 2 16.6 2 9" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                    {/* <h3
                    style={{
                        transform:"rotate(90deg)"
                    }}
                    >
                        {i+1}
                    </h3>  */}
                </button>
            )}):null
        }
                    
        </div>
        <div className='z-10  w-full flex flex-col justify-start'>
             <button className="flex justify-center items-center mt-5 text-slate-900 font-bold border-1 border-slate-600 py-2  hover:bg-slate-900 hover:text-slate-200 "  >
             <svg width="84px" height="84px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M16 4.00195C18.175 4.01406 19.3529 4.11051 20.1213 4.87889C21 5.75757 21 7.17179 21 10.0002V16.0002C21 18.8286 21 20.2429 20.1213 21.1215C19.2426 22.0002 17.8284 22.0002 15 22.0002H9C6.17157 22.0002 4.75736 22.0002 3.87868 21.1215C3 20.2429 3 18.8286 3 16.0002V10.0002C3 7.17179 3 5.75757 3.87868 4.87889C4.64706 4.11051 5.82497 4.01406 8 4.00195" stroke="#1C274C" stroke-width="1.5"></path> <path d="M8 14H16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M7 10.5H17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M9 17.5H15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z" stroke="#1C274C" stroke-width="1.5"></path> </g></svg>
            </button>
            <button className="flex justify-center items-center mt-5 text-slate-900 font-bold border-1 border-slate-600 py-2  hover:bg-slate-900 hover:text-slate-200 "  onClick={()=>index > 0 ?setIndex(index-1):setIndex(youtubeLinks.length-1)} >
            <svg width="85px" height="85px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 15L12 9L5 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </button>
            <ReactPlayer
            className=""
            style={{
                opacity:"50%",
                transform:"rotate(90deg)"
            }}  
            height={"150px"} 
            width={"150px"} 
            url={`https://www.youtube.com/watch?v=${youtubeLinks.length>0?youtubeLinks[index].contentDetails.videoId:null}`} />
            <button className=" flex justify-center items-center mb-5 text-slate-900 font-bold border-1 border-slate-600 py-2  hover:bg-slate-900 hover:text-slate-200 " onClick={()=>index < youtubeLinks.length ? setIndex(index+1):setIndex(0)}>
            <svg width="85px" height="85px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 9L12 15L5 9" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </button>
        </div>
    </div>
  )
}
