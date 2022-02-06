import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm/LoginForm';
import UserService from './services/UserService';
import { IUser } from './types/IUser';

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const {store} = useContext(Context);
  
  useEffect(()=>{
    const check = async () => {
      await store.checkAuth();
    };
    if(localStorage.getItem("token")){
      check();
    }
  },[]);

const getUsers = async() => {
  try{
    const response = await UserService.fetchUsers();
    setUsers(response.data);
  }catch(e){
    console.log(e);
  }
}
  if(!store.isAuth){
    return <LoginForm/>;
  }
  
  return (
    <div className="App">
    {store.isAuth? <h1>The user is authenticated as {store.user.email}</h1>: "Login!"}
    {!store.user.isActivated? "Account is not activated! Check your email.": "The account is activated!"};
    <br/>
    <br/>
    <button onClick={()=>getUsers()}>Get users</button>
    <button onClick={()=>store.logout()}>Logout</button>
    {users.map((i)=>{
      return <p>{ i.email}</p>;
    })}
    </div>
  );
}

export default observer(App);
