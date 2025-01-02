import React, { useState } from 'react';
import './login-auth.css';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';

const login = () => {
    const [email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
    
        axios
          .post('http://localhost:5000/api/auth/Login', {
            email,
            password,
          })
          .then((response) => {
            // Kiểm tra phản hồi từ backend
            console.log('Backend response:', response); 
      
            const { token, isAdmin, userName } = response.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userName', userName);
            localStorage.setItem('isAdmin', isAdmin);
    
            if (isAdmin) {
              alert('Login successfull!')
              navigate('/dashboard');
            } else {
              alert('Login successfull!')
              navigate('/');
            }
          })
          .catch((error) => {
            if (error.response) {
              alert(error.response.data.error);
            } else {
              alert('Something went wrong');
            }
          });
      };
  return (
    <div className='login-page'>
        <div className='background-page'></div>
        <main className='main-login'>
            <div className='login-container'>
                <form className='login-form' onSubmit={handleLogin}>
                    <h1 className='title-login'>LOGIN</h1>
                    <div className='login-inputbox'>
                        <input type='text' id='email-login'
                         className='inp-login' 
                         placeholder='Email'
                         onChange={(e)=> setEmail(e.target.value)}
                         value={email}/>
                        
                    </div>


                    <div className='login-inputbox'>
                        <input type='text' id='password-login'
                        className='inp-login' 
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}/>
                       
                    </div>

                    <button className='btn-login' type='submit'>Login</button>

                </form>
            </div>
        </main>
      
    </div>
  )
}

export default login

