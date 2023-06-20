import React, { useState } from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, Box, Rating, TextField, Pagination, Container } from '@mui/material';

const veterinarias = [
  {
    id: 1,
    name: 'Veterinaria A',
    image: '/assets/images/vets/vet_1.jpg',
    rating: 4.5,
    description: 'Esta es una descripción de la veterinaria A.',
  },
  {
    id: 2,
    name: 'Veterinaria B',
    image: '/assets/images/vets/vet_1.jpg',
    rating: 3.2,
    description: 'Esta es una descripción de la veterinaria B.',
  },
  {
    id: 3,
    name: 'Veterinaria C',
    image: '/assets/images/vets/vet_1.jpg',
    rating: 2.2,
    description: 'Esta es una descripción de la veterinaria C.',
  },
  {
    id: 4,
    name: 'Veterinaria D',
    image: '/assets/images/vets/vet_1.jpg',
    rating: 1.2,
    description: 'Esta es una descripción de la veterinaria D.',
  },
  // Agrega más objetos de veterinarias según necesites
];

export default function AdminVetForm () {
  
  const [selectedVeterinaria, setSelectedVeterinaria] = useState(null);

  const handleVeterinariaClick = (veterinaria) => {
    setSelectedVeterinaria(veterinaria.id);
    const seleccionado=`seleccionado: ${veterinaria.id}`;
    alert(seleccionado)
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredVeterinarias = veterinarias.filter((veterinaria) =>
    veterinaria.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredVeterinarias.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVeterinarias = filteredVeterinarias.slice(startIndex, endIndex);
  

  return (
    <Container>
      <TextField
        label="Buscar"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
      <Grid container spacing={2}>
        {currentVeterinarias.map((veterinaria) => (
          <Grid item xs={12} sm={6} md={4} key={veterinaria.id}>
            <Card
              onClick={() => handleVeterinariaClick(veterinaria)}
              sx={{
                cursor: 'pointer',
                boxShadow: selectedVeterinaria === veterinaria.id ? '0 0 5px 2px rgba(0, 0, 0, 0.2)' : 'none',
              }}
            >
                <CardMedia
                  component="img"
                  height="200"
                  image={veterinaria.image}
                  alt={veterinaria.name}
                />
                <CardContent>
                  <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
                    <Typography variant="h6" component="span" style={{ marginRight: '10px' }}>
                      {veterinaria.name}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Rating value={veterinaria.rating} precision={0.5} readOnly />
                  </Box>
                  <Typography variant="body1" color="textSecondary">
                    {veterinaria.description}
                  </Typography>
                </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};
