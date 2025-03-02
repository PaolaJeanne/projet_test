import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiClient from '../../services/api';
import { TextField, Button, Container } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../styles/AppointmentForm.css';


const AppointmentForm = ({ expertId }) => {
    const { currentUser } = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        datetime: Yup.date().required('La date et l\'heure sont requises').nullable(),
    });

    return (
        <Container>
            <h2>Réserver un Rendez-vous</h2>
            <Formik
                initialValues={{ datetime: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    try {
                        await apiClient.post('/appointments/', {
                            expert: expertId,
                            datetime: values.datetime,
                            client: currentUser.id,
                        });
                        alert('Rendez-vous créé avec succès !');
                    } catch (error) {
                        console.error('Error creating appointment', error);
                    }
                }}
            >
                {() => (
                    <Form>
                        <Field
                            name="datetime"
                            as={TextField}
                            type="datetime-local"
                            label="Date et Heure"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        <ErrorMessage name="datetime" component="div" style={{ color: 'red' }} />
                        <Button type="submit" variant="contained" color="primary">
                            Réserver
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default AppointmentForm;