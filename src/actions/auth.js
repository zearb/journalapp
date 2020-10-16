import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoadingAction, startLoadingAction } from "./ui";
import Swal from "sweetalert2";
import { noteLogout } from "./notes";

export const startLoginEmailPassword = (email, password) => {
    return ( dispatch ) => {

        dispatch( startLoadingAction() );
        
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {

                dispatch(
                    login( user.uid, user.displayName )
                );

                dispatch( finishLoadingAction() );

            } ).catch( e => {
                dispatch( finishLoadingAction() );
                if(e.code==='auth/user-not-found'){
                    Swal.fire( 'Error', 'Correo no registrado.', 'error' );
                }
                if(e.code==='auth/wrong-password'){
                    Swal.fire( 'Error', 'Password incorrecto.', 'error' );                    
                }
            } );

    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    
    return ( dispatch ) => {

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {

                await user.updateProfile( { displayName:name } );

                // console.log(user);

                dispatch(
                    login( user.id, user.displayName )
                )

            } ).catch( e => {
                // console.log(e);
                if(e.code==='auth/email-already-in-use'){
                    Swal.fire( 'Error', 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.', 'error' );
                }               
            } );

    }

}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            } );
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload:{
        uid,
        displayName
    }
});

export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );

        dispatch( noteLogout() );

    }
}

export const logout = () => ({
    type: types.logout
})