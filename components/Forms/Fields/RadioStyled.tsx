
import { Field } from "formik";
import { useEffect, useState } from "react";
import SVG from 'react-inlinesvg';
import { fieldValue } from "../../../common/types";
import { splitToChunks } from "../../../common/utils";
import { useWindowSize } from "../../../hooks/useWindowSize";


const RadioStyled = ({uid,  label= '', options, dynamicData}:fieldValue): JSX.Element => {

    const finalData: any[] = dynamicData !== undefined ? dynamicData : options

    const{width} = useWindowSize()
    const [data, setData] = useState<null|any[]>(null)
    const [currentIteration, updateCurrentIteration] = useState(0)
    const [visibleGroup, setVisibleGroup] = useState<any[] | null>()
    const [groupLength, setGroupLength] = useState<number | null>(null)
    
    
    useEffect(()=>{
        let data;
        if(width){
            if(width > 1024){
                data = splitToChunks(finalData,2);
            }else{
                data = splitToChunks(finalData,8);
            }
            setData(data)
            setVisibleGroup(data?.[0])
            setGroupLength(data!.length - 1)

        }
    },[finalData, width])
    


    
    const nextPage = () => {
        if(groupLength === null) return null
        let newIteration = currentIteration + 1

        if(newIteration > groupLength){
            newIteration = 0
        }
        updateCurrentIteration(newIteration)
        setVisibleGroup(data?.[newIteration])
    }
    const previousPage = () => {
        if(groupLength === null) return null

        let newIteration = currentIteration - 1

        if(newIteration < 0){
            newIteration = groupLength
        }
        updateCurrentIteration(newIteration)
        setVisibleGroup(data?.[newIteration])
    }


    return (
        <div role="group" aria-labelledby="radio-styled" className={`field-inner`} >
            {label !== '' && <label className="form-label">{label}</label>}
            
            <div className="flex flex-row w-full justify-center items-center">
                {groupLength !== 0 && (
                    <button type='button' className=" btn-icon" onClick={()=> previousPage()}>
                    <SVG className="" src={`/back.svg`} width={20} height={20}  title={'SVG icon inside a button' } />
                    </button>
                )}
            
                <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                    {visibleGroup?.map(({uid: optionUID,label,img})=>{
                        return(
                            <label key={optionUID}  className=" radio-option-group  flex justify-center items-center cursor-pointer">
                                <Field
                                    className={`peer visually-hidden `}
                                    name={uid}
                                    type="radio"
                                    value={optionUID}
                                />
                                {img !== null ? 
                                <div className="flex justify-center items-center p-2 border-2 border-transparent rounded-xl  peer-checked:bg-custom-accent-primary peer-checked:border-custom-accent-secondary ">
                                    <SVG className="" src={`${img}.svg`} width={60} height={60}  title={'SVG icon inside a button' } />
                                </div>
                                :
                                <span>{label}</span>
                                }
                            </label>
                        )
                    })}
                </div>
                
                {groupLength !== 0 && (
                <button type='button' className="btn-icon" onClick={()=> nextPage()}>  <SVG className="" src={`/forward.svg`} width={20} height={20}  title={'SVG icon inside a button' } /></button>
                )}
            </div>

        </div>
    )
};

export default RadioStyled;