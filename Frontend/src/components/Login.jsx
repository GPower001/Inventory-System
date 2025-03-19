import React from 'react'
import './login.css'

function Login() {
    function SwitchContent(){
        const content = document.getElementById('content');
        const registerBtn = document.getElementById('register');
        const logInBtn = document.getElementById('Login');

        registerBtn.addEventListener('click', () =>{
            content.classList.add("active")
        });
        logInBtn.addEventListener('click', () =>{
            content.classList.remove("active")
        });
    }

  return (
    <div className='content justify-content-center align-items-center d-flex shadow-lg' id='content'>
        {/* ....Registration Form..... */}
        <div className='col-md-6 d-flex justify-content-center'>
            <form>
                <div className='header-text mb-4'>
                    <h1>Register</h1>
                </div>
                <div className='input-group mb-3'>
                    <input type='text' placeholder='Name' className='form-control form-control-lg lg-light fs-6'></input>
                </div>
                <div className='input-group mb-3'>
                    <input type='text' placeholder='email' className='form-control form-control-lg lg-light fs-6'></input>
                </div>
                <div className='input-group mb-3'>
                    <input type='text' placeholder='password' className='form-control form-control-lg lg-light fs-6'></input>
                </div>
                <div className='input-group mb-3 justify-content-center'>
                    <button type='text' placeholder='Name' className='btn border-white text-white w-50 fs-6'>REGISTER</button>
                </div>
                
            </form>
        </div>
    {/* ......Login form......... */}
        <div className='col-md-6 right-box'>
            <form>
                <div className='header-text mb-4'>
                    <h1>Log In</h1>
                </div>
                <div className='input-group mb-3'>
                    <input type='text' placeholder='email' className='form-control form-control-lg lg-light fs-6'></input>
                </div>
                <div className='input-group mb-3'>
                    <input type='text' placeholder='password' className='form-control form-control-lg lg-light fs-6'></input>
                </div>
                <div className='input-group mb-5 d-flex justify-content-between'>
                    <div className='form-check'>
                        <input type='checkbox' className='form-check-input'/>
                        <label htmlFor='formcheck' className='form-check-label text-secondary'><small>Remember me</small></label> 
                    </div>
                    <div className='forgot'>
                        <small><a href='#'>Forgot password</a></small>
                    </div>
                </div>
                <div className='input-group mb-3 justify-content-center'>
                    <button type='text' placeholder='Name' className='btn border-white text-white w-50 fs-6'>LOGIN</button>
                </div>
            </form>
        </div>
        {/* .....switch panel..... */}
        <div className='switch-content'>
            <div className='switch'>
                <div className='switch-panel switch-left'>
                    <h1>Hello</h1>
                    <p>We are happy to see you Back</p>
                    <button className='hidden btn border-white text-white w-50 fs-6' id='Login' onClick={SwitchContent}>LOGIN</button>
                </div>
                <div className='switch-panel switch-right'>
                    <h1>Welcome</h1>
                    <p>SignUp</p>
                    <button className='hidden btn border-white text-white w-50 fs-6' id='register' onClick={SwitchContent}>REGISTTER</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
