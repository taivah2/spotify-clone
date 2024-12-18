import React, { useState } from 'react';
import './register-auth.css';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';
const register = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
          }
        axios
          .post('http://localhost:5000/api/auth/Register', {
            userName,
            email,
            password,
          })
          .then((response) => {
            // Kiểm tra phản hồi từ backend
            console.log('Backend response:', response); 
      
            // Hiển thị thông báo đăng ký thành công
            if (response.data.status === 'success') {
              alert(response.data.message);  // Hiển thị thông báo từ backend
              navigate('/login'); // Chuyển hướng sang trang đăng nhập
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
    <div className='register-page'>
        <div className='background-page'></div>
        <main className='main-register'>
            <div className='register-container'>
                <form className='register-form' onSubmit={handleRegister}>
                    <h1 className='title-register'>REGISTER</h1>
                    <div className='regis-inputbox'>
                        <input type='text' id='email-regis'
                         className='inp-regis' 
                         placeholder='Email'
                         onChange={(e)=> setEmail(e.target.value)}
                         value={email}/>
                        
                    </div>

                    <div className='regis-inputbox'>
                        <input type='text' id='user-regis'
                        className='inp-regis' 
                        placeholder='UserName'
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}/>
                       
                    </div>

                    <div className='regis-inputbox'>
                        <input type='text' id='password-regis'
                        className='inp-regis' 
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}/>
                       
                    </div>

                    <div className='regis-inputbox'>
                        <input type='text' id='password-regis'
                        className='inp-regis' 
                        placeholder='ConfirmPassword'
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                        value={confirmPassword}/>
                       
                    </div>

                    <button className='btn-regis' type='submit'>Register</button>

                    <div className='login'>
                            <p className='login-p'>
                                Have an account?
                                <Link className='login-link' to='/login'>Login</Link>
                            </p>
                        </div>
                </form>
            </div>
        </main>
      
    </div>
  )
}

export default register
