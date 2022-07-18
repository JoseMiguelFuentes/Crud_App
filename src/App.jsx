import { useState, useEffect } from 'react'
import './App.css'
import UsersList from './Components/UsersList'
import axios from 'axios'
import UsersForm from './Components/UsersForm'
import Matrix from './Images/Abstract-Office-2.jpg'
import Swal from 'sweetalert2'

function App() {
  const [users, setUsers] = useState([])


  useEffect(()=>{
    axios.get(`https://users-crud1.herokuapp.com/users/`)
    .then(res => setUsers(res.data))
    
  },[])
  console.log(users)

  const getUsers = ( )=>{
    axios.get(`https://users-crud1.herokuapp.com/users/`)
    .then(res => setUsers(res.data))
  }
  const [userSelected, setUserSelected] = useState(null)

  const selectUser = ( user )=>{
    setUserSelected( user )
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `You has  selected ${user.first_name} ${user.last_name}`,
      showConfirmButton: false,
      timer: 2000,
      footer: "Jose's Crud Job",
      width: '300px',
      position: 'center'
    })
  }
  const deselectUser = ( )=> setUserSelected( null )

  const deleteUser = ( user )=>{
    axios.delete( `https://users-crud1.herokuapp.com/users/${user.id}/` )
    .then( getUsers)
    .catch( error => console.log(error.response))
  }
  




  return (
    <div className="App">
      <img className='Back-image' src={Matrix} alt="Back-image" />
      <header className="App-header" >
        <UsersForm  getUsers={getUsers} userSelected={userSelected} deselectUser={deselectUser}/>
        <UsersList  users={users} selectUser={selectUser} deleteUser={deleteUser}/>
      </header>
    </div>
  )
}

export default App
