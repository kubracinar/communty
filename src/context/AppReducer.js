export default (state, action) => {
    switch (action.type) {
        case 'REMOVE_CART':
            return {
                ...state,
                teams: state.teams.filter(team => {
                    return team._id !== action.payload;
                })
            }
        case 'ADD_CART':
            return {
                ...state,
                teams: [action.payload, ...state.teams]
            }


        default:
            return state;
    }
}