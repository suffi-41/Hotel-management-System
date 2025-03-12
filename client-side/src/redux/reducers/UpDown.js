const intialState=0;
const changeNumber = (state = 0, action)=>{
    if(action.type === 'deposit'){
        return state + action.payload;
    }
    else if(action.type === 'widthraw'){
        return state - action.payload;
    }else{
        return state
    }
}

export default changeNumber;