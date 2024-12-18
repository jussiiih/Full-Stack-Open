import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { useEffect, useState } from "react";
import patientService from "../services/patients";

const PatientPage = (): JSX.Element => {
    const { id } = useParams();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
        if (id) {
          const patientData = await patientService.getPatient(id);
          setSelectedPatient(patientData);
        }
    };

    void fetchPatient();
  }, [id]);

    if (selectedPatient) {
        return (
            <div>
                <h2>{selectedPatient.name}</h2>
                <p>Occupation: {selectedPatient.occupation}</p>
                <p>Gender: {selectedPatient.gender}</p>

            </div>
    
        );
    }
    else {
        return (
            <p>Patient not found</p>
        );
    }

};

export default PatientPage;