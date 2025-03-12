const initialState = null;
const userAvatureReducer = (state = initialState, action) => {
    switch (action.type) {
        case "setUserAvatar":
            return action.payload;
        case "removeUserAvatar":
            return initialState;
        default:
            return state;
    }
}

export default userAvatureReducer;