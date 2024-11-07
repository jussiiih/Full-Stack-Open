
import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req,res) => {
    const patients = patientService.getNonSensitivePatientInfo();
    res.send(patients);
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({error: error.issues});
        } else {
            res.status(400).send({error: 'unknown error'});
        }
    }
    /*} catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }*/

        /*const { name, dateOfBirth, ssn, gender, occupation } = req.body;
        const addedPatient = patientService.addPatient(name, dateOfBirth, ssn, gender, occupation);
        res.json(addedPatient);*/

});

export default router;