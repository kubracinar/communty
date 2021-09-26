import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer'
import teamsJson from "../lib/teams.json";

const initialState = {
    teams:[teamsJson]
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function removeCart(id) {
        dispatch({
            type: 'REMOVE_CART',
            payload: id
        });
    };

    function addCart(teams) {
        dispatch({
            type: 'ADD_CART',
            payload: teams
        });
    };


    return (<GlobalContext.Provider value={{
        employees: state.employees,
        removeCart,
        addCart,

    }}>
        {children}
    </GlobalContext.Provider>);
}