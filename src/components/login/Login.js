import React from "react";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "../Firebase/Firebase";
import { withRouter, Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  close: {
    padding: theme.spacing(0.5)
  }
}));

const SignIn = function(props) {
  const classes = useStyles();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState(); 
  const [err, setErr] = useState();
  const [open, setOpen] = useState();

  function inputLogin(e) {
    setLogin(e.target.value);
  }
  function handleKeyPress(e) {
    if (e.charCode === 13) {
      debugger;
      signIn();
    }
  }
  function createItem(user) {
    sessionStorage.useremail = user.user.email;
    sessionStorage.myname = user.user.displayName;
    sessionStorage.myid = user.user.uid;
    sessionStorage.userdate = user.user.metadata.creationTime.slice(5,16)
  }

  function inputPass(e) {
    setPassword(e.target.value);
  }
  function handlechangehistoryToHome() {
    props.close();
    props.history.replace({ pathname: "/" });
  }
  function signIn() {
     if (!login) {
      setErr("Please Enter Your Email");
      setOpen(true);
    } else if (!password) {
      setErr("Please Enter Your password");
      setOpen(true);
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(login, password)
        .then(function(user) {
          // console.log(user)
          debugger;
          createItem(user);
          // props.initUser(user);

          handlechangehistoryToHome();
        })
        .catch(function(error) {
          setErr(error.message);
          setOpen(true);
        });
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={inputLogin}
            onKeyPress={handleKeyPress}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={inputPass}
            onKeyPress={handleKeyPress}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            // type="submit"
            fullWidth
            onClick={signIn}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link to="/signin" onClick={() => props.close()}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>        
      </div>
      <Box mt={5} />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{err}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Container>
  );
};

export default withRouter(SignIn);
