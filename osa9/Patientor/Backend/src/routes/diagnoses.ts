import express from 'express';
import getDiagnoses from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req,res) => {
    const diagnoses = getDiagnoses();
    res.send(diagnoses);
});

export default router;