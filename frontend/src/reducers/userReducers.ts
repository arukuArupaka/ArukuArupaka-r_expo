import clone from 'clone';
import { Action, Reducer } from 'redux';

import { IUpdateMessageAction, UPDATE_MESSAGE } from '../actions/userAction';
import IAppState from '../states/userState';

/**
 * State の初期値
 */
const initState: IAppState = {
    message: '',
};

/**
 * Reducer 関数
 * @param state 現在のステート
 * @param action 渡されたアクション
 */
const appReducer: Reducer<IAppState> =
    (state: IAppState = initState, action: Action) => {
        let newState = state;
        switch (action.type) {
            case UPDATE_MESSAGE:
                {
                    // ステートを変更する場合は、別のオブジェクトを作成する
                    newState = clone(state);
                    const _action = action as IUpdateMessageAction;
                    newState.message = _action.message;
                }
                break;
            default:
                break;
        }
        // ここで返すオブジェクトが前回と異なるなら、関連する Component が再描画される。
        return newState;
    };

export default appReducer;