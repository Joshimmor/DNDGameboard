import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(req,res){
    if(req.method != 'GET'){ return NextResponse.json({message:"method not allowed"})}
    let userID = await req.url.split("=")[1]
    
    let foundGames = await prisma.game.findMany({
        where:{
            userId:Number(userID)
        }
    })
   
     if(!foundGames){ return  NextResponse.error()}
     return NextResponse.json(foundGames)
}

export async function POST (req){
    if(req.method != 'POST'){ return NextResponse.json({message:"method not allowed"})}
    const sentUser = await req.json()
    let foundUser = await prisma.users.findFirst({
        where:{
            username: sentUser.username,
            password: sentUser.password
        }
    })
     if(!foundUser){ return NextResponse.error()}
     return NextResponse.json(foundUser)
}