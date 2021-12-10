/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import {  DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { EntryTypeNames, OccupationalHealthcareEntryFormValues } from '../types';
import * as Yup from 'yup';
import { todaysDate } from '../utilityFxns';

const occupationalHealthcareEntrySchema = Yup.object().shape({
  description: Yup.string().min(4, 'Must be {min} characters or more').required(),
  date: Yup.date().default(() => new Date()).required(),
  specialist: Yup.string().required().min(1, 'Specialist name is required'),
  diagnosisCodes: Yup.array().ensure().of(Yup.string()),
  //this takes an exact match of a word and gives this error message if not
  type: Yup.string().matches(/\bOccupationalHealthcare\b/,
     "The value must be exactly -> " + EntryTypeNames.OccupationalHealthcare)
     .default(() => EntryTypeNames.OccupationalHealthcare),
  employerName: Yup.string().required('Employer name is required'),
  sickLeave: Yup.object().shape({
    startDate: Yup.date().default(() => new Date()),
    endDate: Yup.date().default(() => new Date())
  })
});



interface Props {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  onCancel: () => void;
}
export const OccupationalHealthcareEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }]  = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: todaysDate,
        specialist: "",
        diagnosisCodes: [],
        type : EntryTypeNames.OccupationalHealthcare,
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        employerName: ""
      }}
      onSubmit={onSubmit}
      validationSchema= {occupationalHealthcareEntrySchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField} 
            />

            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start date (optional)"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end date (optional)"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />

            <Field
              label="Visit type"
              placeholder="Hospital"
              name="type"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Save Entry
                </Button>
              </Grid.Column>
            </Grid>

          </Form>
        );
      }}
    </Formik>
  );
};
