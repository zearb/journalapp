import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { setErrorAction, removeErrorAction } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    // const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: 'Aldo',
        email: 'aldora.ez@gmail.com',
        password: '123456',
        password2: '123456',
    });

    const { name ,email ,password ,password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if ( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
        }

    }

    const isFormValid = () => {  
        
        if ( name.trim().length === 0 ) {
            dispatch( setErrorAction('Campo nombre obligatorio') );
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setErrorAction('Email no es válido') )
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch( setErrorAction('Los password tienen que ser iguales y de almenos 6 dígitos') )
            return false
        }
        
        dispatch( removeErrorAction() );
       return true;
    }

    return (
        <>
            <h3 className="auth__title animate__animated animate__fadeIn" >Register</h3>

            <form onSubmit={handleRegister} className="animate__animated animate__fadeIn">

                <input type="text" placeholder="Nombre" name="name" className="auth__input"
                    value={name}
                    onChange={handleInputChange}
                />
                <input type="text" placeholder="Email" name="email" className="auth__input" 
                    value={email}
                    onChange={handleInputChange}
                />
                <input type="password" placeholder="Password" name="password" className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <input type="password" placeholder="Confirmar Password" name="confirm-password" className="auth__input" 
                    value={password2}
                    onChange={handleInputChange}
                />
                <button type="submit" className="btn btn-primary mb-5 mb-5 btn-block"> Register </button>


                <Link to="/auth/login" className="link mt-5">
                    Ya está registrado?
                </Link>

            </form>
        </>
    )
}
