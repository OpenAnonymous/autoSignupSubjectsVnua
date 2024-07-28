import { createSlice } from '@reduxjs/toolkit';
const botSlice = createSlice({
    name: 'bot',
    initialState: { 
        preventReloadBrowser: false ,
        signupSuccess: false,
        saveSubjectsSuccess: false,
    },
    reducers: {
        setPreventReloadBrowser: (state, action) => ({
            ...state, preventReloadBrowser : action.payload
        }),
        setSignupSuccess: (state, action) => ({
            ...state, signupSuccess : action.payload
        }),
        setSaveSubjectsSuccess: (state, action) => ({
            ...state, saveSubjectsSuccess : action.payload
        })
    }
});

export const { setPreventReloadBrowser ,setSignupSuccess,setSaveSubjectsSuccess} = botSlice.actions;
export default botSlice.reducer;
