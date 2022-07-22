import { motion } from "framer-motion";
import React from "react";
import { HeaderProps } from "../../../common/types";
import { useScrollHandler } from "../../../hooks/useScrollHandler";
import Navbar from "./Navbar";


const Page = React.forwardRef<HTMLDivElement, HeaderProps>(({logoContent,logoLink,  navItem, isMobile, setMenuIsOpen, menuIsOpen}, ref) => {
    const scrolled = useScrollHandler();

    let navClass = '';

    switch (scrolled) {
        case "hero":
            navClass = ' text-custom-white'
            break;
        case "scrolled":
            navClass = `bg-custom-white text-custom-primary shadow-sm  `
            break;
        default:
            navClass = 'bg-custom-secondary text-custom-white'
            break;
    }
    
    const variants = {
        'no-scroll': { 
            opacity: 1,
            y: menuIsOpen ? 0 : '10%' ,

        },
        'hero': {
            opacity: 0, 
            y: "-100%" ,
            transition: {
                type: "spring",
                bounce: .8,
                duration: .8,
                delay: .2
              }
        },
        'scrolled': { 
            opacity: 1,
            y: 0
        },
    }

    const logo = {
        content: logoContent,
        link: logoLink,
    }   
    

    return(
        <div ref={ref} className={` flex flex-row items-center h-20  fixed top-0 left-0  z-20 w-full `}>
            <motion.header
            animate={scrolled}
            variants={variants}
            className={`w-full ${navClass}`}
            >
                <Navbar navItem={navItem} logo={logo} menuIsOpen={menuIsOpen} scrolled={scrolled} setMenuIsOpen={setMenuIsOpen} isMobile={isMobile} />
            </motion.header>
        </div>
    )
});


Page.displayName = "Page";

export default Page;