import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeErrorAction, setErrorAction } from '../../actions/ui';

export const LoginScreen = () => {
    
    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui )
    
    const [ formValues, handleInputChange ] = useForm({
        email: 'zearb@illegalepizza.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();

        if(isFormValid()){
            dispatch( startLoginEmailPassword(email,password) );
        }

    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    const isFormValid = () => {  
        
        if ( !validator.isEmail( email ) ) {
            dispatch( setErrorAction('Email no es válido') )
            return false;
        } else if ( password.length < 5 ) {
            dispatch( setErrorAction('El password debe ser de almenos 6 dígitos') )
            return false
        }
        
        dispatch( removeErrorAction() );
       return true;
    }
     
    return (
        <>
            <h3 className="auth__title animate__animated animate__fadeIn" >Login</h3>

            <form onSubmit={handleLogin} className="animate__animated animate__fadeIn">

                <input type="text" placeholder="Email" name="email" className="auth__input" 
                    value={email}
                    onChange={handleInputChange}
                    />
                <input type="password" placeholder="Password" name="password" className="auth__input"
                     value={password}
                     onChange={handleInputChange}
                     />
                <button type="submit" className="btn btn-primary mb-5 btn-block"
                     disabled={loading}
                > 
                Login
                </button>

                <hr/>

                <div className="auth__social-networks">

                    <p>Iniciar sesión con:  </p>

                    <div className="google-btn" onClick={handleGoogleLogin} >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>

                </div>

                <Link to="/auth/register" className="link">
                    Crear cuenta
                </Link>

            </form>
        </>
    )
}
