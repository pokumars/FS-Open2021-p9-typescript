import React from 'react';
import { Button } from 'semantic-ui-react';
import { Entry } from '../types';


export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  // onSubmit: (values: EntryFormValues) => void;
  onSubmit: () => void;
  onCancel: () => void;
}
export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <div>
      <Button type="button" color="red" onClick={onCancel}>Cancel</Button>
      <Button type="button" color="green" onClick={onSubmit}>Submit</Button>
    </div>
  );
};
