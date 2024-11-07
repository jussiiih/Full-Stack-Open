import { Patient, Gender } from './types';
import { v1 as uuid } from 'uuid';
import { z } from 'zod';

/*const isString = (text:unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseName = (name: unknown): string => {
    return z.string().parse(name);
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing Date of Birth' + dateOfBirth);
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateOfBirth)) {
        throw new Error('Date of Birth must be in the format YYYY-MM-DD');
    }
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing SSN');
    }
    return ssn;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(value => value.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};*/

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});

export const toNewPatient = (object: unknown): Patient => {
    const parsedData = NewPatientSchema.parse(object);
    return { ...parsedData, id: uuid() };
};

/*const toNewPatient = (object: unknown): Patient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    };
    
    if ('name' in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
        const newPatient: Patient = {
            id: uuid(),
            name: z.string().parse(object.name),
            dateOfBirth: z.string().date().parse(object.dateOfBirth),
            ssn: z.string().parse(object.ssn),
            gender: z.nativeEnum(Gender).parse(object.gender),
            occupation: z.string().parse(object.occupation),
        };
        
        return newPatient;
    };

    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;*/