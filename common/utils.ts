import axios from "axios"
import * as Yup from 'yup';
import { answerProp, formData, questionProps } from "./types";


export const capitalizeString = (str: string) => {
    if (typeof str !== 'string' || !str) return str

    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const numIsOdd = (index: number) => {
	return index % 2 === 0 ? false : true
}


export const resolveVariation = (variation: string, SectionComponents: any) => {
	const Section = SectionComponents[capitalizeString(variation)]
  
	if (Section) {
	  return Section
	}
  
	console.error('Cant find section', capitalizeString(variation))
	return null
}

export const outputVariableString = (val:string | undefined | (string | undefined)[] ) => {
	let returnString: any = '';
	if(Array.isArray(val)){
		let retArr: any = []

		val.forEach(element => {
		let val = outputVariableString(element);
		if(val.length > 0 ){
			retArr = [...retArr, outputVariableString(element)]
		}
		});

		returnString += retArr.join(' ')
	}else if(typeof val !==  'undefined' && typeof val !==  null){
		returnString += val
	}

	return returnString
}

export const findAndReplaceHolder = (replaceVals: any, str:string ) => {
	var placeholders = str?.match(/\$(.*?)\$/g)
	if (placeholders) {
		let newString = '';

		placeholders?.map((placeholder, i) => {

		// text without placeholder characters
		var phText: string = placeholder.substring(1, placeholder.length - 1);

		// replacen with new value
		if (replaceVals[phText as unknown as number]) {
			if (newString !== '') {
			newString = newString.replace(placeholder, replaceVals[phText as unknown as number])
			
			} else {
			if (str) {
				newString = str?.replace(placeholder, replaceVals[phText as unknown as number])
			}
			
			}
		}
		})
		return newString;
	} else {
		return str;
	}

}

export const getQuizCategories = async () => {

	const sourceURL = "https://the-trivia-api.com/api/categories";
	const response = await axios.get(sourceURL);
	const categories = await response.data
	const quizCategories = formatQuizCategories(categories)
  
    return quizCategories;
}


export const findTheLongestString = (myarry: any[]) => {
    var max = myarry[0].length;
    myarry.map(item => max = Math.max(max, item.length));
    return myarry.filter(item => item.length == max);
}


export const formatQuizCategories: any = (categories: any[]) => {
	const formattedCategores = [];


	const random = {
		uid: 'random',
		label: 'Random',
		img: `/categories/random`

	  }
	  formattedCategores.push(random)


	for (const [key, value] of Object.entries(categories)) {
	  const mainString = findTheLongestString(value as []) // required due to the way the data is returned with tags in variable order
	  const filename = mainString[0]

	  const newObj = {
		uid: filename,
		label: key,
		img: `/categories/${filename}`

	  }
	  formattedCategores.push(newObj)
	}

	return formattedCategores
}

  
export const getGeoInfo = async () => {

	return await axios({
		method: "GET",
		url: "https://ipapi.co/json/",
	  })
};




const formatForAPI = (values: formData) =>{

    const {limit, categories, difficulty, userLocation} = values
    const allCategories = categories.join(',')
	const finalCategories = allCategories === 'random' ? '' : `&categories=${categories}`

    const requestURL = `https://the-trivia-api.com/api/questions?limit=${limit}${finalCategories}&difficulty=${difficulty}&region=${userLocation}`

	console.log({requestURL});
	
	return requestURL;
    
  }


export const fetchQuestions = async (values:formData) => {
	return await axios({
		method: "GET",
		url: formatForAPI(values),
	})
};



const padTo2Digits = (num: number) => {
	return num.toString().padStart(2, '0');
}

export const convertMsToMinutesSeconds = (milliseconds: number) => {
	const minutes = Math.floor(milliseconds / 60000);
	const seconds = Math.round((milliseconds % 60000) / 1000);
  
	let retMsg;
	if(seconds === 60){
		retMsg = `${minutes + 1}m`
	}else if(minutes === 0){
		retMsg = `${padTo2Digits(seconds)}s`
	}else{
		retMsg = `${minutes}m ${padTo2Digits(seconds)}s`
	}
	return retMsg
  }


export const getQuizQuestions = async (values:formData) => {
	
    const quizQuestions = await fetchQuestions(values) as any
	const correctAnswers: answerProp = {};
	const initialValues:any = {};

	const formattedQuestions = quizQuestions.data.map((val: questionProps, index: number)=>{
		const questionNumber = `question-${index + 1}`
		let questionType = ''

		initialValues[questionNumber] = ''

		// merge all possible answers
		val.incorrectAnswers.push(val.correctAnswer)
		
		const options = val.incorrectAnswers.map((value,key)=>{
			return{
				uid: `answer-${key}`,
				label: capitalizeString(value),
			}
		})

		// for checking correct answers at end of game
		correctAnswers[questionNumber] = {
			uid: `answer-${val.incorrectAnswers.lastIndexOf(val.correctAnswer)}`,
			question: val.question,
			answer: val.correctAnswer,
			options: options
		}


		switch (val.type) {
			case 'Multiple Choice':
				questionType = 'radioBasic' as const
				break;
			default:
				break;
		}

		return {
			uid: questionNumber,
			questionNumber: index + 1,
			type: questionType ,
			category: val.category,
			question: val.question,
			options: options,
			validationSchema: 
			Yup.object().shape({
				[questionNumber]:  Yup.string().required(`You must select an answer`)
			})
		}
	})

	return {
		questions: formattedQuestions,
		answers: correctAnswers,
		initialValues: initialValues,
	};
};


export const fetchGlobalComponents = async (client: any)  =>{
	const header =  await client.getSingle("header");
	const footer =  await client.getSingle("footer");
	const colourPalette =  await client.getSingle("colour-palette");
  
	return {
	  header: header?.data,
	  footer: footer?.data,
	  colourPalette: colourPalette?.data,
	}
  }
  

export  const splitToChunks = (array: any[] | null, parts: any) => {
	let result = [];
	if(array === null) return null

	const arr = JSON.parse(JSON.stringify(array));

	for (let i = parts; i > 0; i--) {
		 result.push(arr.splice(0, Math.ceil(arr.length / i))) ;
	}
	 return result;
}

export  const formatFormFields = (slices: any[], dynamicFields: any) => {
	const uniqueGroups = slices.map((slice)=>slice.primary.groupUID).reduce((result, groupUID) => {
		return result.includes(groupUID) ? result : [...result, groupUID];
	}, []);

	const initialValues: any = {}

	const numOfGroups = uniqueGroups.length 

	const groupObjects = Object.assign({}, ...Object.entries({...uniqueGroups}).map(([a,b]:any) => ({ 
		[b]: {
		'fields' : [],
		'validationSchema' : {},
		'id' : a
		} 
	})))

	slices.map((slice: { variation?: any; primary?: any; items?: any; })=>{
		const {primary, items} = slice
		console.log({primary});
		
		const {groupUID, uid, label, requiredErrorMsg, minValue, maxValue, defaultValue = ''} = primary
		const fieldType = slice?.variation

		const options = items.length > 0 ? items : null

		const fieldGroup = {
			uid: uid,
			defaultValue: defaultValue,
			type: fieldType,
			placeholder: 'Your name',
			label: label,
			requiredErrorMsg: requiredErrorMsg,
			options: dynamicFields?.[uid] ? dynamicFields?.[uid] : options
		} 

		let validation;

		switch (fieldType) {
		case 'textInput':
		case 'radioBasic':
		case 'radioStyled':
			validation = Yup.string().required(requiredErrorMsg)
			break;
		case 'checkboxBasic':
		case 'checkboxStyled':
			validation = Yup.array().min(1, requiredErrorMsg).of(Yup.string().required()).required()
			fieldGroup['defaultValue'] = [defaultValue]
			break;
		case 'number':
			validation = Yup.number().max(maxValue).min(minValue).required(requiredErrorMsg)
			break;
		default:
			break;
		}

		groupObjects[groupUID]['fields'] =  [...groupObjects[groupUID]['fields'], fieldGroup]
		groupObjects[groupUID]['validationSchema'][uid] =  validation

		initialValues[uid] = '' // add default value ternary
	})

	return {
		initialValues:initialValues,
		numOfGroups: numOfGroups,
		uniqueGroups: uniqueGroups,
		groupObjects: groupObjects,
	}
}


export const createCSSVar = (type:string, name: string,  value: string) => {
	return `--theme-${type}-${name}:${value};`;
}

export const createGroupCSSVar = (groupName: string,name: string, val1: string, val2: string) => {
	let returnString = '';
	if (val1) {
		returnString = createCSSVar(groupName, name, val1)
	}else if (val2){
		returnString = createCSSVar(groupName, name, val2)
	}
	return returnString
}