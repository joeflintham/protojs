// #@(#)validation.js	1.6 15:32:10,08/05/06 (yy/mm/dd)

function prepareForms()
{
    for (var i = 0; i < document.forms.length; i++)
    {
	var form = document.forms[i];
	if ( form.className.match(/\bjsFormValidate\b/) )
	{
	    form.onsubmit = actionFormValidate;

	    if ( form.className.match(/\bjsFormRecaptcha\b/) )
	    {
		var recaptcha_field = form.recaptcha_response_field;
		if (recaptcha_field)
		{
			if (recaptcha_field.className)
			{
				recaptcha_field.className += " ";
			}
			recaptcha_field.className += "jsRecaptchaRequired";
		}
            }

	    var formlinks = form.getElementsByTagName('a');
	    for (var j = 0; j < formlinks.length; j++)
	    {
		var formlink = formlinks[j];
		if ( formlink.className.match(/\bjsFormBreakout\b/) )
		{
		    formlink.onclick = actionFormBreakout;
		}
	    }
	}
    }
}

var inputs;
var labels;

var actionTable = new Object();
actionTable.jsRequired = validateRequired;
actionTable.jsRecaptchaRequired = validateRecaptchaRequired;
actionTable.jsEmail = validateEmail;
actionTable.jsEmailDefaultOK = validateEmailDefaultOK;
actionTable.jsEmailChange = validateEmailChange;
actionTable.jsPasswordChange = validatePasswordChangeMand;
actionTable.jsPasswordChangeOpt = validatePasswordChangeOpt;
actionTable.jsPasswordNew = validatePasswordNew;

function actionFormValidate()
{
    var formValid;

    labels = this.getElementsByTagName('label');

    inputs = this.getElementsByTagName('input');
    if ( formValid = validateElements(inputs) )
    {
	var textAreas = this.getElementsByTagName('textArea');
	formValid = validateElements(textAreas);
    }

    return formValid;
}

function validateElements(elements)
{
    for ( var i = 0; i < elements.length; i++ )
    {
	var element = elements[i];

	for (var jsClass in actionTable)
	{
	    var re = new RegExp('\\b' + jsClass + '\\b');
	    if ( element.className && element.className.match(re) )
	    {
		if ( actionTable[jsClass] )
		{
		    if ( !actionTable[jsClass](element) ) return false;
		}
	    }
	}
    }

    return true;
}

function actionFormBreakout()
{
    var breakoutOK = true;
    var form = findParentByClass(this, /jsFormValidate/);
    var form_inputs = form.getElementsByTagName('input');
    for ( var i = 0; i < form_inputs.length; i++ )
    {
	var form_input = form_inputs[i];
	if ( form_input.type != "hidden" )
	{
	    if ( (form_input.checked != null) && (form_input.checked != form_input.defaultChecked) )
	    {
		breakoutOK = confirm('You have made changes on this page that you have not saved, if you continue your changes will be lost. Do you want to carry on?');
		break;
	    }
	}
    }

    return breakoutOK;
}

function validateRequired(field)
{
    var valueValid = true;

    if ( field.value.length == 0 )
    {
	var displayName = chooseFieldDisplayName(field, labels); 
	alert("Please enter a value for the " + displayName + " field.");
	valueValid = false;
	field.focus();
    }

    return valueValid;
}

function validateRecaptchaRequired(field)
{
    var valueValid = true;

    if ( field.value.length == 0 )
    {
	alert("Please enter a value for the 'captcha' security check field.");
	valueValid = false;
	field.focus();
    }
    else
    {
        var button;
        if (button = document.getElementById("CaptchaSubmit"))
        {
           button.disabled = true;
        }
    }
    return valueValid;
}

function validateRequiredNotDefault(field)
{
    var valueValid = (field.value.length > 0) && (field.value != field.defaultValue);

    if ( !valueValid )
    {
	var displayName = chooseFieldDisplayName(field, labels); 
	alert("Please enter a value for the " + displayName + " field.");
	valueValid = false;
	field.focus();
    }

    return valueValid;
}

function validateEmail(email)
{
    var valueValid = validateRequiredNotDefault(email);
    valueValid = valueValid && valid_email(email);

    return valueValid;
}

function validateEmailDefaultOK(email)
{
    var valueValid = valid_email(email);

    return valueValid;
}

function validateEmailChange(changedEmail)
{
    var valueValid = true;
    var currentPassword = lookupElementByClass('jsPasswordCurrent', inputs);

    if ( changedEmail.value != changedEmail.defaultValue )
    {
	valueValid = validateEmail(changedEmail); 
	if ( valueValid && !currentPassword.value )
	{
	    alert("You must enter your current password to change your email address.");
	    valueValid = false;
	    currentPassword.focus();
	}
    }

    return valueValid;
}

function validatePasswordChangeMand(changedPassword)
{
    return validatePasswordChange(changedPassword, true);
}

function validatePasswordChangeOpt(changedPassword)
{
    return validatePasswordChange(changedPassword, false);
}

function validatePasswordChange(changedPassword, fieldMandatory)
{
    var valueValid = true;
    var currentPassword = lookupElementByClass('jsPasswordCurrent', inputs);

    if ( changedPassword.value )
    {
	if ( !currentPassword.value )
	{
	    alert("You must enter your current password in order to change it.");
	    valueValid = false;
	    currentPassword.focus();
	}
	else
	{
	    valueValid = validatePasswordNew(changedPassword);
	}
    }
    else if ( fieldMandatory )
    {
	var displayName = chooseFieldDisplayName(changedPassword, labels); 
	alert("Please enter a value for " + displayName + ".");
	valueValid = false;
    }

    return valueValid;
}

function validatePasswordNew(newPassword)
{
    var valueValid = validatePassword8N1(newPassword);
    var confirmPassword = lookupElementByClass('jsPasswordConfirm', inputs);

    if ( valueValid && (!confirmPassword.value || (newPassword.value != confirmPassword.value)) )
    {
	var displayName1 = chooseFieldDisplayName(newPassword, labels); 
	var displayName2 = chooseFieldDisplayName(confirmPassword, labels); 
	alert("The values entered for " + displayName1 + " and " + displayName2 + " are different.");
	valueValid = false;
	confirmPassword.focus();
    }

    return valueValid;
}

function validatePassword8N1(password)
{
    var valueValid = true;

    if (password.value.length < 8 || password.value.length > 21 )
    {
       alert("Your password must be between 8 and 21 characters long");
       password.focus();
       valueValid = false;
    }
    else if ( password.value.search(/\d/) == -1 )
    {
       alert("Your password must contain at least 1 number");
       password.focus();
       valueValid = false;
    }

    return valueValid;
}

function chooseFieldDisplayName(field, labels)
{
    var displayName = field.name;
    var label = lookupLabelByElementID(field.id, labels);

    if ( label )
    {
	displayName = getINodeTextContent(label)
	displayName = displayName.replace(/[*:]\s*$/, '');
	displayName = displayName.replace(/^\s*\b/, '');
	displayName = displayName.replace(/\b\s*$/, '');
    }

    return displayName;
}

addLoadEvent(prepareForms);
loadScript('/js/valid_email.js');

