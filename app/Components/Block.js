"use client"
import React, { useEffect, useState,useRef } from 'react'

export default function  Block ({posx,posy,name,visable,index})  {


    let [naming,setNaming] = useState(false)
    let [blockInfo, setBlockInfo] = useState({
        name:name,
        x:posx,
        y:posy,
        visable:visable
    })
    useEffect(()=>{
        setBlockInfo({
            name:name,
            x:posx,
            y:posy,
            visable:visable
        })
    },[posx,posy,name,visable,setBlockInfo])
    const elemRef = useRef(null)
    const dragProps = useRef()
    const [size,setSize] = useState({
        w:20,
        h:20
    })
    const initialiseDrag = event => {
      const { target, clientX, clientY } = event
      const { offsetTop, offsetLeft } = target
      const { left, top } = elemRef.current.getBoundingClientRect()
      
      dragProps.current = {
        dragStartLeft: left - offsetLeft,
        dragStartTop: top - offsetTop,
        dragStartX: clientX,
        dragStartY: clientY
      }
      window.addEventListener('mousemove', startDragging, false)
      window.addEventListener('mouseup', stopDragging, false)
    }
    
    
    const startDragging = ({ clientX, clientY }) => {    
      elemRef.current.style.transform = `translate(${dragProps.current.dragStartLeft + clientX - dragProps.current.dragStartX}px, ${dragProps.current.dragStartTop + clientY - dragProps.current.dragStartY}px)`
    } 
  
    const stopDragging = () => {
      window.removeEventListener('mousemove', startDragging, false)
      window.removeEventListener('mouseup', stopDragging, false)
    }
    const increaseSize = (e) =>{
        let w = size.w+1
        let h = size.h+1
        console.log(w,h)
        setSize({
            w:w,
            h:h
        })
    }
    const decreaseSize = (e) =>{
        if(size.w <= 5) return 
        let w = size.w-1
        let h = size.h-1
        console.log(w,h)
        setSize({
            w:w,
            h:h
        })
    }
    const setOp = () =>{
        setBlockInfo({...blockInfo,visable:!blockInfo.visable})
    }
    const handNameChange = (e) => {
       setBlockInfo({...blockInfo,name:e.target.value})
    }
    return (
      <div
        onMouseDown={initialiseDrag}
        ref={elemRef}
        className={`absolute bg-slate-950  ${blockInfo.visable?'bg-opacity-100':'bg-opacity-0'} flex flex-col justify-center items-center p-5`}
        style={{
            // transition:"all 35ms ease-in",
            width:`${size.w}vw`,
            height:`${size.h}vw`,
            top:`${blockInfo.y}px`,
            left:`${blockInfo.x}px`
        }}   
        >
            <div className='flex flex-row w-full justify-between items center'>
                    <button className='opacity-20 w-1/3 text-slate-600  py-2 px-4 mt-3 font-bold border-1 border-slate-600 p-5 hover:bg-slate-900 hover:text-slate-200' onClick={increaseSize}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="11" cy="11" r="9" stroke="#8E93A6" strokeWidth="1.5"></circle> <path d="M9 11H11M11 11H13M11 11V13M11 11V9" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M21.812 20.9748C21.7493 21.0695 21.636 21.1828 21.4094 21.4094C21.1828 21.636 21.0695 21.7493 20.9748 21.812C20.4202 22.1793 19.6699 21.99 19.3559 21.4036C19.3023 21.3035 19.2563 21.15 19.1643 20.843C19.0638 20.5076 19.0136 20.3398 19.0038 20.2218C18.9466 19.5268 19.5268 18.9466 20.2218 19.0038C20.3398 19.0136 20.5075 19.0638 20.843 19.1643C21.15 19.2563 21.3035 19.3023 21.4036 19.3559C21.99 19.6699 22.1793 20.4202 21.812 20.9748Z" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                    </button>
                    <button className='opacity-20 w-1/3 text-slate-600  py-2 px-4 mt-3  font-bold border-1 border-slate-600 p-5 hover:bg-slate-900 hover:text-slate-200' onClick={setOp}>
                    {blockInfo.visable?
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M10 22C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 18.7712 2 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path opacity="0.5" d="M22 15C22 18.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path opacity="0.5" d="M14 2C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 5.22876 22 9" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path opacity="0.5" d="M10 2C6.22876 2 4.34315 2 3.17157 3.17157C2 4.34315 2 5.22876 2 9" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M5.89243 14.0598C5.29748 13.3697 5 13.0246 5 12C5 10.9754 5.29747 10.6303 5.89242 9.94021C7.08037 8.56222 9.07268 7 12 7C14.9273 7 16.9196 8.56222 18.1076 9.94021C18.7025 10.6303 19 10.9754 19 12C19 13.0246 18.7025 13.3697 18.1076 14.0598C16.9196 15.4378 14.9273 17 12 17C9.07268 17 7.08038 15.4378 5.89243 14.0598Z" stroke="#1C274C" strokeWidth="1.5"></path> <circle cx="12" cy="12" r="2" stroke="#1C274C" strokeWidth="1.5"></circle> </g></svg>
                    :
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.68936 6.70456C2.52619 6.32384 2.08528 6.14747 1.70456 6.31064C1.32384 6.47381 1.14747 6.91472 1.31064 7.29544L2.68936 6.70456ZM15.5872 13.3287L15.3125 12.6308L15.5872 13.3287ZM22.6894 7.29544C22.8525 6.91472 22.6762 6.47381 22.2954 6.31064C21.9147 6.14747 21.4738 6.32384 21.3106 6.70456L22.6894 7.29544ZM19 11.1288L18.4867 10.582V10.582L19 11.1288ZM12 13.25C8.77611 13.25 6.46133 11.6446 4.9246 9.98966C4.15645 9.16243 3.59325 8.33284 3.22259 7.71014C3.03769 7.3995 2.90187 7.14232 2.8134 6.96537C2.76919 6.87696 2.73689 6.80875 2.71627 6.76411C2.70597 6.7418 2.69859 6.7254 2.69411 6.71533C2.69187 6.7103 2.69036 6.70684 2.68957 6.70503C2.68917 6.70413 2.68896 6.70363 2.68892 6.70355C2.68891 6.70351 2.68893 6.70357 2.68901 6.70374C2.68904 6.70382 2.68913 6.70403 2.68915 6.70407C2.68925 6.7043 2.68936 6.70456 2 7C1.31064 7.29544 1.31077 7.29575 1.31092 7.29609C1.31098 7.29624 1.31114 7.2966 1.31127 7.2969C1.31152 7.29749 1.31183 7.2982 1.31218 7.299C1.31287 7.30062 1.31376 7.30266 1.31483 7.30512C1.31698 7.31003 1.31988 7.31662 1.32353 7.32483C1.33083 7.34125 1.34115 7.36415 1.35453 7.39311C1.38127 7.45102 1.42026 7.5332 1.47176 7.63619C1.57469 7.84206 1.72794 8.13175 1.93366 8.47736C2.34425 9.16716 2.96855 10.0876 3.8254 11.0103C5.53867 12.8554 8.22389 14.75 12 14.75V13.25ZM15.3125 12.6308C14.3421 13.0128 13.2417 13.25 12 13.25V14.75C13.4382 14.75 14.7246 14.4742 15.8619 14.0266L15.3125 12.6308ZM22 7C21.3106 6.70456 21.3107 6.70441 21.3108 6.70427C21.3108 6.70423 21.3108 6.7041 21.3109 6.70402C21.3109 6.70388 21.311 6.70376 21.311 6.70368C21.3111 6.70352 21.3111 6.70349 21.3111 6.7036C21.311 6.7038 21.3107 6.70452 21.3101 6.70576C21.309 6.70823 21.307 6.71275 21.3041 6.71924C21.2983 6.73223 21.2889 6.75309 21.2758 6.78125C21.2495 6.83757 21.2086 6.92295 21.1526 7.03267C21.0406 7.25227 20.869 7.56831 20.6354 7.9432C20.1669 8.69516 19.4563 9.67197 18.4867 10.582L19.5133 11.6757C20.6023 10.6535 21.3917 9.56587 21.9085 8.73646C22.1676 8.32068 22.36 7.9668 22.4889 7.71415C22.5533 7.58775 22.602 7.48643 22.6353 7.41507C22.6519 7.37939 22.6647 7.35118 22.6737 7.33104C22.6782 7.32097 22.6818 7.31292 22.6844 7.30696C22.6857 7.30398 22.6867 7.30153 22.6876 7.2996C22.688 7.29864 22.6883 7.29781 22.6886 7.29712C22.6888 7.29677 22.6889 7.29646 22.689 7.29618C22.6891 7.29604 22.6892 7.29585 22.6892 7.29578C22.6893 7.29561 22.6894 7.29544 22 7ZM18.4867 10.582C17.6277 11.3882 16.5739 12.1343 15.3125 12.6308L15.8619 14.0266C17.3355 13.4466 18.5466 12.583 19.5133 11.6757L18.4867 10.582Z" fill="#1C274C"></path> <path opacity="0.5" d="M12.75 14.0001C12.75 13.5859 12.4142 13.2501 12 13.2501C11.5858 13.2501 11.25 13.5859 11.25 14.0001H12.75ZM16.2158 12.9197C15.9899 12.5725 15.5253 12.4742 15.1781 12.7001C14.831 12.926 14.7326 13.3906 14.9586 13.7378L16.2158 12.9197ZM9.04145 13.7378C9.26736 13.3906 9.16904 12.926 8.82185 12.7001C8.47466 12.4742 8.01008 12.5725 7.78417 12.9197L9.04145 13.7378ZM6.37136 15.091C6.14545 15.4382 6.24377 15.9028 6.59096 16.1287C6.93815 16.3546 7.40273 16.2563 7.62864 15.9091L6.37136 15.091ZM19.5303 10.5986C19.2374 10.3057 18.7626 10.3057 18.4697 10.5986C18.1768 10.8915 18.1768 11.3663 18.4697 11.6592L19.5303 10.5986ZM19.9697 13.1592C20.2626 13.4521 20.7374 13.4521 21.0303 13.1592C21.3232 12.8663 21.3232 12.3915 21.0303 12.0986L19.9697 13.1592ZM11.25 16.5001C11.25 16.9143 11.5858 17.2501 12 17.2501C12.4142 17.2501 12.75 16.9143 12.75 16.5001H11.25ZM16.3714 15.9091C16.5973 16.2563 17.0619 16.3546 17.409 16.1287C17.7562 15.9028 17.8545 15.4382 17.6286 15.091L16.3714 15.9091ZM5.53033 11.6592C5.82322 11.3663 5.82322 10.8915 5.53033 10.5986C5.23744 10.3057 4.76256 10.3057 4.46967 10.5986L5.53033 11.6592ZM2.96967 12.0986C2.67678 12.3915 2.67678 12.8663 2.96967 13.1592C3.26256 13.4521 3.73744 13.4521 4.03033 13.1592L2.96967 12.0986ZM7.78417 12.9197L6.37136 15.091L7.62864 15.9091L9.04145 13.7378L7.78417 12.9197ZM18.4697 11.6592L19.9697 13.1592L21.0303 12.0986L19.5303 10.5986L18.4697 11.6592ZM11.25 14.0001V16.5001H12.75V14.0001H11.25ZM14.9586 13.7378L16.3714 15.9091L17.6286 15.091L16.2158 12.9197L14.9586 13.7378ZM4.46967 10.5986L2.96967 12.0986L4.03033 13.1592L5.53033 11.6592L4.46967 10.5986Z" fill="#1C274C"></path> </g></svg>
                    }
                    </button>
                    <button className='opacity-20 w-1/3 text-slate-600  py-2 px-4 mt-3 font-bold border-1 border-slate-600 p-5 hover:bg-slate-900 hover:text-slate-200' onClick={decreaseSize}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="11" cy="11" r="9" stroke="#8E93A6" strokeWidth="1.5"></circle> <path d="M9 11H11H13" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M21.812 20.9748C21.7493 21.0695 21.636 21.1828 21.4094 21.4094C21.1828 21.636 21.0695 21.7493 20.9748 21.812C20.4202 22.1793 19.6699 21.99 19.3559 21.4036C19.3023 21.3035 19.2563 21.15 19.1643 20.843C19.0638 20.5076 19.0136 20.3398 19.0038 20.2218C18.9466 19.5268 19.5268 18.9466 20.2218 19.0038C20.3398 19.0136 20.5075 19.0638 20.843 19.1643C21.15 19.2563 21.3035 19.3023 21.4036 19.3559C21.99 19.6699 22.1793 20.4202 21.812 20.9748Z" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                    </button>
            </div>
            <sub className='absolute bottom-4 right-4 text-slate-200'>{String.fromCharCode(96 + index)}</sub>     
      </div>
    )
  }
  