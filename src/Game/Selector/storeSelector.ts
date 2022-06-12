import { Missing, Selector } from '@sap/unified-store';
import { Data } from '../Interface/storeInterface';

export const currentUserSelector = Selector.createInputSelector((state: Data ): string| Missing => state.currentUser);
export const userWonSelector = Selector.createInputSelector((state: Data ): string | Missing => state.userWon);


