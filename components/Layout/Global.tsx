
import { FC } from "react";
import { GlobalLayoutProps } from "../../common/types";
import ColourPalette from "../Helpers/ColourPalette";
import Seo from "../Helpers/Seo";

const Global: FC<GlobalLayoutProps> = ({ children, seo,colourPalette }) => {
  return (
    <>
      <Seo {...seo} />
        {children}    
      <ColourPalette palette={colourPalette} />
    </>
  )
};

export default Global;