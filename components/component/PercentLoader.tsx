
import {
    motion
} from "framer-motion";
import { PercentLoaderProps } from "../../common/types";

const svgVariants = {
    hidden:{
        opacity: 0,
    },
    visible:{
        opacity:1,
        transition: {duration: 1}
    }
}

const PercentLoader = ({amount}:PercentLoaderProps): JSX.Element => {

    const pathVariants = {
        hidden:{
            opacity: 0,
            pathLength: 0,
        },
        visible:{
            opacity:1,
            pathLength: amount,
            transition: {duration: 2, ease: "easeInOut"}
        }
    }
    return(
        <>
       <motion.svg 
        variants={svgVariants}
        initial={"hidden"}
        animate={"visible"}
        width="200" 
        height="200" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={'rotate-180 text-custom-accent-primary stroke-current'}
        >

            <path strokeLinecap="round" className="-z-10 text-custom-primary" d="M50 91.6667C73.0119 91.6667 91.6667 73.0118 91.6667 50C91.6667 26.9881 73.0119 8.33331 50 8.33331C26.9881 8.33331 8.33333 26.9881 8.33333 50C8.33333 73.0118 26.9881 91.6667 50 91.6667Z" stroke="#ffffff57" strokeWidth="4"/>
            <motion.path 
                variants={pathVariants}
                strokeLinecap="round"
                className="z-10"
                d="M50 91.6667C73.0119 91.6667 91.6667 73.0118 91.6667 50C91.6667 26.9881 73.0119 8.33331 50 8.33331C26.9881 8.33331 8.33333 26.9881 8.33333 50C8.33333 73.0118 26.9881 91.6667 50 91.6667Z" 
                strokeWidth="4"
            />

        </motion.svg>

        </>
    )
};

export default PercentLoader;