import React from 'react';
import {Typography,Box} from "@material-ui/core";
import {Link} from 'react-router-dom';

function NotFound(){
  return (
    <Box position='fixed' left='25%' top='40%'>
      <Typography variant="h4" color='textSecondary'>
          Ooops... It seems like the page doesn't exist.
      </Typography>
      <Typography variant="h4" align='center' color='textSecondary'>
          Please refer back to our <Link to="/">home</Link> page.
      </Typography>
    </Box>
  )
}


export default NotFound;