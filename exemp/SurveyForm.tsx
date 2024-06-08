import React from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as Yup from 'formik';
import { Formik } from 'formik';

interface SurveyFormProps {
  onSubmit: (values: SurveyFormValues) => void;
}

interface SurveyFormValues {
  title: string;
  description: string;
  // ... autres champs du formulaire
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Le titre est obligatoire'),
    description: Yup.string().required('La description est obligatoire'),
    // ... autres champs de validation
  });

  return (
    <Formik
      initialValues={{ title: '', description: '', /* ... */ }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, isSubmitting }) => (
        <View>
          <TextInput
            label="Titre"
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            error={errors.title}
          />
          <TextInput
            label="Description"
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            error={errors.description}
            multiline
          />
          // ... autres champs du formulaire
          <Button mode="contained" onPress={handleSubmit} disabled={!isValid || isSubmitting}>
            Créer le questionnaire
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default
