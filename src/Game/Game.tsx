import React, { useEffect, useState } from 'react';
// import './Game.css';
// import './../App.css';
import { InstanceId, IUnifiedStore, Missing } from '@sap/unified-store';
import { UserEntityPlugin } from './Plugin/storePlugin';
import { USER_ENTITY } from './constant';

//#region interface
interface SquareProps {idx: number| null, user: string | Missing}
interface GameProps {
  storeId: InstanceId,
  store: IUnifiedStore
}
//#endregion

//#region forTest
export const userCheck = (position: number[], userObject: SquareProps[]) : boolean => {
  let flag = userObject.find(x => x.idx === position[0])?.user !== undefined && userObject.find(x => x.idx === position[1])?.user !== undefined && userObject.find(x => x.idx === position[2])?.user !== undefined ?  true : false
  return flag
}
//#endregion


const Game: React.FC<GameProps> = ({storeId, store}) => {
  const [selectedSquare, setSelectedSquare] = useState<SquareProps[]>([{idx:null ,user:'O'}]);
  const [currentUser, setCurrentUser] = useState<string | Missing>('O');
  const [userWon, setUserWon] = useState<string | Missing>('');
  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  useEffect(()=>{
    store.dispatch(UserEntityPlugin.impl.store.createInstance(storeId, { status: '',
    currentUser: 'currentUser',
    userWon: 'userWon'}));
  },[])

//#region individual functions
  const setUser = (currentUser: string | Missing, userWon: string | Missing) =>{
    store.dispatch(UserEntityPlugin.impl.store.deleteInstance(storeId));
    store.dispatch(UserEntityPlugin.impl.store.createInstance(storeId, { status: '',
      currentUser: currentUser,
      userWon: userWon}));
    setCurrentUser(currentUser);
    setUserWon(userWon);  
  }

  const checkWinner = ( userObject:SquareProps[], idx: number| null, user: string| Missing) => {
      winningPositions.map((ele, i) => {
        if(userCheck(ele, userObject)){
          if(userObject.find(x => x.idx === ele[0])?.user === userObject.find(x => x.idx === ele[1])?.user && userObject.find(x => x.idx === ele[2])?.user ===  userObject.find(x => x.idx === ele[1])?.user)
          {
            setUser('',user); 
            let currentUser = store.getState(UserEntityPlugin.impl[USER_ENTITY].v1.getCurrentUser.feed(storeId));
            console.log(currentUser);
          }
        }    
      })
  }

  //#endregion 

  //#region handleupdates
  const handleUpdate = (idx: number| null, user: string | Missing): SquareProps[] => {
    let square:SquareProps[] = selectedSquare;
    if(!square.find(x=> x.idx === idx)) square.push({idx:idx, user : user }); 
    setSelectedSquare(square); 
      setUser(currentUser === 'X'? 'O' : 'X', userWon)
      return square
  }
  //#endregion 

  //#region individual tsx 
    const Square: React.FC<SquareProps> = ({idx, user}) => {
        return (
          <button className="square" onClick = { () => {
            if(userWon === '')checkWinner(handleUpdate(idx,user),idx, user);
          } }>
            <label>{ selectedSquare.find(x => x.idx === idx)?.user }</label>
          </button>
        );
    }
    
    const Board: React.FC = () => {
      const renderSquare = (i : number) => {
        return <Square idx = {i} user = {currentUser}/>;
      }
    
        return (
          <div>
            { userWon!== '' && <div className="status">{"User Won : " + userWon}</div> }
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
        );
    }

//#endregion

  return (
    <React.Fragment>
    <div className="game">
        <div className = "board-header">  
          <div id ="board-header" className="status">{"Next Player : "} </div>
          <div id = "user-tag">{ currentUser }</div> 
        </div>
      <Board />
    </div>
    <div>
      <button className= "button" onClick={() => {
        setSelectedSquare([{idx:9, user: 'none'}])
        setUser('X','');
      }
    }>Reset</button>
    </div>
    </React.Fragment>
  )}

export default Game;
