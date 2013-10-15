// #@(#)valid_email.js	1.3 18:21:28,13/05/13 (yy/mm/dd)
// # Validation Javascript Module For Email Addresses
function valid_email(email_field)
{
  // DEFAULT VALUES FOR PARAMETERS
  var mandatory = 1;
  var focus = 1;
  var name = 'Email Address';

  // COMPARISON VARIABLE FOR UNDEFINED email_field
  var is_undefined;

  var checkOK = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-.@+\'';
  
  // ARRAY OF ARGUMENT VALUES
  var argv = valid_email.arguments;
  // THE NUMBER OF ARGUMENTS PASSED TO THIS FUNCTION
  var argc = argv.length;

  // THE OBJECT PASSED MUST EXIST OTHERWISE NONE OF THE CHECKS WORK
  if(email_field == is_undefined)
  {
    alert("Object passed to valid_email is undefined");
    return (false);
  }

  // Detect if the form element passed is a select box
  // a quit

  if(email_field.type == "select-one")
  {
    return(true);
  }

  // REGULAR EXPRESSION FOR PARAMETERS
  var pattern = /^(\w+)=/;

  // LOOP THROUGH THE ARGUMENTS (1 THROUGH N-1)
  for (var i = 1; i < argc; i++)
  {
    
    var param_name = pattern.exec(argv[i]);

    switch(param_name[1])
    {
      case "not_mandatory":
        if(argv[i].substr(param_name[0].length) == 1)
        {
          mandatory = 0;
        }
        break;
      case "no_focus":
        if(argv[i].substr(param_name[0].length) == 1)
        {
          focus = 0;
        }
        break;
      case "display_name":
        name = argv[i].substr(param_name[0].length);
        break;
      default:
        alert("Unknown parameter " + argv[i] + " passed to valid_email");
        break;
    }  
  }
 
  // IF THE FIELD IN MANDATORY AND NOT FILLED OUT
  if(mandatory == 1)
  {
    if (email_field.value == "")
    {
       alert("Please enter a value for the " + name + " field.");
       if(focus == 1)
       {
          email_field.focus();
       }
       return (false);
     }
  }

  if(mandatory == 0 && email_field.value == "")
  {
    return (true);
  }

  // EMAIL ADDRESSES MUST CONTAIN 1 '@' AND 1 '.' 
  if (email_field.value.indexOf("@")  == -1 || email_field.value.indexOf(".") == -1)
  {
    alert("Invalid email address - " + name + " field. \n A valid email address will contain: letters, numbers and the following characters (not including the double-quotes) \"-'_.@\". It must contain one @ sign and at least one dot.");

    if(focus == 1)
    {
      email_field.focus();
    }
    return false;
  }

  // COMPARED WITH THE LIST OF VALID CHARACTERS IN THE check_ok VARIABLE  
  for (i = 0;  i < email_field.value.length;  i++)
  {
    ch = email_field.value.charAt(i);

    if (checkOK.indexOf(ch) == -1)
    {
      alert("Invalid email address - " + name + " field. \n A valid email address will contain: letters, numbers and the following characters (not including the double-quotes) \"-'_.@\". It must contain one @ sign and at least one dot.");

      if(focus == 1)
      {
        email_field.focus();
      }
      return(false);
    }
  }

  return(true);
}
