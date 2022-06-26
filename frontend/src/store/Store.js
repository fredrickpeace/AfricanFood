const defaultState = {
    user:{}
}
const userReducer = (state=defaultState, action)=> {
    if(action.type==='SETUSER') {
        let newState = {state, user:action.payload}
        return newState
    }
    return state
}
export default userReducer;