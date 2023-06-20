import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function UserRegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleClick = () => {
    navigate('/login', { replace: true });
  };

  const provinces = ['Provincia 1', 'Provincia 2', 'Provincia 3'];
  const districts = ['Distrito 1', 'Distrito 2', 'Distrito 3'];
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    province: '',
    district: '',
    address: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    province: false,
    district: false,
    address: false,
    password: false,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setFormErrors({ ...formErrors, [event.target.name]: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validar campos requeridos
    let hasErrors = false;
    const newFormErrors = {};
  
    Object.keys(formData).forEach((key) => {
      if (formData[key] === '') {
        newFormErrors[key] = true;
        hasErrors = true;
      }
    });
  
    setFormErrors(newFormErrors);
  
    if (hasErrors) {
      return;
    }

    // Mostrar modal de éxito
    setSuccessModalOpen(true);
    // Limpiar el formulario
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      province: '',
      district: '',
      address: '',
      password: '',
    });
  };

  const handleCloseModal = () => {
    setSuccessModalOpen(false);
  };

  return (
    <>
      <Stack spacing={3}>
      <form onSubmit={handleSubmit} style={{ padding: '0px', margin: '20px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Registro de Usuario
        </Typography>
        <TextField
          label="Nombres"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ maxLength: 100 }}
          error={formErrors.firstName}
          helperText={formErrors.firstName && 'Campo obligatorio'}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Apellidos"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ maxLength: 100 }}
          error={formErrors.lastName}
          helperText={formErrors.lastName && 'Campo obligatorio'}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ maxLength: 100 }}
          error={formErrors.email}
          helperText={formErrors.email && 'Campo obligatorio'}
          style={{ marginBottom: '20px' }}
        />
        <FormControl fullWidth required style={{ marginBottom: '20px' }}>
          <InputLabel>Provincia</InputLabel>
          <Select
            name="province"
            value={formData.province}
            onChange={handleChange}
            error={formErrors.province}
          >
            {provinces.map((province) => (
              <MenuItem key={province} value={province}>
                {province}
              </MenuItem>
            ))}
          </Select>
          {formErrors.province && <Typography variant="caption" color="error">Selecciona una provincia</Typography>}
        </FormControl>
        <FormControl fullWidth required style={{ marginBottom: '20px' }}>
          <InputLabel>Distrito</InputLabel>
          <Select
            name="district"
            value={formData.district}
            onChange={handleChange}
            error={formErrors.district}
          >
            {districts.map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
          {formErrors.district && <Typography variant="caption" color="error">Selecciona un distrito</Typography>}
        </FormControl>
        <TextField
          label="Dirección"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ maxLength: 100 }}
          error={formErrors.address}
          helperText={formErrors.address && 'Campo obligatorio'}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Contraseña"
          name="password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ maxLength: 100 }}
          error={formErrors.password}
          helperText={formErrors.password && 'Campo obligatorio'}
          style={{ marginBottom: '20px' }}
        />
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 1 }}>
          <Link to="/login" component={RouterLink} underline="hover">
            Ya tengo una cuenta
          </Link>
        </Stack>  
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Registrarse
        </LoadingButton>
      </form>
      </Stack>
      <Dialog open={successModalOpen} onClose={handleCloseModal}>
        <DialogTitle>¡Registro exitoso!</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Tu registro ha sido exitoso, ahora puedes iniciar sesión. ¡Bienvenido!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            Iniciar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
