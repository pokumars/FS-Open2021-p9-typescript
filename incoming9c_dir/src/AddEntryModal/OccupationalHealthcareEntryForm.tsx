/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import {  DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { EntryTypeNames, FlattenedOccupationalHealthcareEntryFormValues, OccupationalHealthcareEntryFormValues } from '../types';


interface Props {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  //onSubmit: () => void;
  onCancel: () => void;
}
export const OccupationalHealthcareEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }]  = useStateValue();

  const unflattenValuesAndSubmit=(values: FlattenedOccupationalHealthcareEntryFormValues) => {
    //FlattenedOccupationalHealthcareEntryFormValues is OccupationalHealthcareEntryFormValues without dischargeDate.
    // Instead i use dischargeDate and criteria and reformulate HospitalEntryFormValues for submission
    
    onSubmit ({...values,
      sickLeave: values.sickLeaveEndDate && values.sickLeaveStartDate
      ? {startDate: values.sickLeaveStartDate, 
        endDate: values.sickLeaveEndDate }
      : undefined
    });
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type : EntryTypeNames.OccupationalHealthcare,
        sickLeaveStartDate: "",
        sickLeaveEndDate: "",
        employerName: ""

      }}
      onSubmit={unflattenValuesAndSubmit}
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
        if (values.type !== EntryTypeNames.OccupationalHealthcare) {
          errors.type = "value should be " + EntryTypeNames.OccupationalHealthcare;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
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
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start date (optional)"
              placeholder="YYYY-MM-DD"
              name="sickLeaveStartDate"
              component={TextField}
            />
            <Field
              label="Sick leave end date (optional)"
              placeholder="YYYY-MM-DD"
              name="sickLeaveEndDate"
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
