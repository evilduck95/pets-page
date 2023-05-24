import React from 'react';
import { Button, Modal, Form, ButtonGroup } from 'react-bootstrap';

import './style/new-medication-modal.css';

const NewMedicationModal = ({ petName, shown, closeCallback, confirmCallback}) => {
    return (
        <Modal centered show={shown} onHide={closeCallback} className='med-modal'>
            <Modal.Header closeButton>
                <Modal.Title>Add Medication for {petName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={confirmCallback}>
                    <Form.Group className='mb-3' controlId='formMedication'>
                        <Form.Label>Medication Name *</Form.Label>
                        <Form.Control type='text' required placeholder='Name'/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBrand'>
                        <Form.Label>Medication Brand</Form.Label>
                        <Form.Control type='text' placeholder='Brand'/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formDosage'>
                        <Form.Label>Dosage</Form.Label>
                        <Form.Control type='text' placeholder='Dosage in mg or ml'/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formFrequency'>
                        <Form.Label>Frequency</Form.Label>
                        <Form.Control type='text' placeholder='How many times per day?'/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formCount'>
                        <Form.Label>Count</Form.Label>
                        <Form.Control type='text' placeholder='If pill based, how many for each treatment?'/>
                    </Form.Group>
                    <ButtonGroup>
                        <Button variant='secondary' onClick={closeCallback}>
                            Cancel
                        </Button>
                        <Button type='submit' variant='primary'>
                            Confirm
                        </Button>
                    </ButtonGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                * Required Field
            </Modal.Footer>
        </Modal>
    );
}

export default NewMedicationModal;