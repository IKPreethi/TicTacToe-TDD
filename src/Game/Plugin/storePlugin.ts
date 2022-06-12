import { createUserAction, deleteUserAction } from "../Action/storeActionCreator";
import { USER_ENTITY } from "../constant";
import { currentUserSelector, userWonSelector } from "../Selector/storeSelector";

const UserEntityImpl = {
    store: {
        createInstance: createUserAction,
        deleteInstance: deleteUserAction
    },
    [USER_ENTITY]: {
        v1: {
            getCurrentUser: currentUserSelector,
            getWinner: userWonSelector
        }
    }
};

export const UserEntityPlugin = {
    impl: UserEntityImpl
}