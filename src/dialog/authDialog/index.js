//***********************************//
//                                   //
//   Bitking Authenticaion Dialog    //
//                                   //
//  Author: Alex,   Date: 2019.7.9   //
//                                   //
//***********************************//

import React, {Component} from 'react';
import {findDOMNode} from 'react-dom'
import logo from './logo.png';
// import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import FacebookBoxIcon from 'mdi-material-ui/FacebookBox';
import GoogleIcon from 'mdi-material-ui/Google';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


// import Tooltip from '@material-ui/core/Tooltip';
// import ReactTooltip from 'react-tooltip';
// import ReactHintFactory from 'react-hint';
import Tooltip from 'react-tooltip-lite';

// const ReactHint = ReactHintFactory(React);

//====================================//
//    Password and Email Validation   //
//  Author: Alex,   Date: 2019.7.18   //
//====================================//
import passwordValidator from 'password-validator';

var schema =new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits //.has().not().spaces()  // Should not have spaces
.has().symbols()                                // Must have symbol
.is().not().oneOf(['Insert', 'Delete', 'Select', 'Update']);// Blacklist these values

var LengthValidate = new passwordValidator();
LengthValidate.is().min(8).is().max(100);

var LowUpcaseValidate = new passwordValidator();
LowUpcaseValidate.has().lowercase().has().uppercase();

var DigitValidate = new passwordValidator();
DigitValidate.has().digits();

var SymbolValidate = new passwordValidator();
SymbolValidate.has().symbols();

//====================================//
// Custom Styled Textfield Definition //
//  Author: Alex,   Date: 2019.7.9    //
//====================================//
const BitkingTextCustomStyles = { 
  root: {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: 'blue'
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'gray',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },

    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'gray',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& label': {
      color: 'white',
      fontSize: 20,
      borderBottomColor: 'red',
    },
    color:'white',
    marginTop:10,
    marginBottom: 20,
  },
}
const CssTextField = withStyles(BitkingTextCustomStyles)(TextField);
const CssFormControl = withStyles(BitkingTextCustomStyles)(FormControl);
//== End of Custom Styled Textfield Definition  ==//


//===================================//
//      TabContainer Definition      //
//  Author: Alex,   Date: 2019.7.9   //
//===================================//
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 2 }}>
      {children}
    </Typography>
  );
}
//== End of TabContainer Definition ==//


const useStyles = makeStyles({
  facebook: {
    backgroundColor: '#3c5a99',
    color: '#ffffff',
    fontSize: 15
  },
  google: {
    backgroundColor: '#de3131',
    color: '#ffffff',
    fontSize: 15
  },
  input: {
    color: 'white',
  },
  tabs: {
    width: '100%', backgroundColor: '#00b0e4', borderColor: 'transparent', underline: '#000d17'
  },
});

//===================================//
//   Bitking Authenticaion Dialog    //
//  Author: Alex,   Date: 2019.7.9   //
//===================================//
function AuthDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedC: false,
  
    tipOpen: false,
  });
  const [value, setValue] = React.useState(0);

  const [values, setValues] = React.useState({
    password: "",
    password_cf:"",
    showPassword: false,
    showPassword_cf: false
  });

  const handlePWChange = prop => event => {
    // console.log('handle password change', prop, event.target.value);

    setValues({ ...values, [prop]: event.target.value });
    if(value){
      if (prop == "password") {
        // setState({...state, tipOpen_cf: false, tipOpen: true});
        if(schema.validate(event.target.value)){
          // console.log('valid password');
          setState({...state, tipOpen: false});
        }else{
          if(event.target.value !='')
            setState({...state, tipOpen: true});
          else
            setState({...state, tipOpen: false});
          // console.log('invalid password');
        }
      }else{
        setState({...state, tipOpen: false});
      }
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowPassword_cf = () => {
    setValues({ ...values, showPassword_cf: !values.showPassword_cf });
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  function handleSlideChange(event, newValue) {
    setValue(newValue);
    if( newValue == 0){
      setState({...state, tipOpen: false, tipOpen_cf: false});
    }
    else{
      if(values.password !="" && !schema.validate(values.password))
        setTimeout(function(){setState({...state, tipOpen: true})}, 200);     
    }
  }

  function handleChangeIndex(index) {
    setState(index);
  }

  function switchTab(index){
    if(value == 1){
      document.getElementById('login_tab').click();
    }else{
      document.getElementById('signup_tab').click();
    }
  }

  function triggerCheck(){
     document.getElementById('r_terms').click();
  }

  const responseGoogle = (response) => {
    // console.log(response);
    // document.getElementById('gLogin_data').innerHtml = response;
  }

  const responseFacebook = (response) => {
    // console.log(response);
    // document.getElementById('fLogin_data').innerHtml = response;
  }

  //   fetch('https://localhost/pf.bitking.com/www/', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     firstParam: 'Value',
  //     secondParam: 'SecValue',
  //   })
  // })

  return (
    <Container style={{background:'#000d17', justifyContent:'center', alignItems:'center', width: 450}}>
      <div style={{height:150, paddingTop: 50, display: 'flex',  justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <div>
          <img src={logo} style={{  height: 80, alignItems:'center'}} alt="logo" />
        </div>
        <div style={{display: 'flex',  justifyContent:'center',  height: '100vh', color:'white', paddingTop: 10,paddingBottom: 10}}>
            <p> Welcome to the BitKings family </p>
        </div>
      </div>
      <AppBar position="static" style={{display:'flex', alignItems:'center', backgroundColor: '#000d17'}}>
        <Tabs
          classes={{ indicator: classes.tabs }} 
          value={value}
          onChange={handleSlideChange}
          variant="fullWidth"
        >
          <Tab id="login_tab" label="LOGIN" style={{color:'#00b0e4'}} variant="fullWidth" />
          <Tab id="signup_tab" label="SIGN UP" style={{color:'#00b0e4'}} variant="fullWidth"/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}>
          
          <DialogActions style={{justifyContent: 'center', marginTop: theme.spacing(0.5),marginBottom: theme.spacing(0.5)}}>

            <GoogleLogin
              clientId="201779576931-o53vd124o401d0e9a3e23hoeu3u53dlq.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <Button 
                  onClick={renderProps.onClick} 
                  className={`${classes.google}`} 
                  size="small"  
                  fullWidth ='true'
                  variant="contained"
                >
                  <GoogleIcon style={{marginRight: theme.spacing(1), height: 18}} />
                  Google
                </Button>
              )}
            />
            <FacebookLogin
              appId="470363177123118"
              callback={responseFacebook}
              render={renderProps => (
                <Button onClick={renderProps.onClick} className={`${classes.facebook}`} size="small" fullWidth variant="contained">
                  <FacebookBoxIcon className={`${classes.icon}`} />
                  Facebook
                </Button>
              )}
            />
          </DialogActions>
          <div 
            class="signin_form_divider"
          >
            <span class="dialog_separator-text" style={{color:'gray', fontSize:12, backgroundColor:'#000d17' }}>OR</span>
          </div>

          <form id="sign_in" name="sign_in" method="POST" enctype='application/json' data-ajax="false">
            <CssTextField
              fullWidth
              label="Email"
              margin="normal"
              type="email"
              InputProps={{
                className: classes.input
              }}
              id="u"
              name="u"
              tabindex="1"
            />

            <CssTextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              InputProps={{
                className: classes.input
              }}
              id="p"
              name="p"
              tabindex="2"
            />

            <div style={{marginTop: 10}}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedA}
                    value={state.checkedA}
                    onChange={handleChange('checkedA')}
                    color="primary"
                    style={{color:'#00b0e4', fontSize: 10, height: 10,}}
                  />
                }
                label="Keep me logged in"
                style={{color:'white'}}
                name="rememberme"
                id="rememberme"
                tabindex="3"
              />
            </div>
            <div class="g-recaptcha" data-sitekey="6Le2_ZwUAAAAAAPnf7S5oyIFjzRJM8AGmgkzwOtU"></div>
            <div style={{marginTop: 10, fontSize: 14, color:'white'}}>
              <a href='forgot-password.php' style={{color:'white', textDecoration: 'none'}}>Forgot Password?</a>
            </div>
            <DialogActions style={{marginBottom: 20, marginTop: 30}}>
              <Button 
                id="btnLogin" 
                name="btnSend"
                color="primary" 
                variant="contained" 
                style={{width:'100%', paddingLeft:'10%', paddingRight:'10%', backgroundColor: '#00b0e4'}}
              >LET'S GO
              </Button>
              
            </DialogActions>
          </form>
         

          
          <div style={{marginTop: 20, fontSize: 14, color:'white', display:'flex', justifyContent:'ceter', alignItems:'center', flexDirection:'column'}}>
            <div style={{justifyContent:'ceter'}}>
              <p>Become a Member <a href='#' style={{color:'#00b0e4', textDecoration: 'none'}} onClick={switchTab}> Sign Up</a></p>
            </div>
          </div>
        </TabContainer>
        
        <TabContainer dir={theme.direction}>
          <DialogActions style={{justifyContent: 'center', marginTop: theme.spacing(0.5),marginBottom: theme.spacing(0.5)}}>
            <GoogleLogin
              clientId="201779576931-o53vd124o401d0e9a3e23hoeu3u53dlq.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <Button 
                  onClick={renderProps.onClick} 
                  className={`${classes.google}`} 
                  size="small"  
                  fullWidth ='true'
                  variant="contained"
                >
                  <GoogleIcon style={{marginRight: theme.spacing(1), height: 18,}} />
                  Google
                </Button>
              )}
            />
            <FacebookLogin
              appId="470363177123118"
              callback={responseFacebook}
              render={renderProps => (
                <Button onClick={renderProps.onClick} className={`${classes.facebook}`} size="small" fullWidth variant="contained">
                  <FacebookBoxIcon className={`${classes.icon}`} />
                  Facebook
                </Button>
              )}
            />
            </DialogActions>
            <div 
            class="signin_form_divider"
            >
            <span class="dialog_separator-text" style={{color:'gray', fontSize:12, backgroundColor:'#000d17' }}>OR</span>
            </div>
            <form id="sign_up" name="sign_up" method="POST">

            <CssTextField
              fullWidth ="true"
              label="Alias"
              margin="normal"
              InputProps={{
                className: classes.input
              }}
              id="r_a"
              name="a" 
            />
            <div id="msga" class="small"></div>

            <CssTextField
              fullWidth = 'true'
              label="Email"
              margin="normal"
              type="email"
              InputProps={{
                className: classes.input
              }}
              name="u" 
              id="r_u"
            />
            <div id="msgu" class="small"></div>

            <CssFormControl fullWidth="true">
              <InputLabel htmlFor="adornment-password" style={{color:'white', fontSize: 20}}>Password</InputLabel>
              <Input
                id="adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handlePWChange("password")}
                style={{color:'white'}}
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip
                      content={(
                        <div class="unordered-list">
                          <ul className="tip-list" style={{width: 240, fontSize: 14, margin:0, paddingLeft: 20, }}>
                            <li className={(LengthValidate.validate(values.password))? `green`:''}>Contains at least 8 characters</li>
                            <li className={(DigitValidate.validate(values.password))? `green`:''}>Contains at least one number</li>
                            <li className={(SymbolValidate.validate(values.password))? `green`: ''}>Contains at least one special character</li>
                            <li className={(LowUpcaseValidate.validate(values.password))? `green`: ''}>Contains at least one lowercase and uppercase chrachter</li>
                          </ul>
                        </div>
                      )}
                      isOpen={state.tipOpen} 
                      direction="right"
                      tagName="IconButton"
                      className="iconButtonTooltip"
                    >
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleClickShowPassword}
                        style={{color:'white'}}  
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </Tooltip>
                      
                  </InputAdornment>
                }
                name="p"
                id="r_p" 
              />
            </CssFormControl>
            <div id="msgp" class="small"></div>

            <CssFormControl fullWidth="true">
              <InputLabel htmlFor="adornment-password" style={{color:'white', fontSize: 20}}>Password Confirm</InputLabel>
              <Input
                id="adornment-password"
                type={values.showPassword_cf ? "text" : "password"}
                onChange={handlePWChange("password_cf")}
                value={values.password_cf}
                style={{color:'white'}}
                endAdornment={
                  <InputAdornment position="end">          
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleClickShowPassword_cf}
                      style={{color:'white'}}  
                    >
                      {values.showPassword_cf ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                name="pp" 
                id="r_pp" 
              />
            </CssFormControl>
            <div id="msgpp" class="small"></div>

            <div style={{marginTop: 10}}>
              <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      value={state.checkedB}
                      onChange={handleChange('checkedB')}
                      color="primary"
                      style={{color:'#00b0e4', fontSize: 10, height: 10,}}
                      id="chk_re"
                      name="chk_re"
                    />
                  }
                  label="I have a Referral Code"
                  style={{color:'white'}}
                />
                <Collapse
                  in={state.checkedB}
                >
                  <CssTextField
                    // label="Referral Code"
                    margin="normal"
                    type="text"
                    InputProps={{
                      className: classes.input
                    }}
                    style={{marginLeft: 30,}}
                    id="re"
                    name="re"
                  /> 
                </Collapse>
            </div>

            <div style={{marginTop: 10}}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedC}
                    onChange={handleChange('checkedC')}
                    value={state.checkedC}
                    color="primary"
                    style={{color:'#00b0e4', fontSize: 10, height: 10,}}
                    name="t"
                    id="r_terms"
                  />
                }
                label="I have read and agree to the"
                style={{color:'white', marginRight: 0}}
              />
              <a target="_blank" rel="noopener noreferrer"  style={{color:'#00b0e4', textDecoration: 'none'}} href="https://bitkings.io/terms-of-use"> Terms of usage </a> 
              <label for="terms" style={{color:'white', cursor:'hand'}} onClick={triggerCheck}>
                <span class="bitkings-white">
                  as well as </span>
              </label>
              <a target="_blank" rel="noopener noreferrer"  style={{color:'#00b0e4', textDecoration: 'none'}} href="https://bitkings.io/privacy-policy">Privacy </a> 
              <label for="terms" style={{color:'white', cursor:'hand'}} onClick={triggerCheck}>
                <span class="bitkings-white">
                  and 
                </span>
              </label>
              <a target="_blank" rel="noopener noreferrer"  style={{color:'#00b0e4', textDecoration: 'none'}} href="https://bitkings.io/cookies/"> Cookies Policy</a>
              
              <div id="msgterms" class="small"></div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="g-recaptcha" data-sitekey="6Le2_ZwUAAAAAAPnf7S5oyIFjzRJM8AGmgkzwOtU"></div>
              </div>
            </div>   
          </form>

          <DialogActions>
            <Button 
              color="primary" 
              variant="contained" 
              style={(state.checkedC)?{
                marginTop: 10, 
                width:'100%', 
                paddingLeft:'10%', 
                paddingRight:'10%', 
                backgroundColor: '#00b0e4',               
              }:{
                marginTop: 10, 
                width:'100%', 
                paddingLeft:'10%', 
                paddingRight:'10%', 
                backgroundColor: '#00b0e4',
                cursor : 'not-allowed',
                pointerEvents:'initial',
                backgroundColor: '#0e5367',
                color: '#8a8a8a'
              }}
              id='btnSign_up'
              disabled={(state.checkedC)? false: true}
            >LET'S GO
            </Button>
          </DialogActions>
          <div style={{marginTop: 10, marginBottom: 20, fontSize: 14, color:'white', display:'flex', justifyContent:'ceter', alignItems:'center', flexDirection:'column'}}>
            <div style={{justifyContent:'ceter'}}>
              <p>You already have a membership? <a href='#' style={{color:'#00b0e4', textDecoration: 'none'}} onClick={switchTab}> Sign In</a></p>
            </div>
          </div>
        </TabContainer>
      </SwipeableViews>
    </Container>
  );
}
//== End of Bitking Authenticaion Dialog ==//
export default AuthDialog;