import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import ModalForm from '..//Modal/modalForm'

const Cards = () => {
  const [storedFormData, setStoredFormData] = useState(
    JSON.parse(localStorage.getItem('formArray')) || []
  );
  const [open, setOpen] = useState(false);
  const [personName, setPersonName] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [edit,setEdit] = useState()

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("formArray"));
    if (items) {
      setData(items);
    }
  }, []);
  useEffect(() => {
    if(open===false)
    {
        const items = JSON.parse(localStorage.getItem("formArray"));
    if (items) {
      setData(items);
    }
    }
  }, [open]);


  const handleDelete = (index) => {
    setDeleteIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedFormData = data.filter((item, i) => i !== deleteIndex);
    localStorage.setItem('formArray', JSON.stringify(updatedFormData));
    setData(updatedFormData);
    setIsModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteIndex(null);
    setIsModalOpen(false);
  };

    const handleEdit = (index) => {
         setEdit(index)
         console.log(66,edit)
         setOpen(true)
    };

    return (
        <>
        <div className='button'>
        <Button fullWidth color="primary" variant="contained" onClick={handleOpen}>Add Employee</Button>
        </div>
           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {data.map((item, index) => {
                return (
                    <Grid xs={4}>
                        <Card  style={{marginBottom:"20px"}}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} >
                                    Name: {item.name}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} >
                                    Email: {item.email}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} >
                                    Phone: {item.phone}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} >
                                    Department: {item.department}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} >
                                    Gender: {item.gender}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Button size="small" onClick={() => handleEdit(index)}>Edit</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" onClick={() => handleDelete(index)}>Delete</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
        <ModalForm open={open}  id={edit} handleClose={handleClose} handleOpen={handleOpen} />
            <Modal
        open={isModalOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Confirm delete
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this item?
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleDeleteCancel} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} variant="contained">Confirm</Button>
            </Box>
            </Box>
            </Modal>
        </>
    )
};

export default Cards;
