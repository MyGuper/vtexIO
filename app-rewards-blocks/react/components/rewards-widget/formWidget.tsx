import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { usePostForm } from '../../hooks/useRewards';
import styles from './styles.css';

type FieldType = 'text' | 'email' | 'number' | 'password';

interface FieldSchema {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
}

interface FormSchema {
  submissionKey: string;
  fields: FieldSchema[];
}

interface DynamicFormProps {
  formSchema: FormSchema;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formSchema }) => {
    const {  post } = usePostForm();
  const { fields } = formSchema;

  const initialValues: Record<string, string> = fields?.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as Record<string, string>);

  const validationSchemaFields = fields.reduce((acc, field) => {
    let validator = Yup.string();

    if (field.type === 'email') {
      validator = validator.email('E-mail inválido');
    }

    if (field.required) {
      validator = validator.required('Campo obrigatório');
    }

    acc[field.name] = validator.defined();
    return acc;
  }, {} as Record<string, Yup.StringSchema<string>>);

  const validationSchema = Yup.object().shape(validationSchemaFields);

  const handleSubmit = (values: Record<string, string>) => {
        post(values, formSchema.submissionKey);

  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={styles.form}>
          {fields.map((field) => (
            <div key={field.name} className={styles.fieldGroup}>
              <label htmlFor={field.name} className={styles.label}>
                {field.label}
                {field.required && <span className={styles.required}> *</span>}
              </label>

              <Field
                id={field.name}
                name={field.name}
                type={field.type === 'email' ? 'email' : 'text'}
                className={styles.input}
              />

              <ErrorMessage
                name={field.name}
                component="div"
                className={styles.error}
              />
            </div>
          ))}

          <button type="submit" className={styles.button}>
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
