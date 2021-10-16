import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import {  Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { addToPatientInfoList, useStateValue } from '../state';
import { Patient } from '../types';

interface PatientDetailsParams {
  id: string
}

const PatientDetailsPage = () => {
  const { id } = useParams<PatientDetailsParams>();
  const [{ patientInfo }, dispatch] = useStateValue();
  const currentPatient = Object.values(patientInfo).find((p) => p.id == id);


  React.useEffect(() => {
    //check state for patient
    //currentPatient = Object.values(patientInfo).find((p) => p.id == id);
  

    //fetch the patient
    const fetchPatientInfo = async () => {

      try {
        const response = await axios.get<Patient>(apiBaseUrl + '/patients/' + id);
        const patient = response.data;
        console.log(patient);
        //put patient in state
        dispatch(addToPatientInfoList(patient));

      } catch (error) {
        console.error(error);
      }

    };

    if (!currentPatient || currentPatient ==undefined || currentPatient == null ) {
      void fetchPatientInfo();
    }
    
  }, [dispatch, currentPatient]);

  return (
    <div>
      {currentPatient ?
        <div>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ display: "inline", paddingRight: 10, margin: 0 }} >{currentPatient.name} </h1>
            <div><Icon name={currentPatient.gender == 'male' ? 'mars' : 'venus'} size='large' /></div>
          </span>

          <p>ssn: {currentPatient.ssn}</p>
          <p>occupation {currentPatient.occupation}</p>
          <p>{currentPatient.dateOfBirth}</p>
        </div> :
        <h1>Loading</h1>}
    </div>
  );
};

export default PatientDetailsPage;
