import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function HomeForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        navigate('/blog', { replace: true });
    };
    

    return (
        <>
            <Stack spacing={3}>
                <TextField name="buscar" label="" placeholder="Ingresar el nombre de veterinaria o servicio" />
            </Stack>
            <br />
            <br />
            <LoadingButton spacing={3} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Buscar
            </LoadingButton>
        </>
    );
}
