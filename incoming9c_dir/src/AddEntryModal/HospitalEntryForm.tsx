/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import {  DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { EntryTypeNames, FlattenedHospitalEntryFormValues, HospitalEntryFormValues } from '../types';
import * as Yup from 'yup';
import { todaysDate } from '../utilityFxns';

const hospitalEntrySchema = Yup.object().shape({
  description: Yup.string().min(4).required(),
  date: Yup.date().default(() => new Date()).required(),
  specialist: Yup.string().required().min(1, 'Specialist name is required'),
  diagnosisCodes: Yup.array().ensure().of(Yup.string()),
  //this takes an exact match of a word and gives this error message if not
  type: Yup.string().matches(/\bHospital\b/,
     "The value must be exactly -> " + EntryTypeNames.Hospital)
     .default(() => EntryTypeNames.Hospital),
  discharge: Yup.object().shape({
    date: Yup.date().default(() => new Date()),
    criteria: Yup.string()
  })
});

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  //onSubmit: () => void;
  onCancel: () => void;
}
export const HospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }]  = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: todaysDate,
        specialist: "",
        diagnosisCodes: [],
        type : EntryTypeNames.Hospital,
        discharge: {
          date: todaysDate,
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validationSchema={hospitalEntrySchema}
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
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            
            <Field
              label="Discharge reason"
              placeholder="Thumb has healed"
              name="discharge.criteria"
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
