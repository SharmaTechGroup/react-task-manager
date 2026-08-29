import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export function UserRegister(){

    
    const [msg, setMsg] = useState('');
    const [errorStyle, setErrorStyle] = useState('');

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_id: '',
            user_name:'',
            password:'',
            email:''
        },
        onSubmit: (user)=>{
            axios.post(`http://localhost:3000/users`, user)
            .then(()=>{
                alert('Registered Successfully..');
                navigate('/login');
            })
        }
    }) 

    function VerifyUser(e){
        axios.get(`http://localhost:3000/users`)
        .then(response=>{
             for(var item of response.data){
                 if(item.user_id===e.target.value){
                     setMsg('User Id Taken - Try Another');
                     setErrorStyle('text-danger');
                     break;
                 } else {
                     setMsg('User Id Available');
                     setErrorStyle('text-success');
                 }
             }
        })
    }

    return(
        <form onSubmit={formik.handleSubmit}>
            <dl>
            <dt>User Id</dt>
            <dd><input type='text' onKeyUp={VerifyUser} onChange={formik.handleChange} name="user_id" className='form-control' /></dd>
            <dd className={errorStyle}>{msg}</dd>
            <dt>User Name</dt>
            <dd><input type='text'  onChange={formik.handleChange} name="user_name" className='form-control' /></dd>
            <dt>Password</dt>
            <dd><input type='password'  onChange={formik.handleChange} name="password" className='form-control' /></dd>
            <dt>Email</dt>
            <dd><input type='email'  onChange={formik.handleChange} name="email" className='form-control' /></dd>
            </dl>
            <button type="submit" className='btn btn-primary w-100'> Register </button>
        </form>
    )
}