const initialState = {
    Employess: [],
    currentEmployee: null,
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SetEmployees":
            return {
                ...state,
                Employess: action.payload,
            };
        case "AddEmployee":
            return {
                ...state,
                Employess: [...state.Employess, action.payload],
            };
        case "DeleteEmployee":
            return {
                ...state,
                Employess: state.Employess.filter((Employee) => Employee._id !== action.payload),
            };
        case "SetCurrentEmployee":
            const selectedEmployee = state.Employess.find((Employee) => Employee._id === action.payload);
            return {
                ...state,
                currentEmployee: selectedEmployee,  // Set the selected Employee as the current Employee
            };
        case "EditEmployee":
            return {
                ...state,
                Employess: state.Employess.map((Employee) =>
                    Employee._id === action.payload._id ? { ...Employee, ...action.payload } : Employee
                ),
            };
        default:
            return state;
    }
}

export default employeeReducer