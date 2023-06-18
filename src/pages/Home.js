import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { HomeForm } from '../sections/@dashboard/home';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 800,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 900,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));


// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  const [tag1, setTag1] = useState(false);
  const [tag2, setTag2] = useState(false);
  const [tag3, setTag3] = useState(false);
  const [tag4, setTag4] = useState(false);

  const handleClick = () => {
    navigate('/login', { replace: true });
  };


  return (
    <>
      <Helmet>
        <title> Inicio </title>
      </Helmet>
      <br />


      <StyledRoot>
        <br />
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 20, sm: 30, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 5, mb: 5 }}>
              <Link variant="subtitle2">Veterinaria</Link>
              <Link variant="subtitle2">Servicios</Link>
            </Stack>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Mi mascota
            </Typography>
            <img
              className="image-portal"
              src="https://www.petsnvets.es/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage-search-bg.896de752.png&w=640&q=75"
              alt="logo"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" mb={5}>

            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClick}>
              Login
            </Button>
          </Stack>
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Encuentra y reserva los mejores cuidados para tu mascota

            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Una plataforma pensada para facilitarle la vida a tu mascota

            </Typography>

            <HomeForm />

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                .
              </Typography>
            </Divider>

            <Stack direction="row" spacing={3}>
              <Button fullWidth size="medium" style={{ color: tag1 ? '#03a9f4c7' : 'inherit' }} variant="outlined" onClick={() => setTag1(!tag1)}  >
                Visita presencial
              </Button>

              <Button fullWidth size="medium" style={{ color: tag2 ? '#03a9f4c7' : 'inherit' }} variant="outlined" onClick={() => setTag2(!tag2)} >
                Visita a domicilio
              </Button>

              <Button fullWidth size="medium" style={{ color: tag3 ? '#03a9f4c7' : 'inherit' }} variant="outlined" onClick={() => setTag3(!tag3)} >
                Visita a online
              </Button>

              <Button fullWidth size="medium" style={{ color: tag4 ? '#03a9f4c7' : 'inherit' }} variant="outlined" onClick={() => setTag4(!tag4)} >
                Urgencias
              </Button>


            </Stack>


          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
