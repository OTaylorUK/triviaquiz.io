
import { FC, useCallback, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { PageLayoutProps } from "../../common/types";
import { PageFooter } from "../Footer";
import { PageHeader } from "../Header";
import Global from "./Global";

const Page: FC<PageLayoutProps> = ({  children, seo, header,footer,colourPalette }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0)
	const [menuIsOpen, setMenuIsOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false);

  const headerFunctions = {
    menuIsOpen: menuIsOpen,
    setMenuIsOpen: setMenuIsOpen,
    isMobile: isMobile
  }
  const onResize = useCallback(() => {
    if (window === undefined) return

		if(window){
      let headerHeight = 0;
      if(headerRef.current){
        headerHeight = headerRef.current?.clientHeight  // account for err message height
      }
      setHeaderHeight(headerHeight)

	
			setMenuIsOpen(false)
			if(window.innerWidth < 1024){
				setIsMobile(true)
			}else{
				setIsMobile(false)
			}

    }
	}, []);

	const { ref } = useResizeDetector({onResize});


  const containerStyle = {
    paddingTop: `${headerHeight}px`,
    minHeight: `calc(100vh - ${headerHeight }px)`,
  }
  
  return (
    <>
      <Global seo={seo} colourPalette={colourPalette}>
        <PageHeader ref={headerRef} {...headerFunctions} {...header}/>
        <div ref={ref} className=" w-full  px-4  lg:px-12  bg-custom-secondary  flex flex-col justify-center items-center   gap-4 flex-1 " style={containerStyle}>
          {children}
        </div>
        <PageFooter {...footer}/>
      </Global> 
    </>
  )
};

export default Page;