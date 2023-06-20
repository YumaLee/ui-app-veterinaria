import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Button, Box } from '@mui/material';
import { spacing } from '@mui/system';
import Iconify from '../components/iconify';
// components
import AdminVetForm from '../sections/admin/ManageVet/ManageVetForm';
import { AddVeterinariaModal } from '../sections/admin/ManageVet/add';

// ----------------------------------------------------------------------

export default function AdminManageVetPage() {
  
  // MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddVeterinaria = (veterinariaData) => {
    // Aquí puedes manejar la lógica para agregar la veterinaria a tu lista de veterinarias
    console.log(veterinariaData);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Veterinarias</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Veterinarias
          </Typography>
          <Box justifyContent="space-between">
            <Button onClick={handleOpenModal} variant="contained" color='primary' sx={{ m: '0.25rem' }} startIcon={<Iconify icon="eva:plus-fill" />}>
              Nuevo
            </Button>
            <Button variant="contained" color='warning' sx={{ m: '0.25rem' }} startIcon={<Iconify icon="eva:edit-fill" />}>
              Modificar
            </Button>
            <Button variant="contained" color='error' sx={{ m: '0.25rem' }} startIcon={<Iconify icon="eva:trash-fill" />}>
              Eliminar
            </Button>
          </Box>
          {/* Modal para agregar veterinaria */}
          <AddVeterinariaModal  />
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
            <AdminVetForm />
        </Stack>
      </Container>
    </>
  );
}
