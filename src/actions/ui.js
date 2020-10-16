import Swal from "sweetalert2";
import { types } from "../types/types";

export const setErrorAction = ( err ) => {
    Swal.fire( 'Error', err, 'error' );
    return ({type: types.uiSetError,
    payload: err})
};

export const removeErrorAction = () => ({
    type: types.uiRemoveError
});

export const startLoadingAction = () => ({
    type: types.uiStartLoading
});

export const finishLoadingAction = () => ({
    type: types.uiFinishLoading
});