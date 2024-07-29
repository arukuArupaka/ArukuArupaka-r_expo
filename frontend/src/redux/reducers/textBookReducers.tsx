import { Action } from 'redux';
import State from '../states/userState';

// Stateの初期状態
const initialState = {
    searchID:''
}

// 画面でDispatchされたActionから新しいStateを返却する
const textBookReducers = (state = initialState, action: Action) => {
    switch(action.type) {
        // 加算Action
        case 'handleTextBookAction':
            return {
                ...state,
                searchID: action.payload
            }
        default:
            return state
  }
}

export default textBookReducers;
