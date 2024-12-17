import patientData from '../../data/patients';

import { Patient, NonSensitivePatientInfo } from '../types';

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};


const addPatient = (newPatient: Patient): Patient => {
    patientData.push(newPatient);
    return newPatient;
};

export default { getNonSensitivePatientInfo, addPatient };