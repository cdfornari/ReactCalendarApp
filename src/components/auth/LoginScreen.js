import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const [ loginFormValues, handleLoginInputChange] = useForm({
        loginEmail: '',
        loginPassword: ''
    });
    const {loginEmail,loginPassword} = loginFormValues;
    const handleLogin = e => {
        e.preventDefault();
        if(loginPassword.length < 6)
            return Swal.fire('Error','La contraseña debe tener mínimo 6 caracteres','error')
        dispatch(startLogin(loginEmail,loginPassword))
    }
    const [ registerFormValues, handleRegisterInputChange] = useForm({
        name: '',
        registerEmail: '',
        registerPassword: '',
        confirmPassword: ''
    });
    const {name,registerEmail,registerPassword,confirmPassword} = registerFormValues;
    const handleRegister = e => {
        e.preventDefault();
        if(registerPassword !== confirmPassword)
            return Swal.fire('Error','Las contraseñas no coinciden','error');
        if(registerPassword.length < 6 || confirmPassword.length < 6)
            return Swal.fire('Error','La contraseña debe tener mas de 6 caracteres','error');
        if(name.length < 1)
            return Swal.fire('Error','Introduzca nombre','error');
        if(registerEmail.length < 5)
            return Swal.fire('Error','Introduzca email','error');
        dispatch(startRegister(name,registerEmail,registerPassword))
    }
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='name'
                                value={name}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={handleRegisterInputChange} 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleRegisterInputChange} 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}