
import React, { FC,  useCallback,  useRef, useState } from "react";
import { ButtonsProps } from "../../common/types";
import Button from "./Button";


const Buttons = ({buttons, replaceKey = false}:ButtonsProps): JSX.Element => {

  return (
      <div role="group" aria-labelledby="my-radio-group" className={` field-group flex flex-col  gap-6 `} >
        {buttons.map((button,i)=> {
          
            if(replaceKey){
              button.content = button.buttonContent
              button.style = button.buttonStyle
              button.type = button.buttonType
              button.link = button.buttonLink
            }
          return(
            <Button key={i} {...button} />
          )
        })}
      </div>
  )
};

export default Buttons;