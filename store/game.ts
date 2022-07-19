import create from "zustand";
import { persist } from 'zustand/middleware'
import { GameStore, quizSettings } from "../common/types";
import { getQuizQuestions } from "../common/utils";

const initialState = {
    questions: [],
    results: [],
    answers: {},
    initialValues: {},
    activeStep: 0,
    resultMessage: '',
    startTime: null
}


export const gameStore = create<GameStore>()(persist(
      (set) => ({
        ...initialState,
        setQuestions: (newQuestions: any[]) => set(
          () => ({ questions: newQuestions })
        ),
        quizStartTime: (time: any) => set(
          () => ({ startTime: time })
        ),
        setResults: (newResults: any[] | null) => set(
          () => ({ results: newResults })
        ),
        setMessage: (newMessage: string) => set(
          () => ({ resultMessage: newMessage })
        ),
        
        setAnswers: (newAnswers: any) => set(
          () => ({ answers: newAnswers })
        ),
        updateActiveStep: (newNumber: any) => set(
          () => ({ activeStep: newNumber })
        ),
        setInitialValues: (newInitialValues: any) => set(
          () => ({ initialValues: newInitialValues })
        ),
        setupQuiz: async (values: quizSettings) => {
          // with same settings just new questions
          const quizQuestions = await getQuizQuestions(values) as any
          set({ 
            activeStep: 0,
            questions: quizQuestions.questions,
            answers: quizQuestions.answers,
            initialValues: quizQuestions.initialValues
          });
        },
        createNewGame:  () => {
          // clear settings & quiz -> redirect to /create-page
          set({ 
            questions: [],
            answers: {},
            initialValues: {},
          });
        }
    }),
  {
    name: 'game-storage', // unique name
    getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
  }
  )
);
