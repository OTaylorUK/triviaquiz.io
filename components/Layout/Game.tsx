
import { FC, useCallback, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { AppLayoutProps } from "../../common/types";
import { GameHeader } from "../Header";
import Global from "./Global";


const Game: FC<AppLayoutProps> = ({ children, seo, colourPalette }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0)

  const onResize = useCallback(() => {
    if (window === undefined) return

		if(window){
      let headerHeight = 0;
      if(headerRef.current){
        headerHeight = headerRef.current?.clientHeight  // account for err message height
      }
      setHeaderHeight(headerHeight)
    }
	}, []);

	const { ref } = useResizeDetector({onResize});


  const containerStyle = {
    paddingTop: `${headerHeight}px`,
  }
  
  return (
    <>
    <Global seo={seo} colourPalette={colourPalette}>
     <GameHeader ref={headerRef} />
        <div ref={ref} className=" w-full min-h-[100vh] bg-custom-faded-dark   flex flex-col justify-center items-center   gap-4 flex-1 " style={containerStyle}>
          {children}
        </div>
    </Global>
    </>
  )
};

export default Game;