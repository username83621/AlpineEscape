
import { createSlice, configureStore } from '@reduxjs/toolkit'


const globalSlice = createSlice({
  name: 'global',

  initialState: {
    welcomeText: false,
    attractionsText: false,
    featuresText: false,
    questionsText: false,

    featuresAnimation: false
  },

  reducers: {
    set_welcomeText: (state, action) => {
			state.welcomeText = action.payload
		},
		set_attractionsText: (state, action) => {
			state.attractionsText = action.payload
		},
    set_featuresText: (state, action) => {
			state.featuresText = action.payload
		},
    set_questionsText: (state, action) => {
			state.questionsText = action.payload
		},

    set_featuresAnimation: (state, action) => {
      state.featuresAnimation = action.payload
    }
  }
})


export const {
  set_welcomeText,
  set_attractionsText,
  set_featuresText,
  set_questionsText,

  set_featuresAnimation
} = globalSlice.actions


export default globalSlice.reducer
