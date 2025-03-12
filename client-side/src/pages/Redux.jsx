import React from "react";
import { actionCreator } from "../redux/index";
import { UserContext } from "../state/User";
import { RoomContext } from "../state/Room";

import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

import { useContext } from "react";

export default function Redux() {
  const dispatch = useDispatch();
  const {username} = useContext(UserContext);
  const {room} = useContext(RoomContext);

  console.log(username,room);

  const action = bindActionCreators(actionCreator, dispatch);
  const amount = useSelector(state=>state.changeNumber)
  const isLogged = useSelector(state=>state.isLoggedReducer);
 

  return (
    <div className="w-40 h-20 z-100 bg-white w-full h-100">
        <div>
          <button onClick={()=>action.login()}>Login</button>
          <button onClick={()=>action.logout()}>Logout</button>
        </div>
      <div>
        <button onClick={()=>action.depositMoney(100)}>Deposit</button>
        <div>
            {isLogged?<h1>Logged</h1>:<h1>Not Logged</h1>}

          <h1>{amount?amount:"000"}</h1>
        </div>
        <button onClick={() => action.widraMoney(100)}>Withdraw</button>
      </div>
    </div>
  );
}
