import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(req,res){
    if(req.method != 'GET'){ return NextResponse.json({message:"method not allowed"})}
    let gameId = await req.url.split("=")[1]
    console.log(gameId)
    let foundBlocks = await prisma.block.findMany({
        where:{
            gameid:Number(gameId)
        }
    })
   
     if(!foundBlocks){ return  NextResponse.error()}
     return NextResponse.json(foundBlocks)
}

export async function PUT (req){
    if(req.method != 'PUT'){ return NextResponse.json({message:"method not allowed"})}
    const sentBlocks = await req.json()
    console.log(sentBlocks)
    const transaction = await prisma.$transaction(
        sentBlocks.map((n) =>
          prisma.block.update({
            where: { id: n.blockId },
            data:{
                x: n.x,
                y:n.y,
                width:n.width,
                height: n.height,
                visible:n.visible
            },
          })
        )
      );
      return NextResponse.json(transaction);
     
}
export async function POST (req){
    if(req.method != 'POST'){ return NextResponse.json({message:"method not allowed"})}
    const sentBlock = await req.json()
        console.log(sentBlock)
        let newBlock = await prisma.block.create({
            data:{
                x: Number(sentBlock.x),
                y:Number(sentBlock.y),
                width:Number(sentBlock.width),
                height: Number(sentBlock.height),
                visible:true,
                gameid: Number(sentBlock.gameid)
            }
        })
        if(!newBlock){ return NextResponse.error()}
        return NextResponse.json(newBlock)
}
export async function DELETE (req){
    if(req.method != 'DELETE'){ return NextResponse.json({message:"method not allowed"})}
    const sentBlocks = await req.json()
    let idsToDelete = []
    for(let i = 0 ; i < sentBlocks.length;i++){
        idsToDelete.push(Number(sentBlocks[i].blockId))
    }
    console.log(idsToDelete)
    const transaction = await prisma.block.deleteMany({
            where:{
                id: {
                    in: idsToDelete
                }   
            }
          })


      return NextResponse.json(transaction);
}