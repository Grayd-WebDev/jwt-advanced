import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
  const {store} = useContext(Context);
  useEffect(()=>{
    if(localStorage.getItem("token")){
      store.checkAuth();
    }
  },[]);
  if(!store.isAuth){
    return <LoginForm/>;
  }
  console.log(store.user.email);
  
  return (
    <div className="App">
    {store.isAuth && <h1>The user is authenticated as {store.user.email}</h1>}
    <button onClick={()=>store.logout()}>Logout</button>
    </div>
  );
}

export default observer(App);
