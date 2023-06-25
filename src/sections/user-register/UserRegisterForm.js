import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';

export const ERP = "https://lpwi1gf1y1.execute-api.us-east-1.amazonaws.com/dev/v1/";
// ----------------------------------------------------------------------
export default function UserRegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const responseProvinces = await axios.get(`${ERP}ubigeo/provinces`);
        const provincesData = responseProvinces.data;

        // Filtrar la lista de la provincia de Lima
        const filteredProvinces = provincesData.filter(
          (province) => province.idProvince === '1501'
        );
        
        const responseDistricts = await axios.get(`${ERP}ubigeo/districts`);
        const districtsData = responseDistricts.data;

        // Filtrar la lista de los distritos de Lima
        const filteredDistricts = districtsData.filter(
          (district) => district.idProvince === '1501'
        );

        setProvinces(filteredProvinces);
        setDistricts(filteredDistricts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProvinces();
  }, []);

  const fetchUserRegister = async (userData) => {
    try {
      const responseUserRegister = await axios.post(`${ERP}clients`, JSON.stringify(userData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('responseUserRegister')
      console.log(responseUserRegister)
      console.log('responseUserRegister')

      if(responseUserRegister.status === 201){
        SweetAlertMessage('Registrar Usuario', 'Usuario Registrado', 'success', '/login');
      } else {
        Swal.fire({
          title: 'Registrar Usuario',
          text: 'No se ha podido guardar su información',
          icon: 'warning',
        });
      }
    } catch (error) {
        // Manejar errores
        const errorMessage = error.response.data;

        if (error.response && error.response.status === 409) {
          // El código de estado de la respuesta es 409 (Conflict)
          // Maneja el caso de conflicto aquí
          console.log(errorMessage);
          Swal.fire({
            title: 'Registrar Usuario',
            text: errorMessage.detail,
            icon: 'error',
          });
        } else {
          // Maneja otros errores de red u otras excepciones aquí
          Swal.fire({
            title: 'Registrar Usuario',
            text: errorMessage.title,
            icon: 'error',
          });
          console.error(errorMessage);
        }
    }
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    province: '',
    district: '',
    address: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  
  const cleanForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      province: '',
      district: '',
      address: '',
      password: '',
    });
  }

  const SweetAlertMessage = (title, message, type, link) => {
    Swal.fire({
      title,
      text: message,
      icon: type,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Ir a Inicio de Sesión',
      cancelButtonText: 'Salir',
      showCloseButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        navigate(link, { replace: true });
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.close) {
        // Código para manejar el cierre del diálogo
      } else if (result.isConfirmed) {
        // Código para manejar el clic en "Aceptar"
      } else if (result.isDenied) {
        // Código para manejar el clic en "Cancelar"
      }
    });
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [event.target.name]: event.target.value });
    setFormErrors({});
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\+?(\d{1,3})?(\d{9})$/;
    return phoneNumberRegex.test(phoneNumber);
  };
  
  
  const handleKeyDown = (event) => {
    if (event.target.name === 'firstName' || event.target.name === 'lastName') {
      const keyPressed = event.key;
      const value = event.target.value;
      const regex = /^[a-zA-Z\s]*$/; // Expresión regular para letras y espacios
  
      // Verificar si se presionó un espacio al inicio del texto
      if (keyPressed === ' ' && value.trim() === '') {
        event.preventDefault();
      }
  
      // Verificar si se presionó un carácter no válido
      if (!regex.test(keyPressed)) {
        event.preventDefault();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar campos requeridos
    let hasErrors = false;
    const newFormErrors = {};
  
    Object.keys(formData).forEach((key) => {
      if (formData[key] === '') {
        newFormErrors[key] = 'Campo obligatorio.';
        hasErrors = true;
      }
    });

    if (!isValidEmail(formData.email)) {
      newFormErrors.email = 'El correo electrónico no es válido.';
      hasErrors = true;
    }

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      newFormErrors.phoneNumber = 'El número de télefono no tiene el formato válido.';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setFormErrors(newFormErrors);
      return;
    }
    
    const userData = {
      "phoneNumber": formData.phoneNumber,
      "user": {
        "password": formData.password,
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "email": formData.email
      },
      "address": {
        "direction": formData.address,
        "district": {
          "idDistrict": formData.district
        }
      }
    };

    fetchUserRegister(userData);
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
          onKeyDown={handleKeyDown}
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
          onKeyDown={handleKeyDown}
          fullWidth
          required
          inputProps={{ maxLength: 10 }}
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
          helperText={formErrors.email && 'El correo electrónico no es válido.'}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Teléfono"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ maxLength: 15, inputMode: 'tel' }}
          error={formErrors.phoneNumber}
          helperText={formErrors.phoneNumber && 'El número de télefono no tiene el formato válido.'}
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
              <MenuItem key={province.idProvince} value={province.idProvince}>
                {province.name}
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
              <MenuItem key={district.idDistrict} value={district.idDistrict}>
                {district.name}
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
    </>
  );
}
