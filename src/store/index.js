 
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducers"

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck:false
        })
    },
    devTools: process.env.NODE_ENV !== 'production'
})
export default store