import { ADD_CHECKOUT_RED, DELETE_CHECKOUT_RED, GET_CHECKOUT_RED, UPDATE_CHECKOUT_RED } from "../Constant"
export default function CheckoutReducer(state=[], action) {
    let newState, index
    switch (action.type) {
        case ADD_CHECKOUT_RED:
            newState = state
            newState.push(action.payload)
            return newState
        case GET_CHECKOUT_RED:
            return action.payload
        case UPDATE_CHECKOUT_RED:
            newState = state
            index = newState.findIndex((x) => x.id === action.payload.id)
            newState[index].name = action.payload.name
            newState[index].orderstatus = action.payload.orderstatus
            newState[index].paymentstatus = action.payload.paymentstatus
            return newState
        case DELETE_CHECKOUT_RED:
            newState = state
            index = newState.findIndex((x) => x.id === action.payload.id)
            newState.splice(index, 1)
            return newState
        default:
            return state
    }
}