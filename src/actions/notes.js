import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {

    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );

        dispatch( activeNote( doc.id, newNote ) );
        
        dispatch( addNewNote( doc.id, newNote ) );

    }

}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
});

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {    

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );

    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {
        
        const uid = getState().auth.uid;

        if( !note.url ){
            delete note.url;
        }

        const noteToFirestore = { ...note };

        delete noteToFirestore.id;

        await db.doc(`/${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire('Guardado', note.title, 'success');

    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = ( file ) => {
    return async(dispatch, getState) => {

        const activeNote = getState().notes.active;

        Swal.fire({
            title: 'Subiendo imagen',
            text: 'En breve estará listo',
            allowOutsideClick: false,
            willOpen: () => { Swal.showLoading() }
        });

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) )

        Swal.close();

    }
}

export const startDelete = ( id ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;

        await db.doc(`/${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote( id ) );

        Swal.fire('Eliminado','Se eliminó la entrada','success');

    }  
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});