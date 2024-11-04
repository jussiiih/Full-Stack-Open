import patientData from '../../data/patients';

import { NonSensitivePatientInfo } from '../types';

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

export default getNonSensitivePatientInfo;