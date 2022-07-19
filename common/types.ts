import * as prismicT from "@prismicio/types";
import  {ReactNode } from "react";

// Utils //

export type colour = {
    name: string
    light: string
    dark: string
}

export interface ColourProps {
	palette: {
		colour: colour[]
	}
}

export interface ThemeToggleProps {
	className?: string
}

export interface SeoProps {
  title: string,
  description: string,
  ogImage: {
    url?: string
  },
}
// Define general type for useWindowSize hook, which includes width and height
export interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

// Stores //
export interface GameStore {
  questions?: any[] | undefined | never[]
  answers?: any | undefined
  initialValues?: any | undefined
  activeStep: number
  resultMessage: string
  results: any[] | null
  startTime: any | null
  setQuestions: (questions: any[]) => void;
  setAnswers: (answers: any[]) => void;
  setInitialValues: (initialValues: any[]) => void;
  setupQuiz: (initialValues: quizSettings) => void;
  createNewGame: (initialValues: any[]) => void;
  updateActiveStep: (number: number) => void;
  setMessage: (resultMessage: string) => void;
  setResults: (resultMessage: any[] | null) => void;
  quizStartTime: (startTime: any | null) => void;
}

export interface quizSettings {
  avatar: any;
  name: string
  categories: any;
  difficulty: any;
  limit: any;
  userLocation: any;
}

export interface GameSettingStore {
    name: string ;
    avatar?: any | undefined;
    categories?: any | undefined;
    difficulty?: any | undefined;
    limit: number ;
    userLocation?: any | undefined;
    quiz?: any[] | undefined
    activeStep: number
    setUserInfo: (name: string, location: string) => void;
    setAvatar: (avatar: string) => void;
    updateCategory: (categories: string) => void;
    updateSettings: (difficulty: string, limit: number) => void;
    setQuestionRegion: (location: string) => void;
    setInitialRegion: (location: string) => void;
    updateActiveStep: (number: number) => void;
    createNewSettings: (values: any) => void;
}

// Pages //
export interface PageProps {
    slices: any[],
    header: {
      logoAction: string,
      logoContent:  prismicT.RichTextField,
      logoTarget: string,
      navItem: any[]
    },
    footer: {
      credit: prismicT.RichTextField,
    }
    colourPalette: ColourProps,
    seo: {
      title: string,
      description: string,
      ogImage: {
        url?: string
      },
    }
    dynamicFields?: any
  }

// Components //

export interface ButtonProps {
  currentPage?: string,
  target?: string,
  type: string | null,
  actionTarget?: string,
  style: string | null,
  classList?: string,
  textFirst?: boolean,
  eventHandler?: any
  file?: any
  icon?: any
  link?: any,
  text?: prismicT.AnyRegularField,
  content: prismicT.RichTextField 
}

export interface PercentLoaderProps {
  amount: number
}

export interface ProgressBarProps  {
  translateAmount: number | string
}


export interface AppFooterProps  {
  submitMessage?: string
  handleBack: any
  activeStep: number
  isSubmitting: boolean
  isLastStep: boolean
  hasErrors: boolean
  cancelLink?: string
}

export interface ResultFooterProps  {
  isLoading: boolean
  setIsLoading: any
}

export interface PageFooterProps {
  credit: prismicT.RichTextField;
}

export interface ButtonsProps  {
  buttons: ButtonProps[] | any[]
  replaceKey?: boolean
}


export interface AppLayoutProps {
    children?: ReactNode,
    header: {
      logoAction: string,
      logoContent:  prismicT.RichTextField,
      logoTarget: string,
      navItem: any[]
    },
    footer: any
    seo: {
      title: string,
      description: string,
      ogImage: {
        url?: string
      },
    };
    colourPalette: any
    limit?: number
    backLink?: string
}


export interface PageLayoutProps {
    children?: ReactNode,
    header: {
      logoAction: string,
      logoContent:  prismicT.RichTextField,
      logoTarget: string,
      navItem: any[]
    },
    footer: {
      credit:  prismicT.RichTextField,
    }
    seo: {
      title: string,
      description: string,
      ogImage: {
        url?: string
      },
    };
    colourPalette: any
}

export interface GlobalLayoutProps {
  children?: ReactNode,
  seo: {
    title: string,
    description: string,
    ogImage: {
      url?: string
    },
  };
  colourPalette: any
}


// Slices //
export type HeroSlice = prismicT.Slice<
	"hero",
	{
		content: prismicT.RichTextField;
		buttonContent: prismicT.RichTextField;
		buttonAction: prismicT.KeyTextField;
		buttonStyle: prismicT.KeyTextField;
		buttonTarget: prismicT.KeyTextField;
		buttonLink: prismicT.LinkField;
	}
>;

export interface SliceProps {
  slice: any,
}



// Form fields //

export type fieldTypes = 'textInput' | 'radioStyled' | 'radioBasic' | 'number' | 'checkboxStyled' | 'checkboxBasic' | 'select'


export type options = {
    uid: string
    label: string
    img: string
}

export interface fieldValue  {
    uid: string
    type: fieldTypes
    label: string
    placeholder?: string
    requiredErrorMsg?: string
    dynamicData?: any
    options?: options[]
    formikFunc?: any
    wrapContent?: boolean
}

export interface FormFieldsProps {
  data: {
    id: number
    label: string
    fields: fieldValue[]
  },
  dynamicData?: any,
  formikFunc?: any
}


// Game //

export interface FormWrapperProps {
  initialValues: any,
  numOfGroups: number,
  uniqueGroups: any,
  groupObjects:any
}

export interface formData {
  avatar: string,
  name: string,
  categories: string[],
  difficulty: string,
  limit: number,
  userLocation: string
}

// returned from Trivia API
export interface questionProps {
  id: string
  correctAnswer: string
  incorrectAnswers: string[]
  category: string
  type: string
  question: string
}

// formatted for output as form field
export type answerProp = {
  [key: string ]: {
    uid: string,
    question: string,
    answer: string
    options: any[]
  } 
}

export interface GameQuestionProps {
    data: {
      id: number
      type: fieldTypes
      uid: string
      options: options[]
      question: string
    },
}

// Header //

export interface HeaderProps {
  logoContent:  prismicT.RichTextField,
  logoTarget?: string,
  logoLink?: prismicT.LinkField,
  navItem: any[]
  isMobile: boolean
  menuIsOpen: boolean
  setMenuIsOpen: any
}
export interface NavMenuProps {
  navItem: any
  scrolled: string
  isMobile: boolean
  menuIsOpen: boolean
}
export interface NavbarProps {
  navItem: any
  scrolled: string
  menuIsOpen: boolean
  isMobile: boolean
  setMenuIsOpen: any
  logo: {
    content: any
    link?: any
    type?: any
  }
}
export interface ToggleProps {
  menuOpen: boolean
  toggle: any
}

export interface AppHeaderProps  {
  title: string
  limit?: number
  backLink?: string
}