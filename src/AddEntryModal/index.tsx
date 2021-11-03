import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AddEntryForm, EntryFormValues } from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  //onSubmit: (values: any) => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

export const AddEntryModal = ({modalOpen, onClose, onSubmit, error}: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm 
        onCancel={onClose}
        onSubmit={onSubmit}
         />
      </Modal.Content>
    </Modal>
  );
};
