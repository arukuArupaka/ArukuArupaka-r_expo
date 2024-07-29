import { Action } from 'redux';
import mapState from '../states/mapState';
// Stateの初期状態
const initialState:mapState = {
    mapUserObject:{
        isLocationShare:false,
        userName:"",
        userUUID:"",
        friends:[],
        mapShowFriends:[],
        locationSharingFriends:[],
        QRUUID:""
    },
    mapSearchWord:"",
    campusData:{

    },
    campusBuildingData:{

    }

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
        case "setMapSearchWord":
            return{
                ...state,
                mapSearchWord:action.payload
            }
        case "setCampusDataAction":
            return{
                ...state,
                campusData:action.payload
            }
        case "setcampusBuildingDataAction":
            return{
                ...state,
                campusBuildingData:action.payload
            }
        default:
            return state
  }
}

export default mapRededucer;