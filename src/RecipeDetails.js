import React,{useState,useEffect} from "react";
import {APP_ID,APP_KEY} from "./constants";
import ErrorCors from './ErrorCors';

import {makeStyles,
        Typography,
        Grid,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow,
        Paper,
        Card,
        CardContent,
        Button,
        Chip,
        CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
  ingredients:{
    display:'flex',
    flexFlow:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  grid:{
    maxWidth:'300px'
  },
  tableHead:{
    fontWeight:'bold'
  },
  gridItem:{
    display:'flex',
    justifyContent:'center'
  },
  container:{
    padding:10
  },
  spinningWheel:{
    position:'fixed',
    top:'50%',
    left:'50%'

  }
}));



function RecipeDetails({match}){

  const classes = useStyles();
  const [details,setDetails] = useState(null);
  const [rows,setRows]= useState([]);
  const [loading,setLoading] = useState(true);
  const [hasError,setHasError] = useState(false);

  const RECIPE_URL = "http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_";
  const RECIPE_ID = match.params.uri;
  const fetchDetails = async () =>{
    try{
      const response = await fetch(`https://api.edamam.com/search?r=${RECIPE_URL}${RECIPE_ID}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json()
      setDetails(data[0]);
      setRows(Object.values(data[0].totalDaily).filter((row,index)=>index<6));
      setLoading(false);
    }
    catch{
      setHasError(true);
    }
     
  }
  
  useEffect(() => {
    fetchDetails();  
  }, [])



  function RenderTable(){
    return (
        <TableContainer component={Paper}>
          <Typography className={classes.title} align='center' color="primary">
            Nutritional Values
          </Typography>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography className={classes.tableHead}>
                  Name
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography className={classes.tableHead}>
                  Value
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography className={classes.tableHead}>
                  Unit
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell component="th" scope="row">
                    {row.label}
                  </TableCell>
                  <TableCell align="right">{row.quantity.toFixed()}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
  }

  if(hasError){
    return <ErrorCors/>
  }

  if(!details || loading){
    return (
      <CircularProgress className={classes.spinningWheel}/>
    );
  }

  return (<div>
     <Grid container spacing={6} className={classes.container}>
        <Grid item className={classes.gridItem} lg={6}>
          <Grid
            container
            spacing={2}
            className={`${classes.container} ${classes.productContainer}`}>
            <Grid item className={classes.gridItem} lg={12}>
              <Typography variant="h4" align='center'>
                {details.label}
              </Typography>
            </Grid>

            <Grid item className={classes.gridItem} lg={12}>
              <Paper elevation={10}>
                <img src={details.image}></img>
              </Paper>
            </Grid>

            <Grid item className={classes.gridItem} lg={12}>
              <Button variant="contained" color="secondary" href={details.url} target="_blank">
                Read more
              </Button>
            </Grid>
            
            <Grid item className={classes.gridItem} lg={12}>
              {details.dietLabels.map(dietLabel => <Chip label={dietLabel} color="primary" />)}
            </Grid>

            <Grid item className={classes.gridItem} lg={12}>
              <h4>Nutritional value: {parseInt(details.totalDaily.ENERC_KCAL.quantity)} kcal</h4>
            </Grid>
            
          </Grid>
        </Grid>
        <Grid item className={`${classes.gridItem} ${classes.ingredients}`}lg={6}>
              <Card className={`${classes.root} ${classes.grid}`} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} color="textSecondary">
                    Ingredients
                  </Typography>
                  <ul>
                    {details.ingredients.map(ingredient=> (
                      <li key={ingredient.text}>
                        <Typography variant="body2" component="p">
                          {ingredient.text}
                        </Typography>
                      </li>))}
                  </ul>
                </CardContent>
              </Card>
      </Grid>
      <Grid item className={`${classes.gridItem}`} lg={12}>
        <Grid container className={classes.container}>
          <Grid item className={`${classes.gridItem}`} lg/>
          <Grid item className={`${classes.gridItem}`} lg={8}>
            {RenderTable()}
          </Grid>
          <Grid item className={`${classes.gridItem}`} lg/>
        </Grid>
      </Grid>
    </Grid>
  </div>);
}

export default RecipeDetails;