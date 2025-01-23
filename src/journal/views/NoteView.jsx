import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal/thunks';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


export const NoteView = () => {

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)
    
    const dispatch = useDispatch();

    const { title, body, date, onInputChange, formState } = useForm(note);

    const fileInputRef = useRef();

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString()
    }, [date])
    
    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire({
                title: 'Nota actualizada',
                icon: 'success'
            })
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch(startSavingNote(note))
    }
    
    const onFileUpdateChange = ({target}) => { 
        if (target.files.length === 0) return;
        dispatch (startUploadingFiles(target.files))
    }

    const onDelete = () => {
        dispatch(startDeletingNote())
    }
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{dateString}</Typography>
        </Grid>
          <Grid item>
              <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  onChange={onFileUpdateChange}
                  style={{ display: 'none' }}
              />
              <IconButton
                color='primary'
                onClick={() => fileInputRef.current.click()}
                disabled={isSaving}
              >
                  <UploadOutlined/>
              </IconButton>
              <Button
                  onClick={onSaveNote}
                  disabled={isSaving}
                  color="primary"
                  sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                name='title'
                value={title}
                onChange={onInputChange}
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
            />

            <TextField 
                type="text"
                name='body'
                value={body}
                onChange={onInputChange}
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
            />
          </Grid>
          
          <Grid container justifyContent='end'>
              <Button
                  onClick={onDelete}
                  sx={{ mt: 2 }}
                  color="error"
              >
                  <DeleteOutline />
                  Borrar
            </Button>
          </Grid>

        {/* Image gallery */}
        <ImageGallery images={note.imageUrls}/>

    </Grid>
  )
}
