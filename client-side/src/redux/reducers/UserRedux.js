const initialState = {
    Users: [],
    currentUser: null,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SetUsers":
            return {
                ...state,
                Users: action.payload,
            };
        case "AddUsers":
            return {
                ...state,
                Users: [...state.Users, action.payload],
            };
        case "DeleteUser":
            return {
                ...state,
                Users: state.Users.filter((User) => User._id !== action.payload),
            };
        case "SetCurrentUser":
            const selectedUser = state.Users.find((User) => User._id === action.payload);
            return {
                ...state,
                currentUser: selectedUser,  // Set the selected Employee as the current Employee
            };
        case "EditUser":
            return {
                ...state,
                Users: state.Users.map((User) =>
                    User._id === action.payload._id ? { ...User, ...action.payload } : User
                ),
            };
        default:
            return state;
    }
}

export default UserReducer