import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { motion } from "framer-motion";
import { animateUp, wrapperAnimationSettings } from '../../../common/framerSettings';
import { HeroSlice } from '../../../common/types';
import Button from '../../../components/component/Button';


const Default = ({ slice }: SliceComponentProps<HeroSlice>) => {
  const {primary, slice_type} = {...slice}
  const {content, buttonContent, buttonAction, buttonStyle = 'primary', buttonTarget, buttonLink} = primary;

  return(
    <section 
      id={slice_type}
      data-type={slice_type}
      className={`container w-full  min-h-[60vh] py-10  flex justify-center items-center text-left `}
    >
      <motion.div {...wrapperAnimationSettings} className={`max-w-screen-md flex flex-col gap-8 lg:gap-10  text-center items-center text-custom-white`}>
          <PrismicRichText 
            field={content}
            components={{
              heading1: ({ children }) =>  <motion.h1 variants={animateUp} >{children}</motion.h1>,
              paragraph: ({ children }) =>  <motion.p variants={animateUp}  className='mb-2 text-lg px-4 lg:px-10'>{children}</motion.p>,
            }}
          />  
          <motion.div variants={animateUp}>
            <Button link={buttonLink} type={buttonAction} style={buttonStyle} content={buttonContent} />
          </motion.div>
      </motion.div>

  </section>
  )
}

export default Default