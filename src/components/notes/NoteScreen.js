import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector( state => state.notes );

    const [ formValues, handleInputChange, reset ] = useForm( note );
    // console.log(formValues);
    const { body, title } = formValues;

    const activeId = useRef( note.id );

    useEffect( () => {

        if( note.id !== activeId.current ){
            reset();
            activeId.current = note.id;
        }

    }, [ note, reset ] );

    useEffect( () => {

        dispatch( activeNote( formValues.id, {...formValues} ) );

    }, [formValues, dispatch] );

    const handleDelete = () => {

        dispatch( startDelete( note.id ) )

    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    name="title"
                    placeholder="Escribe algún título"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    name="body"
                    placeholder="Qué tareas hay para hoy?"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>
                
                {   
                    (note.url)
                     &&
                    (<div className="notes__image">
                        <img 
                            src={note.url}
                            alt="imagen"
                        />
                    </div>)
                }


            </div>

            <button className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>

        </div>
    )
}
