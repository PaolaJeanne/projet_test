import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; 
import apiClient from '../../services/api'; 
import { TextField, Button, Container } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../styles/Profile.css';


const UserProfile = () => {
    const { currentUser } = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('Le nom est requis'),
        last_name: Yup.string().required('Le prénom est requis'),
        username: Yup.string().required('Le nom d\'utilisateur est requis'),
        email: Yup.string().email('Email invalide').required('L\'email est requis'),
        phone_number: Yup.string().required('Le numéro de téléphone est requis'),
    });

    return (
        <Container>
            <h2>Profil utilisateur</h2>
            <Formik
                initialValues={{
                    first_name: currentUser ? currentUser.first_name : '',
                    last_name: currentUser ? currentUser.last_name : '',
                    username: currentUser ? currentUser.username : '',
                    email: currentUser ? currentUser.email : '',
                    phone_number: currentUser ? currentUser.phone_number : '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    try {
                        await apiClient.put('/accounts/me/', values);
                        alert('Profil mis à jour avec succès !');
                    } catch (error) {
                        console.error('Error updating profile', error);
                    }
                }}
                enableReinitialize
            >
                {() => (
                    <Form>
                        <Field
                            name="first_name"
                            as={TextField}
                            label="Nom"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <ErrorMessage name="first_name" component="div" style={{ color: 'red' }} />
                        
                        <Field
                            name="last_name"
                            as={TextField}
                            label="Prénom"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <ErrorMessage name="last_name" component="div" style={{ color: 'red' }} />
                        
                        <Field
                            name="username"
                            as={TextField}
                            label="Nom d'utilisateur"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
                        
                        <Field
                            name="email"
                            as={TextField}
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                        
                        <Field
                            name="phone_number"
                            as={TextField}
                            label="Numéro de téléphone"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <ErrorMessage name="phone_number" component="div" style={{ color: 'red' }} />
                        
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '16px' }}
                        >
                            Mettre à jour
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default UserProfile;