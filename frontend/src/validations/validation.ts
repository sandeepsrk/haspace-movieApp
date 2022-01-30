import * as Yup from 'yup'
export const validationRules= Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(2, 'Min length: 2'),
    description: Yup.string()
      .required('Description is required')
      .min(2, 'Min length: 10'),                
    duration: Yup.number()
        .required('Duration is required')
        .min(2,'Min length:2'),
    genre: Yup.string()
        .required('Genre is required'),
})