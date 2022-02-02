import { observer } from "mobx-react-lite";
import React, { FC, useContext, useState } from "react";
import { Context } from "../..";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {store} = useContext(Context);

  return <div className="LoginForm">
    <input type="text" 
    onChange={(e)=>{setEmail(e.target.value)}}
    value={email}
    placeholder="Email"/>
    
    <input type="text" 
    onChange={(e)=>{setPassword(e.target.value)}}
    value={password}
    placeholder="Password"/>
    <button onClick={()=>store.login(email, password)}>Login</button>
    <button onClick={()=>store.registration(email, password)}>Registration</button>

  </div>;
};

export default observer(LoginForm);
