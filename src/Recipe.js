import React from "react"
import {Link} from "react-router-dom"
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles,Typography} from "@material-ui/core";


const Recipe = ({title,calories,image,uri,portions}) =>{
  
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      border:`2px solid ${theme.palette.grey[100]}`
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    link:{
      textDecoration: 'none'
    }
  }));

  const classes = useStyles();

  return(
      <Link className={classes.link} to={`/recipe/${uri}`}> 
        <Card className={classes.root}>
        <CardHeader
          title={
              <Typography variant="h6" color="textSecondary" component="p" noWrap>
                {title}
              </Typography>
          }
        />
        <CardMedia
          className={classes.media}
          image={image}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Energetic value: {parseInt(calories)} Kcal
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Portions: {portions}
          </Typography>
        </CardContent>
        </Card>
    </Link>
    
  );
}

export default Recipe;