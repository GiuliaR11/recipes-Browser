import React,{useState,useEffect} from 'react';
import {makeStyles,Grid,Breadcrumbs,Link,Typography,Paper, CircularProgress} from "@material-ui/core";
import {APP_ID,APP_KEY} from "./constants";
import Recipe from './Recipe';
import ErrorCors from './ErrorCors';



function RecipeList(){

  const [hasError,setHasError] = useState(false);
  const [recipes,setRecipes] = useState([]);
  const [loading,setLoading] = useState(true);
  const [letter,setLetter] = useState(null);

  const useStyles = makeStyles((theme) => ({
    container:{
      marginTop:'10px',
      padding:'10px'
    },
    containerItem:{
     height:'250px'
    },
    paperStyle:{
      display:'flex',
      justifyContent:'center',
      padding:'2px'
    },
    spinningWheel:{
      position:'fixed',
      top:'50%',
      left:'50%'

    }
  }));

  async function refetch(letter){
    try{
      const response = await fetch(`https://api.edamam.com/search?q=${letter}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12`);
      const data = await response.json();
      const recipes = data.hits.map((hit)=>{return hit.recipe});
      setRecipes(recipes);
      setLoading(false);
      setHasError(false);
    }
    catch(e){
      console.log(e);
      setHasError(true);
    }
  }
  
  const classes = useStyles();

  if(letter === null)
    setLetter(String.fromCharCode(parseInt(Math.random() * 25 + 66)));

  useEffect(() => {
    refetch(letter);
  }, [letter]);

  if(hasError){
    return <ErrorCors/>
  }

  if(loading){
    return (
      <CircularProgress className={classes.spinningWheel}/>
    );
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  return (<div>
    <Paper className={classes.paperStyle}>
    <Breadcrumbs aria-label="breadcrumb" maxItems={26}>
    {alphabet.map((letter)=> <Link color="inherit" href="/" onClick={(e)=>{e.preventDefault();setLetter(letter);setLoading(true)}}>
       {letter}
      </Link>)}
    </Breadcrumbs>
    </Paper>
    <Grid container spacing={3} className={classes.container}>
        {recipes.map((recipe)=>(
        <Grid item className={classes.gridItem}
          key={recipe.label}
          xs={12} sm={6} md={4} lg={3}>
          <Recipe title={recipe.label}
            ingredients={recipe.ingredients}
            image={recipe.image}
            uri={recipe.uri.split('_')[1]}
            calories={recipe.calories}
            portions={recipe.yield}
          />
           </Grid>))}
    </Grid>
  </div>)
}

export default RecipeList;