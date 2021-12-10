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
    startDate: Yup.date()
      /* make it so that the start date cannot be later than the end date and vice versa*/
      .when('endDate', (endDate: string) => {
        /*test this again at a different time. the error msg kept being given in the desired date minus one day so I had to manually add one day.*/
        const date: Date =  new Date(endDate);
        const datePlusOne: Date = new Date(date.setDate(date.getDate() + 1));
        return endDate
        ? Yup.date().max(endDate, `Date must be earlier than or equal to end date which is ${datePlusOne.toJSON().split("T")[0]}`)
        : Yup.date().default(() => new Date());
      }),
      /*I cant have the same when clause in startDate also here in endDate. Otherwise it becomes a 
      cyclic dependency since they both refer to each other. One is enough for the jon*/
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
