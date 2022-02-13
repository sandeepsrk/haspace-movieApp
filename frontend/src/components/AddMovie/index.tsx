
import './styles.css';
import React,{useState} from 'react';
import { Formik, Form,Field ,FormikProps } from 'formik';
import {Movie, FormIStatus, FormIStatusProps} from '../../types/movie';
import {validationRules} from  '../../utils/validation';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';
import { useReload, Reload } from '../../context/movieContext';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import swal from 'sweetalert';

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
        marginTop: '24px',
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
        message: 'Addes successfully.',
        type: 'success',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}





function AddMovie(props : any){
    const isAddMode = !props.props;

    const classes = useStyles({})
    const [displayFormStatus, setDisplayFormStatus] = useState(false)
    const [formStatus, setFormStatus] = useState<FormIStatus>({
        message: '',
        type: '',
    })
    const { reload, setReload } = useReload();
    const [image,setImage] = useState([])
    let initialFValues: any = {}
     if(isAddMode){
        initialFValues = {
            _id:'',
            title: '',
            description: '',
            duration: '' ,
            genre:'',
            image: []
        }
     } else {
         initialFValues = props.props
         var id: any = props.props._id 
     }
     
    const handleCancel = () => {
        props.onChange()
    }
    function onSubmit(values: Movie, actions: any) {
        if (isAddMode) {
            createNewMovie(values, actions.resetForm);
            actions.setSubmitting(false)
        } else {
            updateMovie(values, actions.resetForm);
        }
    }
    const createNewMovie = async (data: Movie, resetForm: Function) => {
        let formData: any = new FormData();  
        data.duration = parseInt(data.duration.toString());
       formData.append("file",image)
       formData.append("title",data.title)
       formData.append("description",data.description)
       formData.append("duration",data.duration)
       formData.append("genre",data.genre)

        try {
            if (data) {
               console.log(data)
                axios({
                    method: "post",
                    url: BASE_URL+'/movies',
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                .then((response: any) => {
                    if(response.status === 201){
                        swal("Movie Added!", "Movie is added to the list", "success");
                        setReload(Reload.load)
                        setFormStatus(formStatusProps.success)
                        resetForm({})
                        props.onChange()
                }
                })
            } else {
                setFormStatus(formStatusProps.error)
                swal("Movie Not Added!", "Try once more", "error");
            }
        } catch (error) {
            setFormStatus(formStatusProps.error)

        } finally {
            setDisplayFormStatus(true)
        }
    }

    const updateMovie = async (data: Movie, resetForm: Function) => {
        let formData: any = new FormData();  
        data.duration = parseInt(data.duration.toString());
        if(image !==null){
            formData.append("file",image)
        }
       
       formData.append("title",data.title)
       formData.append("description",data.description)
       formData.append("duration",data.duration)
       formData.append("genre",data.genre)
       formData.append("image",data.image)
       console.log("Form data",formData)
        try {
            if (data) {
               console.log(data)
                axios({
                    method: "put",
                    url: BASE_URL+`/movies/${id}`,
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                .then((response: any) => {
                    if(response.status === 200){
                        swal("Movie Updated!", "Movie details updated", "success");

                        setReload(Reload.load)
                        setFormStatus(formStatusProps.success)
                        resetForm({})
                        props.onChange()
                }
                })
            } else {
                setFormStatus(formStatusProps.error)
                swal("Movie Not Updated!", "Try once more", "error");

            }
        } catch (error) {
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
    return(
        <div>

<Formik
                initialValues={initialFValues}
                onSubmit={onSubmit}
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
                                    lg={10}
                                    md={10}
                                    sm={10}
                                    xs={10}
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
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button 
                                        onClick={handleClose} 
                                        color="primary" 
                                        variant="contained"
                                     >
                                        Cancel
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

export default AddMovie;