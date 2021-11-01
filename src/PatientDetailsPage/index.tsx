import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { AddEntryModal } from '../AddEntryModal';
import { apiBaseUrl } from '../constants';
import { addToDiagnoses, addToPatientInfoList, useStateValue } from '../state';
import { Diagnosis, Patient } from '../types';
import { EntryDetails } from './EntryDetails';

interface PatientDetailsParams {
  id: string
}

const PatientDetailsPage = () => {
  const { id } = useParams<PatientDetailsParams>();
  const [{ patientInfo, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const currentPatient = Object.values(patientInfo).find((p) => p.id == id);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


  React.useEffect(() => {
    //check state for patient
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

    if (!currentPatient || currentPatient == undefined || currentPatient == null) {
      void fetchPatientInfo();
    }

  }, [dispatch, currentPatient]);

  React.useEffect(() => {
    //check state for Diagnoses
    //fetch the Diagnoses
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get<Diagnosis[]>(apiBaseUrl + '/diagnoses/');
        const fetchedDiagnoses = response.data;
        //put Diagnoses in state
        dispatch(addToDiagnoses(fetchedDiagnoses));

      } catch (error) {
        console.error(error);
      }
    };

    if (!diagnoses || diagnoses.length < 1 || diagnoses == null) {
      void fetchDiagnoses();
    }

  }, [dispatch]);

  const genderIcons = () => {
    switch (currentPatient?.gender) {
      case 'male': return 'mars';
      case 'female': return 'venus';
      case 'other': return 'other gender horizontal';
      default:
        return 'mars';
    }
  };
  //{currentPatient.gender == 'male' ? 'mars' : 'venus'}


  return (
    <div>
      {currentPatient ?
        <div>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ display: "inline", paddingRight: 10, margin: 0 }} >{currentPatient.name} </h1>
            <div><Icon name={genderIcons()} size='large' /></div>
          </span>

          <p>ssn: {currentPatient.ssn}</p>
          <p>occupation: {currentPatient.occupation}</p>
          <p>{currentPatient.dateOfBirth}</p>
          <AddEntryModal  
            modalOpen={modalOpen}
            onSubmit={() => console.log('submit clicked')}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={openModal}>Add New Entry</Button>

          <h3>Entries</h3>
          {currentPatient.entries.length > 0 ? currentPatient.entries.map((entry) => {
            return (
              <EntryDetails entry={entry} key={entry.id} />
            );
          }) : <Segment>The patient has not had any visits.</Segment>}
        </div> :
        <h1>Loading</h1>}
    </div>
  );
};

export default PatientDetailsPage;
