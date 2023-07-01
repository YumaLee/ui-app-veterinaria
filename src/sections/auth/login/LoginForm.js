
import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const ERP = "https://lpwi1gf1y1.execute-api.us-east-1.amazonaws.com/dev/v1/oauth/token";

  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [recaptchaRef, setRecaptchaRef] = useState(React.createRef());

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClick = () => {

    if (username === '' || password === '') {
      Swal.fire('Los campos son obligatorios');
      return false;
    }

    if (!isValidEmail(username)) {
      Swal.fire('El correo electrónico no es válido.');
      return false;
    }
    const recaptchaValue = recaptchaRef.current.getValue();
    if (recaptchaValue === "") {
      Swal.fire("Confirmación de captcha incorrecta.");

      return false;
    }

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    formData.append("grant_type", "password");

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: 'frontend-app',
        password: '12345',
      },
    };

    const response = axios.post(ERP, formData.toString(), config)
      .then((response) => {
        // Handle success
        const jsonValue = JSON.stringify(response.data);
        AsyncStorage.setItem('usuario', jsonValue);

        navigate('/dashboard/home', { replace: true });
      })
      .catch((error) => {
        // Handle error
        const msg = error.response.data;
        if (msg.error === "invalid_grant") {
          Swal.fire('Password incorrecto');
        }

        if (msg.error === "unauthorized") {
          Swal.fire(msg.error_description);
        }
      });

    return response

  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={(e) => setUsername(e.target.value)}
          value={username}

        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}

          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <br />
      <Stack type="flex" justify="center" className="mb-10">
        <ReCAPTCHA
          sitekey="6LfDCVYUAAAAAMXzezGq9UkllGXJjoN25BLF5bXQ"
          ref={recaptchaRef}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
