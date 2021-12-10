import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { addToDiagnoses, setPatientList, useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDetailsPage from "./PatientDetailsPage";

const App = () => {
  const [{diagnoses}, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        //save value.data as patientListFromApi
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);
  
  React.useEffect(() => {
    //check state for Diagnoses
    //console.log('fetching the diagnoses');
    //fetch the Diagnoses
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get<Diagnosis[]>(apiBaseUrl + '/diagnoses/');
        const fetchedDiagnoses = response.data;
        //console.log('fetchedDiagnoses', fetchedDiagnoses);
        //put Diagnoses in state
        dispatch(addToDiagnoses(fetchedDiagnoses));

      } catch (error) {
        console.error(error);
      }
    };

    if (!diagnoses || diagnoses.length < 1 || diagnoses == null ) {
      void fetchDiagnoses();
    }
    
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientDetailsPage />
            </Route>
            <Route exact path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
