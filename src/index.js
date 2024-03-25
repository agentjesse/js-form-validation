/* Next task:
-  write next tasks for project here, commit messages get buried
- example task
*/

// importing CSS directly into the related js file
import './styles.css';

// module imports, from named and default
import { logToConsole as lg, tableToConsole as tb } from './logger'; //shorthand loggers

//form validation logic wrapper
( ()=>{
  const emailInput = document.querySelector('#emailInput');
  const countrySelect = document.querySelector('#countrySelect');
  const submitBtn = document.querySelector('#submitBtn');

  //setup custom messages for form submissions before form elements' listener
  // callbacks are activated and when browser validation is being used:
  //for email input with validity object's valueMissing = true:
  emailInput.setCustomValidity( 'An email address is expected.' );//overwrite default message with a custom one
  //custom message for unselected select element:
  countrySelect.setCustomValidity( 'Please pick a country.' );//COMMENT OUT FOR BROWSER validation, messes up validity

  emailInput.addEventListener( 'input', ()=> {
    // lg( 'validity state object: ' );
    // lg( emailInput.validity );//validity state object has entries related to validity of the data

    if ( emailInput.validity.typeMismatch ) {
      emailInput.setCustomValidity( 'An email address is expected.' ); //overwrite default message with a custom one
    } else {
      emailInput.setCustomValidity( '' ); //no issue, make sure to set no message
    }

    if ( emailInput.validity.tooShort ) {
      emailInput.setCustomValidity( 'More characters are expected.' ); //overwrite default message with a custom one
    } else {
      emailInput.setCustomValidity( '' ); //no issue, make sure to set no message
    }

    //show validationMessage if it exists. comment out for browser validation
    document.querySelector('#emailErrorMsg').textContent = emailInput.validationMessage;
  } );

  //need to control noSelection class on select elements and show their messages in
  //their error message elements
  countrySelect.addEventListener( 'input', e=> {
    if ( e.target.value ) {
      e.target.classList.remove('noSelection');
      //clear validationMessage if previously set
      document.querySelector('#countryErrorMsg').textContent = '';
    } else {
      e.target.classList.add('noSelection');
      //show validationMessage if it exists. comment out for browser validation
      document.querySelector('#countryErrorMsg').textContent = countrySelect.validationMessage;
    }
  } );

  //the listener below is for manual js validation, OTHERWISE COMMENT OUT
  /* */
  submitBtn.addEventListener( 'click', e=> {
    let isFormValid = false; //manual form submission control
    // Prevent the default action of clicking on a button in a form (i.e., prevent form submission).
    e.preventDefault();

    // Manual form validity checks
    lg( 'beginning manual form validation...' );
    lg( `email valid: ${emailInput.validity.valid}` );
    lg( `country selected: ${!countrySelect.validity.valueMissing}` );
    if (
      emailInput.validity.valid
      && !countrySelect.validity.valueMissing
    ) {
      isFormValid = true;
    }

    // After checking the data inputs validity manually and setting the
    //isFormValid control variable:
    // Call submit() on the HTMLFormElement. Remember, it sends the form data
    //even if the form's data doesn't satisfy the constraints.
    isFormValid && document.querySelector('form').submit();
  } );


} )();
