import { configureStore } from "@reduxjs/toolkit";
import botReducer from './rootReducer'

const store = configureStore({
    reducer: {
        bot: botReducer
    }
});

export default store; 