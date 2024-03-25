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

  //setup custom messages if form submissions happen before form elements' listener
  // callbacks are activated. CAREFUL! setting custom validity messages also make calls to checkValidity() fail if the message still exists.
  //for email input with validity object's valueMissing = true:
  emailInput.setCustomValidity( 'An email address is expected.' );//overwrite default message with a custom one

  emailInput.addEventListener( 'input', ()=> {
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
    if ( e.target.checkValidity() ) {
      e.target.classList.remove('noSelection');
    } else {
      e.target.classList.add('noSelection');
    }
    //show/remove custom validation message (non Constraint Validation API)
    document.querySelector('#countryErrorMsg').textContent = countrySelect.checkValidity() ? '' : 'Please pick a country';
  } );

  //the listener below is for manual js validation, OTHERWISE COMMENT OUT
  /* */
  submitBtn.addEventListener( 'click', e=> {
    // Prevent the default action. Here, clicking on the form button will not lead to form submission.
    e.preventDefault();

    let isFormValid = false; //manual form submission control

    // Manual form validity checks
    // lg( `email valid: ${ emailInput.checkValidity() }` );
    // lg( `country selected: ${ countrySelect.checkValidity() }` );
    if (
      emailInput.checkValidity()
      && countrySelect.checkValidity()
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
