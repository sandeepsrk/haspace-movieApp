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
import AddNewMovie from '../modal/modal';

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
    const [edit,setEdit] = React.useState(false)
    const [editItem, setEditItem] = React.useState([])
    const { reload, setReload } = useReload();
    React.useEffect(() => {
       MoviesDataService.getAll().then((res:any)=>{
           var movies = res.data.data
           setItems(movies)
       })
    },[reload == "true"])

    const handleEdit = (elem: any) => {
        console.log("The value ____________",elem)
       setEdit(true)
       setEditItem(elem);
    }
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
                        {/* <Card>
                            <CardHeader
                                title={`quarter : ${elem.quarter}`}
                                subheader={`earnings : ${elem.earnings}`}
                            />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Hello World
                                </Typography>
                            </CardContent>
                        </Card> */}
                         <Card className={classes.root}>
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
                                <Button size="small" color="primary">
                                 Delete
                                </Button>
                            </CardActions>
                         </Card>
                         {
                            edit &&
                            <AddNewMovie props= {editItem}/>
                        }
                     </Grid>
                ))}
            </Grid>
          
        </div>
    )
}