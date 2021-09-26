export default (state, action) => {
    switch (action.type) {
        case 'REMOVE_CART':
            return {
                ...state,
                teams: state.teams.filter(team => team._id !== action.payload)
            };
        case 'ADD_CART':
            return {
                ...state,
                teams: [...state.teams, action.payload]
            };
        default: return state;
    }
}