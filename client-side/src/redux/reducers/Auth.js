const intial = {
    isLogged: false,
    isAdminLogged: false,
    isStaffLogged: false,
}
const isLoggedReducer = (state = intial, action) => {
    switch (action.type) {

        case 'login':
            return {
                ...state,
                isLogged: true,
            }
        case 'logout':
            return {
                ...state,
                isLogged: false,
            }
        case 'admin-login':
            return {
                ...state,
                isAdminLogged: true,
            }
        case 'admin-logout':
            return {
                ...state,
                isAdminLogged: false,
            }
        case 'staff-login':
            return {
                ...state,
                isStaffLogged: true,
            }
        case 'staff-logout':
            return {
                ...state,
                isStaffLogged: false,
            }
        default:
            return {
                ...state,
            }
    }
}

export default isLoggedReducer;