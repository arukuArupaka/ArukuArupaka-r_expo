import { Action } from 'redux';
import State from '../states/userState';

// Stateの初期状態
const initialState = {
    loginAfterPageName:'',
    nonPersonalizedOnly:true
}

// 画面でDispatchされたActionから新しいStateを返却する
const commonReducer = (state = initialState, action: Action) => {
    switch(action.type) {
        // 加算Action
        case 'handleLoginAfterPageName':
            return {
                ...state,
                loginAfterPageName: action.payload
            }
        case 'handleNonPersonalizedOnly':
            return{
                ...state,
                nonPersonalizedOnly:action.payload
            }
        default:
            return state
  }
}

export default commonReducer;