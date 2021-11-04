/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import {  DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { EntryFormValues, EntryTypeNames, HospitalEntryFormValues } from '../types';


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
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type : EntryTypeNames.Hospital,
        discharge: {
          date: "",
          criteria: ""
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};

        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (values.type !== EntryTypeNames.Hospital) {
          errors.type = "value should be " + EntryTypeNames.Hospital;
        }
        if (!values.discharge?.criteria) {
          errors.discharge= requiredError;
        }
        if (!values.discharge?.date) {
          errors.discharge = requiredError;
        }

        if (!values.discharge?.criteria) {
          errors["discharge.criteria"]= requiredError;
        }
        if (!values.discharge?.date) {
          errors["discharge.date"] = requiredError;
        }
        return errors;
      }}
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
