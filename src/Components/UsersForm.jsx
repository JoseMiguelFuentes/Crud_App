
import React from 'react';
import Swal from 'sweetalert2'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios'



const UsersForm = ({getUsers, userSelected, deselectUser}) => {


  const { register ,handleSubmit, setValue, reset } = useForm({
    defaultValues:{
      birthday: '',
      email: '',
      first_name: '',
      last_name: '',
      password: ''
    }
  })
  useEffect(()=>{
    if(userSelected){
      reset(userSelected)
      
    }else{
      reset({
        birthday: '',
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    })
    }
  },[userSelected])


  const submit = (data)=>{
     console.log(data)
     if (userSelected){
      axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
      .then(()=>{
        getUsers()
        deselectUser()
        Swal.fire({
          icon:  'success',
          title: `User Updated`,
          showConfirmButton: false,
          timer: 2000,
          footer: "Jose's Crud Job",
          width: '300px',
          position: 'center'
        })
      })
      .catch(error=> console.log(error.response))
     }else{
     axios.post('https://users-crud1.herokuapp.com/users/', data)
     .then(()=>{
        getUsers()
        reset()
        Swal.fire({
          icon:  'success',
          title: `User Created`,
          showConfirmButton: false,
          timer: 2000,
          footer: "Jose's Crud Job",
          width: '300px',
          position: 'center'
        })
    })
    .catch(error=> console.log(error.response))
    }
    }


  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <>
          <label htmlFor='first-name' className='user'><i className='bx bxs-user'></i></label>
          <input className='user-name' type='text' id='first-name' required={true} maxLength={25}
          {...register("first_name")} placeholder='First name'/>

          <label></label>
          <input className='last-name' type='text' id='last-name' required={true} maxLength={25}
          {...register("last_name")} placeholder='Last name'/>
        </>

        <label htmlFor='email' className='email-icon' ><i className='bx bx-envelope'></i></label>
        <input className='email' placeholder='example@xmail.com' type='email' id='email' required={true} maxLength={25}
        {...register("email")} />

        <label htmlFor='password' className='lock'><i className='bx bxs-lock-alt'></i></label>
        <input className='password' type='password' id='password' required={true} maxLength={8}
         {...register("password")} />

        <label htmlFor='birthday' className='cake'><i className='bx bx-cake'></i></label>
        <input className='birthday' type='date' id='birthday' required={true} 
        {...register("birthday")} />
        
        <button className='send'>{userSelected ? 'Update' : 'Send'}</button>
        { 
          userSelected && <button className='clean' type='button' onClick={()=>{reset({
            birthday: '',
            email: '',
            first_name: '',
            last_name: '',
            password: ''
        }),  deselectUser()}}>Clear</button>
         }
      </form>
    </div>
  );
};

export default UsersForm;
// onSubmit={handleSubmit(submit)}