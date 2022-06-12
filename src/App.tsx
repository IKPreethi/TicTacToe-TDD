import { createUnifiedStore, InstanceId, IUnifiedStore } from '@sap/unified-store';
import React, { useEffect } from 'react';
import './App.css';
import { USER_ENTITY } from './Game/constant';
import Game from './Game/Game';
import { UserEntityPlugin } from './Game/Plugin/storePlugin';

function App() {
  let store: IUnifiedStore;
      store = createUnifiedStore({
          [USER_ENTITY]: UserEntityPlugin
      });

  const storeInstanceId = new InstanceId([{ [USER_ENTITY]: 'guidstring'}]);
  return (
    <div className="App">
          <Game storeId= {storeInstanceId} store = {store}/>
    </div>
  );
}

export default App;
