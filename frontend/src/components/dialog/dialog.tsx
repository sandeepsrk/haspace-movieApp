import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import {Movie, FormIStatus, FormIStatusProps} from '../../types/movie';
import { Formik, Form, FormikProps } from 'formik';
import {validationRules} from  '../../validations/validation';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MoviesDataService from '../../services/movie.service';
import { useReload, Reload } from '../../context/movieContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
        '& > *': {
          margin: theme.spacing(5),
        },
    },
    center: {
        textAlign: 'center',
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '60%',
        marginX: '20px', 
    },
    FormControl: {
        margin: '20px 10px '
    },
    RadioGroup: {
        paddingLeft: '100px',
    },
    FormControlLabel: {
        marginLeft: '70px',
        marginTop: '-25px'
    },
    submitButton: {
        marginTop: '24px'
    },
    buttonStyle: {
        marginLeft:'25px',
    },
    title: { textAlign: 'center' },
    successMessage: { color: 'green' },
    errorMessage: { color: 'red' },
  }),
);



const formStatusProps: FormIStatusProps  = {
    success: {
        message: 'Updated successfully.',
        type: 'success',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}

export default function Update(props: any) {
    const initialFValues: any = props.value
    console.log("Props $$$$$$$$$$$$$$$$$$", props)
    const classes = useStyles({})
    const [displayFormStatus, setDisplayFormStatus] = useState(false)
    const [formStatus, setFormStatus] = useState<FormIStatus>({
        message: '',
        type: '',
    })

    const { reload, setReload } = useReload();
    const [image,setImage] = useState([])

    const createNewUser = async (data: Movie, resetForm: Function) => {
        console.log("Values are @@@@", data)
        let formUpdate: any = new FormData();  
        data.duration = parseInt(data.duration.toString());
       //form.append("data",data)
       formUpdate.append("file",image)
       formUpdate.append("title",data.title)
       formUpdate.append("description",data.description)
       formUpdate.append("duration",data.duration)
       formUpdate.append("genre",data.genre)

       console.log("image $$%%%%",props.value._id)
       console.log("form data ", formUpdate)
        try {
            if (data) {
               
                MoviesDataService.update(props.value._id, formUpdate)
                .then((response: any) => {
                    console.log("Response $$$", response)
                    setFormStatus(formStatusProps.success)
                    resetForm({})
                    setReload(Reload.load)
                    props.onChange()
                })
            } else {
                setFormStatus(formStatusProps.error)
            }
        } catch (error) {
            const response = '';
            setFormStatus(formStatusProps.error)

        } finally {
            setDisplayFormStatus(true)
        }
    }

    const handleClose = () => {
        props.onChange()
    };

  const handleImage = (e : any) => {
      setImage(e.target.files[0])  
  }


  return (
    <div>

        <Formik
                initialValues={initialFValues}
                onSubmit={(values: any, actions) => {
                    createNewUser(values, actions.resetForm)
                     actions.setSubmitting(false)
                }}
                validationSchema={validationRules}
            >
                {(props: FormikProps<Movie>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                    } = props
                    return (
                        <div>
                              <h1 className={classes.center}>Add a new movie</h1>
                              <Form className={classes.root} noValidate autoComplete="off">
                                <Grid container spacing={3}>
                                    <Grid> 
                                        {displayFormStatus && (
                                            <div className="formStatus">
                                                {formStatus.type === 'error' ? (
                                                    <p
                                                        className={
                                                            classes.errorMessage
                                                        }
                                                    >
                                                        {formStatus.message}
                                                    </p>
                                                ) : formStatus.type ===
                                                  'success' ? (
                                                    <p
                                                        className={
                                                            classes.successMessage
                                                        }
                                                    >
                                                        {formStatus.message}
                                                    </p>
                                                ) : null}
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                      <TextField 
                                          id="title" 
                                          label="Title" 
                                          variant="outlined" 
                                          name='title'
                                          disabled
                                          value={values.title}
                                          className={clsx(classes.margin, classes.textField)}
                                          helperText={
                                              errors.title && touched.title
                                                  ? errors.title
                                                  : ''
                                          }
                                          error={
                                              errors.title && touched.title
                                                  ? true
                                                  : false
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}


                                      />
                                      <TextField 
                                            id="description" 
                                            label="Description" 
                                            name='description'
                                            variant="outlined" 
                                            value={values.description}
                                            className={clsx(classes.margin, classes.textField)}
                                            helperText={
                                                errors.description && touched.description
                                                    ? errors.description
                                                    : ''
                                            }
                                            error={
                                                errors.description && touched.description
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                      />
                                      <TextField 
                                          id="duration" 
                                          name="duration"
                                          label="Duration" 
                                          variant="outlined" 
                                          multiline
                                          value={values.duration}
                                          className={clsx(classes.margin, classes.textField)}
                                          helperText={
                                              errors.duration && touched.duration
                                                  ? errors.duration
                                                  : ''
                                          }
                                          error={
                                              errors.duration && touched.duration
                                                  ? true
                                                  : false
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                      />

                                        <div>
                                            <FormControl variant="outlined" component="fieldset" className={clsx(classes.margin, classes.textField)}>
                                            <InputLabel htmlFor="filled-age-native-simple">Genre</InputLabel>
                                                  <Select
                                                        native
                                                        value={values.genre}
                                                        onChange={handleChange}
                                                        label="Genre"
                                                        inputProps={{
                                                          name: 'genre',
                                                          id: 'outlined-age-native-simple',
                                                        }}
                                                        >
                                                        <option aria-label="None" value="" />
                                                        <option value={"Action"}>Action</option>
                                                        <option value={"Comedy"}>Comedy</option>
                                                        <option value={"Drama"}>Drama</option>
                                                        <option value={"Fantasy"}>Fantasy</option>
                                                        <option value={"Horror"}>Horror</option>
                                                        <option value={"Mystery"}>Mystery</option>
                                                        <option value={"Romance"}>Romance</option>
                                                        <option value={"Thriller"}>Thriller</option>
                                                        </Select>
                                                  <FormHelperText
                                                        error={
                                                            errors.genre && touched.genre
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        {errors.genre && touched.genre
                                                            ? errors.genre
                                                            : ''
                                                        }
                                                  </FormHelperText>
                                            </FormControl>
                                        </div>
                                        
                                         <div className={clsx(classes.margin, classes.textField)}>
                                         <input type="file" onChange={handleImage} />
                                         </div>
                                        
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={6}
                                    xs={6}
                                    className={classes.submitButton}
                                >
                                    <Button
                                        className={classes.buttonStyle}
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Form>
                          </div>
                    )
                }}
            </Formik>
    </div>
  );
}