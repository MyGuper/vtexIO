import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

import { usePostForm } from '../../hooks/useRewards'
import styles from './RewardsEverest.css'

type FieldType = 'text' | 'email' | 'number' | 'password'

interface FieldSchema {
  name: string
  label: string
  type: FieldType
  required: boolean
}

interface FormSchema {
  submissionKey: string
  fields: FieldSchema[]
}

interface DynamicFormProps {
  formSchema: FormSchema
  onClose?: () => void
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formSchema, onClose }) => {
  const [success, setSuccess] = useState(false)

  const { post } = usePostForm()
  const { fields } = formSchema

  const initialValues: Record<string, string> = fields?.reduce((acc, field) => {
    acc[field.name] = ''

    return acc
  }, {} as Record<string, string>)

  const validationSchemaFields = fields.reduce((acc, field) => {
    let validator = Yup.string()

    if (field.type === 'email') {
      validator = validator.email('E-mail inválido')
    }

    if (field.required) {
      validator = validator.required('Campo obrigatório')
    }

    acc[field.name] = validator

    return acc
  }, {} as Record<string, Yup.StringSchema>)

  const validationSchema = Yup.object().shape(validationSchemaFields)

  const handleSubmit = (values: Record<string, string>) => {
    post(values, formSchema.submissionKey)
    setSuccess(true)

    document.cookie = `form_${formSchema.submissionKey}=true; path=/; max-age=${
      60 * 60 * 24 * 30
    }`

    if (onClose) {
      setTimeout(() => {
        onClose()
      }, 2000)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <>
          {success && (
            <div className={styles.successMessage}>
              Formulário enviado com sucesso!
            </div>
          )}
          <Form className={styles.form}>
            {fields.map((field) => (
              <div key={field.name} className={styles.fieldGroup}>
                <Field
                  id={field.name}
                  name={field.name}
                  type={field.type === 'email' ? 'email' : 'text'}
                  className={styles.input}
                  placeholder={field.label + (field.required ? ' *' : '')}
                />
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className={styles.error}
                />
              </div>
            ))}
            <button type="submit" className={styles.button}>
              Eu quero!
            </button>
          </Form>
        </>
      )}
    </Formik>
  )
}

export default DynamicForm
