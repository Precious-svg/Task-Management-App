import React from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import { useEffect, useState } from 'react';


const ScrollUPButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        }
        
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    
    const scrollUp = () => {
        window.scrollTo({top:0, behaviour: "smooth"})
    }
  return (
    <>
      <button onClick={scrollUp} className='sticky right-0 bottom-10' ><FaArrowUp/></button>
    </>
  )
}

export default ScrollUPButton