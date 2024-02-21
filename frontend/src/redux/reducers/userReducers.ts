import { Action } from 'redux';
import State from '../states/userState';

// Stateの初期状態
const initialState : State = {
    isLogin:false,
    isLoginNotVerificationEmail:false,
    isVerificationEmail:false,
    counter:1,
}

// 画面でDispatchされたActionから新しいStateを返却する
const userReducer = (state : State = initialState, action: Action) => {
    switch(action.type) {
        // 加算Action
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            }
        case 'handleLoginAction':
            return{
                ...state,
                isLogin:action.payload
            }
        case 'handleLoginNotVerificationEmail':
            return{
                ...state,
                isLoginNotVerificationEmail:action.payload
            }
        default:
            return state
  }
}

export default userReducer;