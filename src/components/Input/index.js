import React from 'react';
import Form from 'react-bootstrap/Form';
import InputMask from 'react-input-mask';

export default function Input({
  placeholder,
  type,
  title,
  as,
  required,
  value,
  width,
  height,
  onChange,
  isInvalid,
  maxLength,
}) {
  
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{title}</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          as={as}
          required={required}
          value={value}
          width={width}
          height={height}
          onChange={onChange}
          isInvalid={isInvalid}
          maxLength={maxLength}
        />        
        <Form.Control.Feedback type="invalid">
          Campo obrigatório
        </Form.Control.Feedback>
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
    </Form>
  );
}
