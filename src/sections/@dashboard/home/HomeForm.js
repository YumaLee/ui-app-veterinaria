import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------
export const ERP = "https://lpwi1gf1y1.execute-api.us-east-1.amazonaws.com/dev/v1/vets/";


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
        if (nombre === "" || nombre === null) {
            Swal.fire('ingrese nombre de veterinaria');
        } else {

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
