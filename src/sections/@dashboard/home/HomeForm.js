import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------
export const ERP = "http://54.205.30.1:8080/v1/vets/";


export default function HomeForm() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');

    const handleClick = async () => {
        const valor = {};
        valor.page = 1;
        valor.size = 5;
        valor.search = {
            name: nombre
        }
        const response = await axios
            .post(`${ERP}search-by-name`, valor)
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
                return error.response ? error.response : {};
            });
        if (response.status === 200) {
            navigate('/blog', { state: response.data });

        } else {
            console.log(response)

        }
    };




    return (
        <>
            <Stack spacing={3}>
                <TextField name="buscar"
                    label=""
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingresar el nombre de veterinaria o servicio" />
            </Stack>
            <br />
            <br />
            <LoadingButton spacing={3} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Buscar
            </LoadingButton>
        </>
    );
}
