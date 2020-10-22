import React,{useState,useEffect} from 'react';
import {Typography,Container,Box} from "@material-ui/core";
import {Link,Redirect} from 'react-router-dom';

function ErrorCors(){

  return (
    <Container maxWidth="md">
      <Box position='fixed' top='25%'>
        <Typography variant="h5" align='center' color='textSecondary'>
            Our API service won't allow too many requests.
        </Typography>
        <Typography variant="h5" align='center' color='textSecondary'>
            Please refer to <Link to="https://developer.edamam.com/about/terms">our API provider</Link> for more information, and try again in a minute or two.
        </Typography>
      </Box>
    </Container>
    
  );
}

export default ErrorCors;