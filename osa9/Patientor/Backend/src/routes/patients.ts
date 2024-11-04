import express from 'express';
import getPatientInfo from '../services/patientService';

const router = express.Router();

router.get('/', (_req,res) => {
    const patients = getPatientInfo();
    res.send(patients);
});

export default router;