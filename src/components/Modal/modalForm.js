import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Paper, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert } from '@mui/material';
import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    department: Yup.string().required('User name is required'),
    phone: Yup.string().required('Mobile is required'),
    gender: Yup.string().required('Please select role'),
    // password: Yup.string().required('Password is required').min(8, 'Password is too short').max(15, 'Password is too long'),
});

const ModalForm = ({ open, id, handleClose, handleOpen }) => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            gender: '',
            department: '',
            phone: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const existingFormData = JSON.parse(localStorage.getItem('formArray')) || [];
            let updatedFormData = [];

            if (id !== undefined) {
                updatedFormData = existingFormData.map((data, index) => {
                    if (index === id) {
                        return values;
                    }
                    return data;
                });
            } else {
                updatedFormData = [...existingFormData, values];
            }

            localStorage.setItem('formArray', JSON.stringify(updatedFormData));
            console.log(updatedFormData);
            resetForm({ values: "" })
            handleClose()
        },

    });

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem("formArray"));
        if (id !== undefined) {
            var obj = item[id];
            formik.setFieldValue("name", obj.name);
            formik.setFieldValue("email", obj.email);
            formik.setFieldValue("phone", obj.phone);
            formik.setFieldValue("department", obj.department);

        }
    }, [id])

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Paper
                            sx={{ padding: 4 }}
                        >
                            <form onSubmit={formik.handleSubmit}>
                                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign='left'>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </Grid>
                                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign='left'>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>
                                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign='left'>
                                    <TextField
                                        fullWidth
                                        id="phone"
                                        name="phone"
                                        label="phone"
                                        type="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                    />
                                </Grid>
                                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign='left'>
                                    <FormControl
                                        sx={{ width: '100%' }}
                                    // error={errors.role && touched.role}
                                    >
                                        <InputLabel variant="outlined" fullWidth>Department</InputLabel>
                                        <Select
                                            fullWidth
                                            variant="outlined"
                                            label="Department"
                                            name="department"
                                            sx={{ m: 1 }}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.department}
                                            error={formik.touched.department && Boolean(formik.errors.department)}
                                            helperText={formik.touched.department && formik.errors.department}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={"sales"}>Sales</MenuItem>
                                            <MenuItem value={"production"}>Production</MenuItem>
                                            <MenuItem value={"technician"}>Technician</MenuItem>
                                            <MenuItem value={"testing"}>Testing</MenuItem>
                                            <MenuItem value={"development"}>Development</MenuItem>
                                        </Select>
                                        {/* <FormHelperText>{errors.role && touched.role && (errors.role)}</FormHelperText> */}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign='left'>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label" fullWidth>Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="gender"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.gender}
                                            // error={formik.touched.gender && Boolean(formik.errors.gender)}
                                            helperText={formik.touched.gender && formik.errors.gender}
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                {/* <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign='left'>
                                    <Button variant="contained" type="submit">Save</Button>
                                </Grid> */}
                                <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="contained">Reset</Button>

                                    <Button color="primary" variant="contained" type="submit">
                                        Submit
                                    </Button>
                                </Grid>
                            </form>
                        </Paper>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default ModalForm;
