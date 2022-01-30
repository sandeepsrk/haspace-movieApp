import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardContent,
    Typography
} from '@material-ui/core/';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import MoviesDataService from '../../services/movie.service';
import { useReload, Reload } from '../../context/movieContext';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Update from '../dialog/dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
      //  maxWidth:345
    },
    textBox: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden"
    }
}))

export default function AltCard() {

    const classes = useStyles()
    const [items,setItems] = React.useState([])
    const [edit, setEdit] = React.useState(false)
    const [editItem, setEditItem] = React.useState()
    const { reload, setReload } = useReload();
    const [show, setShow] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
       MoviesDataService.getAll().then((res:any)=>{
           var movies = res.data.data
           setItems(movies)
       })
       setReload(Reload.reload)
    },[reload == "true"])

    const handleEdit = (elem: any) => {
       setEdit(true);
       setEditItem(elem);
       setOpen(true)

    }

    const handleDelete = (elem: any) => {
        MoviesDataService.delete(elem._id)
        .then((response: any) => {
            alert("Deleted !!")
            setReload(Reload.load)
        }) 
    }
    const handleClose = () => {
        setOpen(false);
      };

    console.log(" Edit Item ####", editItem);

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {items.map((elem : any,i:any) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                         <Card className={classes.root}
                         onMouseOver={() => setShow(true)}
                         onMouseOut={() => setShow(false)}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={elem.image}
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {elem.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.textBox}>
                                  {elem.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.textBox}>
                                  <b>Duration :</b> {elem.duration} min
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.textBox}>
                                  <b>Genre :</b> {elem.genre}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleEdit(elem)}>
                                Edit
                                </Button>
                                <Button size="small" color="primary" onClick={() => handleDelete(elem)}>
                                 Delete
                                </Button>
                            </CardActions>
                         </Card>
                        
                     </Grid>
                ))}


                { edit &&
                    <div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <Toolbar style={{alignItems:'right'}}>
                            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                            </IconButton>
                            </Toolbar>
                            <Update value={editItem} />
                        </Dialog>
                    </div> 
                }
            </Grid>
            



        </div>
    )
}





