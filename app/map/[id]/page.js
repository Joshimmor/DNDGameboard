"use client"
import MasterDeck from '@/app/Components/MasterDeck'
import Block from '@/app/Components/Block'
import React, { useState} from 'react'

import "./Map.css"


export default function page() {

let [blocks,setBlocks]=useState([])
let [keyToggle,setKeyToggle] = useState()
const handlePress = (e) =>{
    if(!Number(e.key) && targ > blocks.length) return
    let targ = Number(e.key)
    let targetBlock = blocks[targ-1]
    targetBlock.visable = !targetBlock.visable
    let newBlockSet = [...blocks]
    newBlockSet[targ-1] = targetBlock
    setBlocks(newBlockSet)
}
  return (
    <section className='w-screen h-screen flex justify-center items-center '
    tabIndex="0"
    onKeyDown={handlePress}
    >

        <MasterDeck blocks={blocks} setBlocks={setBlocks} keyToggle={keyToggle}/>
        <div  className='w-screen h-screen z-2 '
     
            style={{
                backgroundImage:"url(/backdrop.png)",
                backgroundSize:"contain",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat",
            }}
        >
            {
                blocks.length > 0 ? blocks.map((n,i)=>{
                    return(
                        <Block key={i} visable={n.visable} name={n.name} posx={n.x} posy={n.y} />
                    )
                }):null
            }
        </div>
    </section>
  )
}

