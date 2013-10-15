function OpenMonitor(name)
{
	nname=navigator.userAgent;
	features = "toolbar=1,location=0,directories=0,status=0,menubar=1,scrollbars=1,copyhistory=0,width=780,height=550,top=20,left=0,resizable=1";
	nversion=navigator.appVersion.substring(0,1);
	if ((nname.lastIndexOf("MSIE")==-1) || (nversion!=4))
	{
		myWindow = window.open(name,"my_jobsite_sub_window",features);
		myWindow.focus();
	}
	else // IE 4 (but not 3 or 5) throws a security exception
	{    // when focusing on a window on another domain
	     //
		myWindow = window.open(name,"my_jobsite_sub_window",features);
	}
}

function remove_dropdown_focus()
{
   // blur doesn't work properly on "select" objects in IE5
   document.create_form.email.focus();
   document.create_form.email.blur();
}

function change_url(sec_select)
{
   var code = sec_select.options[sec_select.selectedIndex].value;

   remove_dropdown_focus();

   if (code != "NONE")
   {
      var url = 'http://www.jobsite.co.uk/sectorpages/' + code + '.html';
      // var url = '/cgi-bin/advsearch?sector=' + code;
      document.location = url;
   }
}

function valid_email(address)
{
  if (address.indexOf("@")  == -1 || address.indexOf(".") == -1)
  {
    alert("Email addresses must contain one @ symbol and at least one dot");
    return false;
  }

  var checkOK = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'0123456789_-.@+";
  var checkStr = address;
  var allValid = true;
  for (i = 0;  i < checkStr.length;  i++)
  {
    ch = checkStr.charAt(i);

    if (checkOK.indexOf(ch) == -1)
    {
      alert("Please enter only letter, digit and \"_-'.@\" characters in this email field.");
      return(false);
    }   
  }

  return(true);
}

function create_form_check(theform) {
  if (theform.email.value == "")
  {
    alert("Please enter a value for the Email Address field.");
    theform.email.focus();
    return (false);
  }

  if (!valid_email(theform.email.value))
  {
    theform.email.focus();
    return (false);
  }

 return true;
}           

function login_form_check(theform) {
  if (theform.email.value == "")
  {
    alert("Please enter a value for the Email Address field.");
    theform.email.focus();
    return (false);
  }

  if (!valid_email(theform.email.value))
  {
    theform.email.focus();
    return (false);
  }

  if (theform.password.value == "")
  {
    alert("Please enter a value for the Password field.");
    theform.password.focus();
    return (false);
  }
 return true;
}           

function cl_login_form_check(theform) {
  if (theform.agency_id.value == "")
  {
    alert("Please enter a value for the Email Address field.");
    theform.agency_id.focus();
    return (false);
  }

  if (!valid_email(theform.agency_id.value))
  {
    theform.agency_id.focus();
    return (false);
  }

  if (theform.agency_pwd.value == "")
  {
    alert("Please enter a value for the Password field.");
    theform.agency_pwd.focus();
    return (false);
  }
 return true;
}           

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

function set_keyword_focus() {
    document.Search.fp_skill_include.focus();
}

var applicant_name = "";
var applicant_firstname = "";
var applicant_email = "";

function examineApplicantIdentity()
{
    var dc = document.cookie;
    var prefix = "applicant_identity" + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }

    var applicant_identity = unescape(dc.substring(begin + prefix.length, end));

    if ( applicant_identity == "logged_off" ) {
	applicant_name = "logged_off";
	return null;
    }

    var divider_loc = applicant_identity.indexOf("&");
    applicant_name = applicant_identity.substring(0, divider_loc);
    applicant_email = applicant_identity.substring(divider_loc+1, applicant_identity.length);

    var name_loc = applicant_name.indexOf(" ");
    if (!name_loc) {
	applicant_firstname = applicant_name;
    } else {
	applicant_firstname = applicant_name.substring(0, name_loc);
    }

}

function printApplicantName()
{
    if ( applicant_name.length > 0 && applicant_name != "logged_off") { 
    	document.write("<strong>Hi " + applicant_firstname + "</strong>, Welcome back to Jobsite.");
    	document.write(' (<a href="/cgi-bin/myjobsite.cgi?action=force_login">not '+ applicant_name +'?</a>).');
    }
}

function onLoadHandler()
{
	document.mjlogin.email.value = applicant_email;
}

sfHover = function() {
	if (!document.getElementById("channel")) return false;
	var sfEls = document.getElementById("channel").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);

// Homepage channel

function channel() {
		var scrOfX = 0, scrOfY = 0;
		if( typeof( window.pageYOffset ) == 'number' ) {
			//Netscape compliant
			scrOfY = window.pageYOffset;
			scrOfX = window.pageXOffset;
		} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
			//DOM compliant
			scrOfY = document.body.scrollTop;
			scrOfX = document.body.scrollLeft;
		} else if( document.documentElement &&
		( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
			//IE6 standards compliant mode
			scrOfY = document.documentElement.scrollTop;
			scrOfX = document.documentElement.scrollLeft;
		}
		var myTop = scrOfY += 75;
		var channelPop = document.getElementById("channelPop");
		channelPop.style.top = myTop + "px";
		document.getElementById("daysback").style.left = "-99999px";
}
	
function channelOff() {
		var channelPop = document.getElementById("channelPop");
		channelPop.style.top = '-99999px';
		document.getElementById("daysback").style.left = "0";
}

// Homepage Search Box

function formVooDoo(myField)
{
	if(myField.defaultValue==myField.value)
	myField.value='';
	myField.className='text user-input';
}

function clearForm()
{
  if (document.Search.fp_skill_include.defaultValue == document.Search.fp_skill_include.value)
  {
    document.Search.fp_skill_include.value = '';
  }

  if (document.Search.location_include.defaultValue == document.Search.location_include.value)
  {
    document.Search.location_include.value = '';
  }
}   

function obj(i){				
	if(!document.getElementById){
		// IE 4+
		return document.all(i)
	}
	else{
		 return document.getElementById(i)
	}      			
}
	
