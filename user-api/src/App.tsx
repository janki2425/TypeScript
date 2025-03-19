import './App.css';
import {useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { fetchUsers } from './actions';
import { User } from './types';
import { RootState,AppDispatch } from './store';

function App() {

  const dispatch: AppDispatch = useDispatch();
  const {users,loading,error}=useSelector((state:RootState)=>state);

  useEffect(()=>{
    dispatch(fetchUsers())
  },[dispatch]);

  if(loading) return <p>Loading...</p>
  if(error) return <p>error : {error}</p>

  return (
    <div>
      <h1>Users : </h1>
      <ul>
        {
          users.slice(0,10).map((user:User)=>(
            <li key={user.id}>{user.name}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
