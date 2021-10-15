import React from 'react'
import { Form } from 'react-bootstrap'

const Input = (props) =>{
    return (
        <>
            <Form.Group className="mb-3">
                  <Form.Label>{props.label}</Form.Label>
                  <Form.Control type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
                <Form.Text className="text-muted">
                    {props.errorMessage}
                </Form.Text>
            </Form.Group>
        </>
    )
}

export default Input