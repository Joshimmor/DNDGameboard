"use client"
import MasterDeck from '@/app/Components/MasterDeck'
import Block from '@/app/Components/Block'
import React, { useEffect, useState} from 'react'

import "../map/[id]/Map.css"


export default function Map({gameid}) {
let [game,setGame] = useState({})
let [blocks,setBlocks]=useState([])
let [keyToggle,setKeyToggle] = useState()
useEffect(()=>{
    fetch("/api/games?id=1")
    .then(n => n.json())
    .then(n => setGame({
        map: n.map, 
        playlist: n.playlist
    }))
    .catch(err => console.log(err))
    fetch("/api/blocks?gameid=1")
    .then(n => n.json())
    .then(n => {
        let savedBlocks = []
        for(let i = 0; i < n.length ; i++){
            let blockValue ={
                blockId:n[i].id,
                height:n[i].height,
                width:n[i].width,
                x:n[i].x,
                y:n[i].y,
                visible:n[i].visible
            }
            savedBlocks.push(blockValue)
        }
        console.log(savedBlocks)
        setBlocks([...savedBlocks])
    })
    .catch( err => setBlocks([]))
},[gameid])


const handleDelete = () => {
    let invisibleBlocks =  blocks.filter(n=> n.visible == false)
    console.log(invisibleBlocks)
    fetch("/api/blocks",{
        method:"DELETE",
        body:JSON.stringify(invisibleBlocks)
    })
    .then(n => n.json())
    .then(n => console.log("DELETED"))
    .catch(err => console.log(err))
    setBlocks([...blocks.filter(n => n.visible == true)])
}
const handlePress = (e) =>{
    if(Number(e.keyCode)  == 46){
        handleDelete()
        return
    }
    if(Number(e.keyCode-65) > 0 && Number(e.keyCode-65) > blocks.length-1) return
    let targ = Number(e.keyCode - 65)
    let targetBlock = blocks[targ]
    targetBlock.visible = !targetBlock.visible
    let newBlockSet = [...blocks]
    newBlockSet[targ] = targetBlock
    setBlocks(newBlockSet)
}
let handleVisibility = (index) => {
    let block = blocks[index]
    block.visible = !block.visible
    let tempBlocks = [...blocks]
    tempBlocks[index] = block
    setBlocks(tempBlocks)
}
const increaseSize = (index) =>{
    let block = blocks[index]
    block.width = block.width + 1
    block.height = block.height + 1
    let tempBlocks = [...blocks]
    tempBlocks[index] = block
    setBlocks(tempBlocks)
}
const decreaseSize = (index) =>{
    if(blocks[index].width <= 5) return 
    let block = blocks[index]
    block.width = block.width - 1
    block.height = block.height - 1
    let tempBlocks = [...blocks]
    tempBlocks[index] = block
    setBlocks(tempBlocks)
}
const SetPosition = (index,x,y) => {
    let block = blocks[index]
    block.x = x
    block.y = y
    let tempBlocks = [...blocks]
    tempBlocks[index] = block
    setBlocks(tempBlocks)
}
  return (
    <section className='w-screen h-screen flex justify-center items-center '
    tabIndex="0"
    onKeyDown={handlePress}
    >

        <MasterDeck gameId={gameid} playlist={game.playlist} blocks={blocks} setBlocks={setBlocks} keyToggle={keyToggle}/>
        <div  className='w-screen h-screen z-2 '
     
            style={{
                backgroundImage:`url(${game.map})`,
                backgroundSize:"contain",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat",
            }}
        >
            {
                blocks.length > 0 ? blocks.map((n,i)=>{
                    return(
                        <Block key={i} gameId={gameid} blockId={n.blockId} visible={n.visible} width={n.width} height={n.height} posx={n.x} posy={n.y} index={i+1} handleVisibility={handleVisibility} increaseSize={increaseSize} decreaseSize={decreaseSize} SetPosition={SetPosition}/>
                    )
                }):null
            }
        </div>
    </section>
  )
}
