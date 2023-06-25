import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import AdminVetForm from '../sections/admin/ManageVet/ManageVetForm';
import { AddVeterinariaModal } from '../sections/admin/ManageVet/add';

// ----------------------------------------------------------------------

export default function AdminManageVetPage() {
  
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
