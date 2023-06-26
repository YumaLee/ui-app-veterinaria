import { useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';

// @mui
import { Grid, Button, Container, Stack, Typography, Link, TextField, MenuItem } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------
const author = {
  name: 'holaa',
  avatarUrl: `/assets/images/avatars/avatar_${1}.jpg`,
};


const parafilter = [
  {
    value: 'USD',
    label: 'Perro',
  },
  {
    value: 'EUR',
    label: 'Gato',
  },
  {
    value: 'BTC',
    label: 'Toro',
  },
  {
    value: 'JPY',
    label: 'Ballena',
  },
];
const ciudadfilter = [
  {
    value: 'USD',
    label: 'San Isidro',
  },
  {
    value: 'EUR',
    label: 'Chorrillos',
  },
  {
    value: 'BTC',
    label: 'Breña',
  },
  {
    value: 'JPY',
    label: 'Miraflores',
  },
];

const serviciosfilter = [
  {
    value: 'USD',
    label: 'Adopcion',
  },
  {
    value: 'EUR',
    label: 'Clinica de Dolor',
  },
  {
    value: 'BTC',
    label: 'Citologia',
  },
  {
    value: 'JPY',
    label: 'Masaje',
  },
];
const estrellasfilter = [
  {
    value: 'USD',
    label: '2 estrellas',
  },
  {
    value: 'EUR',
    label: '4 Estrellas',
  },

];

// ----------------------------------------------------------------------
console.log(POSTS)
export default function BlogPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const [dataItems, setDataItems] = useState(location.state);
  console.log(location);
  console.log(dataItems)


  const openInformation = (data) => {
    const newDta = dataItems;
    newDta.detalle = data;

    navigate('/details', { state: newDta});

  }


  return (
    <>
      <Helmet>
        <title> Veterinaria </title>
      </Helmet>

      <Container maxWidth={1100}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" marginTop={5} mb={5}>
          <Link variant="subtitle2" href="/dashboard/home">Inicio</Link>

          <Typography variant="h5" gutterBottom>
            Veterinarios
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Mostrar Mapa
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={dataItems.items} />
          <Stack spacing={3}>
            <TextField name="buscar" label="" placeholder="Categoria" sx={{ width: 180 }}
              select >
              {parafilter.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack spacing={3}>
            <TextField name="buscar" label="" placeholder="Ciudad" sx={{ width: 280 }} select>
              {ciudadfilter.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack spacing={3}>
            <TextField name="buscar" label="" placeholder="Servicios" sx={{ width: 280 }} select>

              {serviciosfilter.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack spacing={3}>
            <TextField name="buscar" label="" placeholder="Estrellas" sx={{ width: 180 }} select>
              {estrellasfilter.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {dataItems.items.map((post, index) => (
            <BlogPostCard
              key={post.idVet}
              post={post}
              index={index}
              open={openInformation}
              author={author}

            />
          ))}
        </Grid>
      </Container>
    </>
  );
}
