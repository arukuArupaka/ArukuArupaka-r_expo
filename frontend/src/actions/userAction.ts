import { Action } from 'redux';

/**
 * アクションを区別するための定数
 */
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
/**
 * 変更したメッセージを Reducer に送るためのアクション
 */
export interface IUpdateMessageAction extends Action {
    message: string;
}
/**
 * メッセージを変更するアクションを作成する
 * @param message 変更するメッセージ
 */
export const createUpdateMessageAction = (message: string): IUpdateMessageAction => {
    return {
        message,
        type: UPDATE_MESSAGE,
    };
};
