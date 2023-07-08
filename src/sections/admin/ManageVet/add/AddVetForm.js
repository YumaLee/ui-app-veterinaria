// Adecualo aqui la captura del value del autocomplete, ya que el valor del id se enviara al endpoint no el label
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Autocomplete, FormControl, InputLabel, Select, MenuItem, Chip, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import Iconify from '../../../../components/iconify';

export const ERP = "https://lpwi1gf1y1.execute-api.us-east-1.amazonaws.com/dev/v1/";

export default function AddVetForm() {
  const [open, setOpen] = useState(false);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  useEffect(() => {
    fetch(`${ERP}species`)
      .then((response) => response.json())
      .then((data) => {
        // Mapear los datos del endpoint para obtener las opciones del Autocomplete
        const options = data.map((species) => ({
          label: species.name,
          value: species.idSpecie,
        }));
        setSpeciesOptions(options);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
    
    fetch(`${ERP}vet-services`)
      .then((response) => response.json())
      .then((data) => {
        // Mapear los datos del endpoint para obtener las opciones del Autocomplete
        const options = data.map((services) => ({
          label: services.name,
          value: services.idVetService,
        }));
        setServicesOptions(options);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });

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

  const fetchVetRegister = async (vetData) => {
    try {
      const responseUserRegister = await axios.post(`${ERP}vets`, JSON.stringify(vetData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if(responseUserRegister.status === 201){
        sweetAlert('Registrar Veterinaria', 'Veterinaria Registrada. La veterinaria se ha guardado correctamente.', 'success');
        // Limpiar el formulario
        cleanForm();
      } else {
        sweetAlert('Registrar Veterinaria', 'No se ha podido guardar su información', 'warning');
      }
    } catch (error) {
        // Manejar errores
        const errorMessage = error.response.data;

        if (error.response && error.response.status === 409) {
          // El código de estado de la respuesta es 409 (Conflict)
          sweetAlert('Registrar Veterinaria', errorMessage.detail, 'error');
        } else {
          // Maneja otros errores de red u otras excepciones aquí
          sweetAlert('Registrar Veterinaria', errorMessage.title, 'error');
        }
    }
  };

  const SweetAlertMessage = (title, type) => {
    return Swal.fire({
      title,
      text: `¿Está seguro de ${type} la veterinaria?`,
      icon: 'info',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: type,
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        // navigate(link, { replace: true });
      },
      customClass: {
        container: 'my-swal-container',
      },
    });
  };

  const sweetAlert = (title, message, icon) => {
    Swal.fire({
      title,
      text: message,
      icon,
      customClass: {
        container: 'my-swal-container',
      },
    });
  };

  const [vetData, setVetData] = useState({
    vetName: '',
    vetAddress: '',
    vetPhone: '',
    vetDescription: '',
    vetDistrict: null,
    vetProvince: null,
    vetImage: '',
    submitClicked: false,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    cleanForm();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVetData((prevState) => ({
      ...prevState,
      [name]: value,
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
      sweetAlert('Error', 'Por favor, completa todos los campos.', 'error');
      return;
    }

    if (vetData.vetImage === '') {
      sweetAlert('Error', 'Por favor, selecciona una imagen.', 'error');
      return;
    }
    
    if (selectedSpecies.length === 0) {
      sweetAlert('Error', 'Por favor, selecciona al menos una especie.', 'error');
      return;
    }

    if (!isValidPhoneNumber(vetData.vetPhone)) {
      sweetAlert('Error', 'Por favor, el número de télefono no tiene el formato válido.', 'error');
      return;
    }
    
    const vetSpecies = selectedSpecies.map((option) => ({
      idSpecie: option.value,
    }));

    const vetServices = selectedServices.map((option) => ({
      idVetService: option.value,
    }));

    const vetsData = {
      "name": vetData.vetName,
      "description": vetData.vetDescription,
      "address": vetData.vetAddress,
      "imageUrl": vetData.vetImage,
      "phoneNumber": vetData.vetPhone,
      "species": vetSpecies,
      "vetServices": vetServices,
      "district": {
        "idDistrict": vetData.vetDistrict
      }
    };

    SweetAlertMessage('Registrar Veterinaria', 'Registrar').then((result) => {
      if (result.dismiss === Swal.DismissReason.close) {
        // Código para manejar el cierre del diálogo
      } else if (result.isConfirmed) {
        // Código para manejar el clic en "Aceptar"
        fetchVetRegister(vetsData);
      } else if (result.isDenied) {
        // Código para manejar el clic en "Cancelar"
      }
    });
  };

  const cleanForm = () => {
    setVetData({
      vetName: '',
      vetAddress: '',
      vetPhone: '',
      vetDescription: '',
      vetDistrict: null,
      vetProvince: null,
      vetImage: '',
      submitClicked: false,
    });
    setSelectedSpecies([]);
    setOpen(false);
  }
  
  const handleSpeciesChange = (event, values) => {
    setSelectedSpecies(values);
    setVetData((prevData) => ({
      ...prevData,
      vetSpecies: values.map((option) => ({
        idSpecie: option.value,
      })),
    }));
  };

  const handleServicesChange = (event, values) => {
    setSelectedServices(values);
    setVetData((prevData) => ({
      ...prevData,
      vetServices: values.map((option) => ({
        idVetService: option.value,
      })),
    }));
  };
  
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\+?(\d{1,3})?(\d{9})$/;
    return phoneNumberRegex.test(phoneNumber);
  };
  
  return (
    <div>
      <Box justifyContent="space-between">
        <Button onClick={handleOpen} variant="contained" color='primary' sx={{ m: '0.25rem' }} startIcon={<Iconify icon="eva:plus-fill" />}>
          Nuevo
        </Button>
        <Button variant="contained" color='warning' sx={{ m: '0.25rem' }} startIcon={<Iconify icon="eva:edit-fill" />}>
          Modificar
        </Button>
        <Button variant="contained" color='error' sx={{ m: '0.25rem' }} startIcon={<Iconify icon="eva:trash-fill" />}>
          Eliminar
        </Button>
      </Box>
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
            <FormControl fullWidth required style={{ marginBottom: '20px' }}>
              <InputLabel>Provincia</InputLabel>
              <Select
                name="vetProvince"
                value={vetData.vetProvince}
                onChange={handleInputChange}
                error={vetData.vetProvince === null && vetData.submitClicked} sx={{ mb: 2 }}
              >
                {provinces.map((province) => (
                  <MenuItem key={province.idProvince} value={province.idProvince}>
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
              {!vetData.vetProvince && vetData.submitClicked && <Typography variant="caption" color="error">Selecciona una provincia</Typography>}
            </FormControl>
            <FormControl fullWidth required style={{ marginBottom: '20px' }}>
              <InputLabel>Distrito</InputLabel>
              <Select
                name="vetDistrict"
                value={vetData.vetDistrict}
                onChange={handleInputChange}
                error={vetData.vetDistrict === null && vetData.submitClicked} sx={{ mb: 2 }}
              >
                {districts.map((district) => (
                  <MenuItem key={district.idDistrict} value={district.idDistrict}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
              {!vetData.vetDistrict && vetData.submitClicked && <Typography variant="caption" color="error">Seleccione un distrito</Typography>}
            </FormControl>
            <Autocomplete
              multiple
              options={servicesOptions}
              getOptionLabel={(option) => option.label}
              value={selectedServices}
              onChange={handleServicesChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecciona servicio"
                  error={selectedServices.length === 0 && vetData.submitClicked}
                  helperText={selectedServices.length === 0 && vetData.submitClicked ? 'Este campo es requerido' : ''}
                  limitTags={false}
                  sx={{ mb: 2 }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.label}
                    {...getTagProps({ index })}
                  />
                ))
              } sx={{ mb: 2 }}
            />
            <Autocomplete
              multiple
              options={speciesOptions}
              getOptionLabel={(option) => option.label}
              value={selectedSpecies}
              onChange={handleSpeciesChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecciona especie"
                  error={selectedSpecies.length === 0 && vetData.submitClicked}
                  helperText={selectedSpecies.length === 0 && vetData.submitClicked ? 'Este campo es requerido' : ''}
                  limitTags={false}
                  sx={{ mb: 2 }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.label}
                    {...getTagProps({ index })}
                  />
                ))
              } sx={{ mb: 2 }}
            />
            <TextField
              label="Imagen"
              name="vetImage"
              value={vetData.vetImage}
              onChange={handleInputChange}
              required
              fullWidth
              error={vetData.vetImage === '' && vetData.submitClicked}
              helperText={vetData.vetImage === '' && vetData.submitClicked ? 'Este campo es requerido' : ''}
              sx={{ mb: 2 }}
            />
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

