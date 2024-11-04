import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatientInfo } from '../types';

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (
    name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string): Patient => {
        const patients: Patient[] = patientData;
        const id: string = uuid();
        const newPatient = { id, name, dateOfBirth, ssn, gender, occupation };
        
        patients.push(newPatient);
        return newPatient;
    };

export default { getNonSensitivePatientInfo, addPatient };