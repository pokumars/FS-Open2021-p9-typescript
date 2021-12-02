/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import {  DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HealthCheckEntryFormValues, EntryTypeNames } from '../types';
import * as Yup from 'yup';


const HealthCheckEntrySchema = Yup.object().shape({
  description: Yup.string().min(4, 'Must be ${min} characters or more').required(),
  date: Yup.date().default(() => new Date()),
  specialist: Yup.string().min(1, 'Too short!').required(),
  diagnosisCodes: Yup.array().ensure().of(Yup.string()),
  healthCheckRating: Yup.number().min(0).max(3).integer().required().default(() => 3),
  //this takes an exact match of a word and gives this error message if not
  type: Yup.string().matches(/\bHealthCheck\b/, "The value must be exactly -> " + EntryTypeNames.HealthCheck).default(() => EntryTypeNames.HealthCheck)//The value has to be healthcheck
});


interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  //onSubmit: () => void;
  onCancel: () => void;
}
export const HealthcheckEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }]  = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type : EntryTypeNames.HealthCheck,
        healthCheckRating: 3,
      }}
      onSubmit={onSubmit}
      validationSchema= {HealthCheckEntrySchema}

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
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />

            <Field
              label="Visit type"
              placeholder="HealthCheck"
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
/*      validate={(values) => {
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
        if (values.type !== EntryTypeNames.HealthCheck) {
          errors.type = "value should be " + EntryTypeNames.HealthCheck;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }} */