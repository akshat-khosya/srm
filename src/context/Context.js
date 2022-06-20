import axios from "axios";
import { createContext, useReducer } from "react";
import Reducer from "./Reducer";

    
const INITIAL_STATE={
    user:null,
    isFetching:false,
    error:false,
    axiosInstance: null
};
export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children})=>{
    const [state,dispatch]= useReducer(Reducer,INITIAL_STATE);
	const axiosInstance = axios.create({
		baseURL:
			process.env.NODE_ENV === "production"
				? "https://tegniescorporation.tech/"
				: "http://localhost:4000/",
	});
    return(
        <Context.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
            axiosInstance
        }}>
            {children}
        </Context.Provider>
    )

}