import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import swal from 'sweetalert';

const ImagePreview = ({ imageUrl }) => (
  <div style={{ maxWidth: '200px', marginTop: '10px' }}>
    <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%' }} />
  </div>
);

export default function AddVetForm() {
  const [open, setOpen] = useState(false);
  const [vetData, setVetData] = useState({
    vetName: '',
    vetAddress: '',
    vetPhone: '',
    vetDescription: '',
    vetImage: null,
    submitClicked: false,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setVetData({
      vetName: '',
      vetAddress: '',
      vetPhone: '',
      vetDescription: '',
      vetImage: null,
      submitClicked: false,
    });
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setVetData((prevState) => ({
      ...prevState,
      vetImage: URL.createObjectURL(imageFile),
    }));
  };

  const handleSubmit = () => {
    const formDataValues = Object.values(vetData);
    const hasErrors = formDataValues.some((value) => value === '');

    setVetData((prevState) => ({
      ...prevState,
      submitClicked: true,
    }));

    if (hasErrors) {
      swal('Error', 'Por favor, completa todos los campos.', 'error');
      return;
    }

    if (vetData.vetImage === null) {
      swal('Error', 'Por favor, selecciona una imagen.', 'error');
      return;
    }

    // Si todos los campos están completos, muestra el mensaje de éxito
    swal('Éxito', 'La veterinaria se ha guardado correctamente.', 'success');

    // Limpiar el formulario
    setVetData({
      vetName: '',
      vetAddress: '',
      vetPhone: '',
      vetDescription: '',
      vetImage: null,
      submitClicked: false,
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Abrir formulario</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar veterinaria</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <TextField
              label="Nombre de la veterinaria"
              name="vetName"
              value={vetData.vetName}
              onChange={handleInputChange}
              required
              fullWidth
              error={vetData.vetName === '' && vetData.submitClicked}
              helperText={vetData.vetName === '' && vetData.submitClicked ? 'Este campo es requerido' : ''}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Dirección"
              name="vetAddress"
              value={vetData.vetAddress}
              onChange={handleInputChange}
              required
              fullWidth
              error={vetData.vetAddress === '' && vetData.submitClicked}
              helperText={vetData.vetAddress === '' && vetData.submitClicked ? 'Este campo es requerido' : ''}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Teléfono"
              name="vetPhone"
              value={vetData.vetPhone}
              onChange={handleInputChange}
              required
              fullWidth
              error={vetData.vetPhone === '' && vetData.submitClicked}
              helperText={vetData.vetPhone === '' && vetData.submitClicked ? 'Este campo es requerido' : ''}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Descripción"
              name="vetDescription"
              value={vetData.vetDescription}
              onChange={handleInputChange}
              required
              multiline
              fullWidth
              error={vetData.vetDescription === '' && vetData.submitClicked}
              helperText={vetData.vetDescription === '' && vetData.submitClicked ? 'Este campo es requerido' : ''}
              sx={{ mb: 2 }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {vetData.vetImage && (
              <ImagePreview imageUrl={vetData.vetImage} />
            )}
            {vetData.vetImage === null && vetData.submitClicked && (
              <div style={{ color: 'red' }}>Por favor, selecciona una imagen.</div>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

