
import { PrismicRichText } from "@prismicio/react";
import SVG from 'react-inlinesvg';
import { PageFooterProps } from "../../../common/types";

const PageFooter = ({ credit}:PageFooterProps): JSX.Element => {

  return (
     <div className={` flex flex-row items-center h-20   z-20 w-full  justify-center bg-custom-secondary`}>
      <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
        <PrismicRichText 
          field={credit}
          components={{
            image: ({node}) => {
              return(
                <SVG className="icon text-custom-white" no-cors="true" src={node?.url} width={node.dimensions?.width} height={node.dimensions?.height} title={node?.alt ? node?.alt : 'Svg icon inside a button' } />
              )
            },
          }}
        />  
      </div>
    </div>
  )
};


export default PageFooter;