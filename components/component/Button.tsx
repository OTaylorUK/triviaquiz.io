import { PrismicLink, PrismicRichText } from '@prismicio/react';
import * as prismicT from "@prismicio/types";
import SVG from 'react-inlinesvg';
import { ButtonProps } from '../../common/types';
import { useAnalyticsEvent } from '../../hooks/useAnalytics';

const formatButtonContent = (content: prismicT.RichTextField | null ) : JSX.Element | null => {

  return (
    <PrismicRichText 
        field={content}
        components={{
          paragraph: ({ children }) =>  <>{children}</>,
          image: ({node}) => {
            return(
              <SVG className="icon" no-cors="true" src={node?.url} width={node.dimensions?.width} height={node.dimensions?.height} title={node?.alt ? node?.alt : 'SVG icon inside a button' } />
            )
          },
        }}
      />  
  )
}


const Button = ({ file, target='_self', classList ='', type='button', style = 'default', link = null, eventHandler, textFirst = true, content}:ButtonProps): JSX.Element => {

  const btnStyle = style!.toLowerCase()
  const { trackCustomEvent }  = useAnalyticsEvent();

  let isCurrentPage = false;


  let variableClass = '';

  switch (btnStyle) {
    case 'text':
      variableClass = 'btn-text'
      break;
    case 'primary':
      variableClass = 'btn-primary'
      break;
    case 'icon':
      variableClass = 'btn-icon'
      break;
    case 'ghost':
      variableClass = 'btn-ghost'
      break;
    case 'ghost-small':
      variableClass = 'btn-ghost-small'
      break;
    case 'ghost-filled':
      variableClass = 'btn-ghost-filled'
      break;
    default:
      variableClass = 'btn-default'
      break;
  }

  const buttonClass = classList.concat(` group ${isCurrentPage ? 'is-current-page' : ''} btn ${variableClass}`)


  const triggerEvent = () => {
      trackCustomEvent({eventName:'clicked_download_cv', 
      eventTitle:'download_cv'
      });
  }

  if(type === 'link' && link){
    return (

      <PrismicLink key={`link`} className={buttonClass} field={link}>
        {btnStyle === 'primary' && (<span className='btn-effect  group-hover:w-32 group-hover:scale-150'></span>)}
        {formatButtonContent(content)}
      </PrismicLink>
    )
  }else{
    
    // ScrollLink
    switch (type) {
      case 'download':
        console.log(file);
        
        return(
          <a key={`btn`} onClick={() => triggerEvent()} href={file?.url} target="_blank" className={buttonClass} rel="noreferrer">
             {btnStyle === 'primary' && (<span className='btn-effect  group-hover:w-32 group-hover:scale-150'></span>)}
            {formatButtonContent(content)}
        </a>
        )
        break;
      default:
        return(
          <button key={`btn`} className={buttonClass}>
            {btnStyle === 'primary' && (<span className='btn-effect  group-hover:w-32 group-hover:scale-150'></span>)} 
            {formatButtonContent(content)}
          </button>
        )
        break;
    }
  
    }
}

export default Button

// <a href="#_" class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
// <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
// </a>
