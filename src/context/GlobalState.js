import React, {createContext, useEffect, useReducer} from 'react';
import AppReducer from './AppReducer'
import teamsJson from "../lib/teams.json";
import {toast} from "react-toastify";

const initialState = {
    teams:teamsJson
}


const orderBy = localStorage.getItem("orderBy") !== null ? localStorage.getItem("orderBy") : "";
const setOrderBy = value => {
    localStorage.setItem("orderBy", value);
};
export const GlobalContext = createContext(initialState);

const Undo = ({ onUndo, closeToast }) => {
    const handleClick = () => {
        onUndo();
        closeToast();
    };

    return (
        <div>
            <h3>
                Deleting <button onClick={handleClick}>UNDO</button>
            </h3>
        </div>
    );
};

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function removeCart(id) {

        toast(<Undo onUndo={() => dispatch({ id, type: "UNDO" })} />, {

            onClose: () => dispatch({ type: 'REMOVE_CART',
                payload: id})
        });
    };

    function addCart(teams) {
        dispatch({
            type: 'ADD_CART',
            payload: teams
        });
    };



    return (<GlobalContext.Provider value={{
        teams: state.teams,
        removeCart,
        addCart,
        orderBy, setOrderBy,dispatch
    }}>
        {children}
    </GlobalContext.Provider>);
}