import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

const FieldGroup = ({ id, label, help, ...props }) => (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
)

export default FieldGroup;