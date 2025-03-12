export const depositMoney=(amount)=>{
    return (dispatch)=>{
        dispatch({
            type :'deposit',
            payload: amount 
        })
    }
}

export const widraMoney=(amount)=>{
    return (dispatch)=>{
        dispatch({
            type :'widthraw',
            payload : amount
        })
    }
}


// lgoin and logout action creater

export const login=()=>{
    return (dispatch)=>{
        dispatch({
            type :'login',
        })
    }
}
export const logout=()=>{
    return (dispatch)=>{
        dispatch({
            type :'logout',
        })
    }
}