import { getSortedList, vote } from "../utils/helpers.js";
import actionTypes from "../utils/actionTypes";


const AppReducer = (state, action) => {
    let list;

    switch (action.type) {
        case actionTypes.ADD_CART:
            return {
                ...state,
                teams: [action.payload, ...state.teams]
            }
        case actionTypes.REMOVE_CART:
            return {
                ...state,
                teams: state.teams.filter(team => {
                    return team._id !== action.payload;
                })
            }
        case actionTypes.UP_VOTE:
            list = vote(state, action.votes, "up");

            return getSortedList(list, action.orderBy);
        case actionTypes.DOWN_VOTE:
            list = vote(state, action.votes, "down");

            return getSortedList(list, action.orderBy);
        case actionTypes.ORDER_BY_ASC:
            return getSortedList(state, "asc");
        case actionTypes.ORDER_BY_DESC:
            return getSortedList(state, "desc");
        case actionTypes.ORDER_BY_DEFAULT:
            return getSortedList(state);
        default:
            return state;
    }
};

export default AppReducer;