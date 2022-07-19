import create from "zustand";
import { persist } from 'zustand/middleware';
import { GameSettingStore } from "../common/types";

const initialState = {
    name: '',
    avatar: 'adventurerNeutral-0',
    categories: ['random'],
    difficulty: 'medium',
    limit: 10,
    activeStep: 0,
    userLocation: '',
}

export const gameSettingStore = create<GameSettingStore>()(persist(
      (set, get) => ({
        ...initialState,
        setUserInfo: (newName: any, newLocation: any) => set(
          () => ({ name: newName, userLocation: newLocation})
        ),
        createNewSettings: (values: any) => set(
          () => (values)
        ),
        setAvatar: (newAvatar: any) => set(
          () => ({ avatar: newAvatar })
        ),
        updateActiveStep: (newNumber: any) => set(
          () => ({ activeStep: newNumber })
        ),
        setInitialRegion: (newLocation: any) => set(
          (state) => {
            // if nothing set (by user) then automatically add the user ip country in\
            if(state.userLocation === ""){
              return(
                { userLocation: newLocation}
              )
            }else{return state}
          }
        ),
        setQuestionRegion: (newLocation: any) => set(
          () => ({userLocation: newLocation})
        ),
        updateCategory: (newCategory: any) => set(
          () => ({ categories: newCategory})
        ),
        updateSettings: (newDifficulty: any, newLimit: number) => set(
          () => ({ difficulty: newDifficulty, limit: newLimit })
        ),
       
    }),
  {
    name: 'game-settings-storage', // unique name
    getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
  }
  )
);

