import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid, Card, CardMedia, CardContent, Box, Rating, TextField, Pagination, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '300px',
  width: '100%'
}));

const CustomLoader = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export default function AdminVetForm({ handleSelectVet }) {
  const [veterinarias, setVeterinarias] = useState([]);
  const [selectedVeterinaria, setSelectedVeterinaria] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchVets = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('https://lpwi1gf1y1.execute-api.us-east-1.amazonaws.com/dev/v1/vets/find-all', {
        page: currentPage,
        size: itemsPerPage
      });
      const { items, totalPages } = response.data;
      setVeterinarias(items);
      setTotalPages(totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching veterinarias:', error);
      setIsLoading(false);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    fetchVets();
  }, [currentPage, itemsPerPage]);
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVeterinarias = veterinarias.filter((veterinaria) =>
    veterinaria.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    setSearchTerm('');
  };

  const handleVeterinariaClick = (veterinaria) => {
    setSelectedVeterinaria(veterinaria.idVet);
    handleSelectVet(veterinaria.idVet);
  };

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
      <Box mt={3} display="flex" justifyContent="center" mb={3}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
      </Box>
      <Grid container spacing={2}>
      {isLoading ? (
          <LoadingContainer>
            <CustomLoader size={60} thickness={5} />
          </LoadingContainer>
        ) : (
          filteredVeterinarias.map((veterinaria) => (
          <Grid item xs={12} sm={6} md={4} key={veterinaria.idVet}>
            <Card
              onClick={() => handleVeterinariaClick(veterinaria)}
              sx={{
                cursor: 'pointer',
                boxShadow: selectedVeterinaria === veterinaria.idVet ? '0 0 5px 2px rgba(0, 0, 0, 0.2)' : 'none',
              }}
            >
              <CardMedia component="img" height="200" image={veterinaria.imageUrl} alt={veterinaria.name} />
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
                  <Typography variant="h6" component="span" style={{ marginRight: '10px' }}>
                    {veterinaria.name}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Rating value={veterinaria.rating} precision={0.5} readOnly />
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  {veterinaria.description}
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography variant="body1" color="text.secondary">
                    Servicios: {veterinaria.vetServices.map((service) => service.name).join(', ')}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography variant="body1" color="text.secondary">
                    Especies: {veterinaria.species.map((specie) => specie.name).join(', ')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
