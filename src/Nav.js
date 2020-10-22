import React from "react"
import {Link} from "react-router-dom"
import { AppBar,makeStyles,Toolbar,Typography,fade,Grid} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';



function Nav(){

  const useStyles = makeStyles(theme => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 'auto',
      width: '100%',
      maxWidth: '300px'
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%'
    },
    logo:{
      color:'white',
      textDecoration:'none'
    }
  }));

  const classes = useStyles();

  return(
  <div>
     <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={6} sm={8}>
          <Link className = {classes.logo} to={`/`}> 
            <Typography variant="h6" component="p" noWrap>
              Recipes Browser
            </Typography>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
     </AppBar>

  </div>
  );
}
export default Nav;