import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(req,res){
    if(req.method != 'GET'){ return NextResponse.json({message:"method not allowed"})}
    let gameId = await req.url.split("=")[1]
    
    let foundGames = await prisma.game.findFirst({
        where:{
            id:Number(gameId)
        }
    })
   
     if(!foundGames){ return  NextResponse.error()}
     return NextResponse.json(foundGames)
}
