import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useNavigate,useLocation } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button, Card, Stack } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
    AppNewsUpdate,
    AppOrderTimeline,

} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function Details() {
    const navigate = useNavigate();
    const location = useLocation();
    const [dataItems, setDataItems] = useState(location.state.detalle);

console.log(location.state)
    const handleBack = () => {
        navigate('/blog', { state: location.state });
      };
    

    return (
        <>
            <Helmet>
                <title> Details | Veterinaria </title>
            </Helmet>

            <Container maxWidth="xl">
                <br/>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Usuario
                </Typography>

                <Grid container spacing={3}>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppNewsUpdate
                            title="Veterinaria Pablito"
                            list={[...Array(5)].map((_, index) => ({
                                id: faker.datatype.uuid(),
                                title: faker.name.jobTitle(),
                                description: faker.name.jobTitle(),
                                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                                postedAt: faker.date.recent(),
                            }))}
                        />

                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>

                        <Grid item xs={12} sm={12} md={12}>
                            <AppOrderTimeline
                                title="Descripción"
                                list={[...Array(1)].map((_, index) => ({
                                    id: faker.datatype.uuid(),
                                    title: dataItems.description,
                                    type: `order${index + 1}`,
                                    time: faker.date.past(),
                                }))}
                            />
                        </Grid>
                        <br />
                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={6} md={6}>
                                <AppOrderTimeline
                                    title="Servicios"
                                    list={[...Array(1)].map((_, index) => ({
                                        id: faker.datatype.uuid(),
                                        title: 'Realizamos traslados en furgo, avión o AVE según la necesidad por tenerlo contigo' +
                                            'Haremos que tu peludo viva una experiencia increíble durante su viaje.',
                                        type: `order${index + 1}`,
                                        time: faker.date.past(),
                                    }))}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <AppOrderTimeline
                                    title="Ultimas noticias"
                                    list={[...Array(1)].map((_, index) => ({
                                        id: faker.datatype.uuid(),
                                        title: 'Realizamos traslados en furgo, avión o AVE según la necesidad por tenerlo contigo' +
                                            'Haremos que tu peludo viva una experiencia increíble durante su viaje.',
                                        type: `order${index + 1}`,
                                        time: faker.date.past(),
                                    }))}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <AppNewsUpdate
                                    title="Personal"
                                    list={[...Array(1)].map((_, index) => ({
                                        id: faker.datatype.uuid(),
                                        title: faker.name.jobTitle(),
                                        description: faker.name.jobTitle(),
                                        image: `/assets/images/covers/cover_${index + 1}.jpg`,
                                        postedAt: faker.date.recent(),
                                    }))}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}  onClick={handleBack}>
                                        Atras
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                                        Reseñas
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                                        Reservar Cita
                                    </Button>
                                </Grid>
                                <br />
                                <br />
                            </Grid>
                        </Stack>


                    </Grid>



                </Grid>
            </Container>
        </>
    );
}
