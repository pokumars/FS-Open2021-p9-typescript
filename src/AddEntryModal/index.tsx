import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { AddEntryForm } from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  // onSubmit: (values: any) => void;
  onSubmit: () => void;
  error?: string;
}

export const AddEntryModal = ({modalOpen, onClose, onSubmit, error}: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm 
        onCancel={() => console.log('cancel clicked')}
        onSubmit={onSubmit}
         />
      </Modal.Content>
    </Modal>
  );
};
