import {Instance} from '@sap/unified-store';
import { USER_ENTITY } from '../constant';
import { Data } from '../Interface/storeInterface';

export const createUserAction = Instance.getCreateInstance<Data>().withReducer(
    (_state: Data | undefined , action): Data => {
        return {...action.payload };
    }
);

export const deleteUserAction = Instance.getDeleteInstance(USER_ENTITY);