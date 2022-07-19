
import { Field } from "formik";
import { useEffect, useRef, useState } from "react";
import SVG from 'react-inlinesvg';
import { useWindowSize } from "../../../hooks/useWindowSize";
import { splitToChunks } from "../../../common/utils";
import { fieldValue } from "../../../common/types";


const CheckboxStyled = ({uid, label='', options, dynamicData, formikFunc}:fieldValue): JSX.Element => {

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
                data = splitToChunks(finalData,1);
            }else{
                data = splitToChunks(finalData,3);
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

    
    const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));
    const validateAsync = async(value: any) => {
        return sleep(100).then(() => {
            const arr:string[] = Array.from(value)
            
            if (arr.includes('random') && arr.length > 1) {
                const niceNames= arr.map((selection) => {
                    if(selection !== 'random'){
                        const str = selection.replaceAll('_', ' ')
                        return str.charAt(0).toUpperCase() + str.slice(1)
                    }
                })
                const removeStrings = niceNames.filter(item => item).join(', ')

                return `To choose a random category you must unselect ${removeStrings}`;
            }
        });
    };


    const ref = useRef<HTMLDivElement>(null);

    const clearSelected = () =>{
        formikFunc.setFieldValue(uid, ['random']);
        setTimeout(() => formikFunc.setFieldTouched(uid, true, false));
    }
    
    return (
        <div role="group" aria-labelledby="my-radio-group" className={` field-inner `} >
          {label !== '' && <label className="form-label">{label}</label>}
          <button type='button' className="btn-icon" onClick={()=> clearSelected()}>Reset selection</button>
          <div className="flex flex-row w-full justify-center items-center">
                {groupLength !== 0 && (
                    <button type='button' className=" btn-icon" onClick={()=> previousPage()}>
                    <SVG className="" src={`/back.svg`} width={20} height={20}  title={'SVG icon inside a button' } />
                    </button>
                )}

                <div ref={ref} className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                    {visibleGroup?.map(({uid: optionUID,label,img})=>{
                        
                        return(
                            <label key={optionUID}  className="checkbox-option-group flex gap-2 flex-col justify-start items-center cursor-pointer text-center">
                                <Field
                                    className={`p-4 border peer visually-hidden `}
                                    name={uid}
                                    type="checkbox"
                                    value={optionUID}
                                    validate={validateAsync}
                                />
                                <div className="flex  justify-center items-center p-2 border-2 border-transparent rounded-xl  peer-checked:bg-custom-accent-primary peer-checked:border-custom-accent-secondary">
                                    <SVG className="" src={`${img}.svg`} width={60} height={60}  title={'SVG icon inside a button' } />
                                </div>
                                <span className="flex-1 flex items-center">{label}</span>
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

export default CheckboxStyled;