import React from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button, Container } from '@mui/material';
import apiClient from '../services/api'; 
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const stripePromise = loadStripe('your-publishable-key');

const PaymentForm = ({ appointmentId }) => {
    const stripe = useStripe();
    const elements = useElements();

    const validationSchema = Yup.object().shape({
        cardDetails: Yup.object().required('Les détails de la carte sont requis'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        if (!stripe || !elements) {
            setSubmitting(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
            alert('Une erreur est survenue lors du paiement.');
            setSubmitting(false);
        } else {
            alert('Paiement réussi !');
            // Utilisez paymentMethod ici pour enregistrer le paiement
            try {
                await apiClient.post('/payments', {
                    appointmentId,
                    paymentMethodId: paymentMethod.id, // Utilisez l'ID du mode de paiement
                });
                console.log('Détails du paiement enregistrés avec succès.');
            } catch (err) {
                console.error('Erreur lors de l\'enregistrement du paiement', err);
            }
            setSubmitting(false);
        }
    };

    return (
        <Container>
            <Formik
                initialValues={{ cardDetails: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <CardElement />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            disabled={!stripe || isSubmitting} 
                            style={{ marginTop: '16px' }}
                        >
                            Payer
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

const PaymentFormWrapper = ({ appointmentId }) => (
    <Elements stripe={stripePromise}>
        <PaymentForm appointmentId={appointmentId} />
    </Elements>
);

export default PaymentFormWrapper;