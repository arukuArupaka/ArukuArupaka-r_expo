import { Action } from 'redux';
import State from '../states/userState';

// Stateの初期状態
const initialState = {
    mapUserObject:{}
}

// 画面でDispatchされたActionから新しいStateを返却する
const mapRededucer = (state = initialState, action: Action) => {
    switch(action.type) {
        // 加算Action
        case 'setMapUserObject':
            return {
                ...state,
                mapUserObject: action.payload
            }
        default:
            return state
  }
}

export default mapRededucer;