import React from 'react';
import { Dropdown, Header, Modal, Segment } from 'semantic-ui-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HealthcheckEntryForm  } from './HealthcheckEntryForm';
import { EntryFormValues, EntryTypeNames } from '../types';
import { HospitalEntryForm } from './HospitalEntryForm';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
  //onSubmit: (values: any) => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

export const AddEntryModal = ({modalOpen, onClose, onSubmit, error}: Props) => {
  const [entryFormType, setEntryFormType] = React.useState<EntryTypeNames>(EntryTypeNames.HealthCheck);
  // eslint-disable-next-line @typescript-eslint/ban-types
  function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
  }

  const entryTypeDropDownValues = enumKeys(EntryTypeNames).map(e => {
    return { key: e, text: e, value: e as EntryTypeNames };
  });

  const renderForm = () => {
    switch (entryFormType) {
      case EntryTypeNames.HealthCheck:

        return <HealthcheckEntryForm
          onCancel={onClose}
          onSubmit={onSubmit}
        />;
      case EntryTypeNames.Hospital:

        return <HospitalEntryForm
          onCancel={onClose}
          onSubmit={onSubmit}
        />;
      case EntryTypeNames.OccupationalHealthcare:

        return <p>OccupationalHealthcare form not ready</p>;

      default:
        return <p>the switch case of the dropdown is having some error</p>;
    }
  };

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add new entry</Modal.Header>
      <Modal.Content>
      
      <Header as='h4'>Choose vist type</Header>
        <Dropdown placeholder="Type of entry"
          value={entryFormType}
          selection options={entryTypeDropDownValues}
          onChange={(e, { value }) => setEntryFormType(value ? value as EntryTypeNames : EntryTypeNames.HealthCheck)}
        />
      </Modal.Content>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {renderForm()}
      </Modal.Content>
    </Modal>
  );
};
//<Header as "h4">Choose vist type</Header>