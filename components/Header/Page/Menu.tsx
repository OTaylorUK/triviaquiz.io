

import React from "react";
import { motion } from "framer-motion";
import Button from "../../component/Button";
import { NavMenuProps } from "../../../common/types";
import { navMenuItem, navMenuVariants } from "../../../common/framerSettings";

const Menu = ({ scrolled, isMobile, menuIsOpen,  navItem}:NavMenuProps): JSX.Element => {

  if(isMobile){
    return(
      <motion.ul
				initial={isMobile ? {opacity: 0, x: "100%" } : {}}
				animate={menuIsOpen ? "open" : "closed"}
				variants={isMobile ? navMenuVariants : {}}
				className={`${scrolled === 'no-scroll' ? 'bg-custom-secondary' : 'bg-inherit'} shadow-md text-inherit  -z-30  h-[101vh]  absolute   min-w-[60vw]  flex-col gap-[3vh] p-12   flex justify-center items-start top-0 right-0`}
				>
          {navItem.map((item: any, i: number)=>{
            let variableClass = 'text-inherit';
            if(item.style === 'ghost' || item.style === 'ghost-small'){
              variableClass = ''
            }
              return(
                <motion.li key={i} className="w-full" variants={navMenuItem} >
                      <Button actionTarget={item.target} file={item.file}   classList={`relative justify-start z-10 ${variableClass}`} style={item.style !== null ? item.style : 'text'} link={item.link}  type={'link'} content={item.content} />
                </motion.li>
              )
          })}
      </motion.ul>
    )
  }else{
    return(
      <ul className={`flex flex-row gap-6 items-center`}>
      {navItem.map((item: any, i: number)=>{
        let variableClass = 'text-inherit';
        if(item.style === 'ghost' || item.style === 'ghost-small'){
          variableClass = ''
        }
          return(
            <motion.li key={i} variants={navMenuItem} >
                 <Button actionTarget={item.target} file={item.file}   classList={`relative justify-start z-10 ${variableClass}`} style={item.style !== null ? item.style : 'text'} link={item.link}  type={'link'} content={item.content} />
            </motion.li>
          )
      })}
    </ul>
    )
  }
  
};

export default Menu;