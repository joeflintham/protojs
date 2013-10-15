// #@(#)jobhunterbar.js	1.24 10:34:08,11/12/12 (yy/mm/dd)

function getConsultantIdentityFromCookie()
{
   var dc     = document.cookie;
   var prefix = "consultant_identity=";
   var begin  = dc.indexOf( "; " + prefix );

   if ( begin == -1 )
   {
      begin = dc.indexOf( prefix );
   }
   else
   {
      begin += 2;
   }

   var end = document.cookie.indexOf( ";", begin );

   if ( end == -1 )
   {
      end = dc.length;
   }

   var consultant_identity = '';

   if ( begin != -1 )
   {
      consultant_identity = unescape(dc.substring(begin + prefix.length, end));
   }

   // Get the consultant cookie details.
   dc     = document.cookie;
   prefix = "clli=";
   begin  = dc.indexOf( "; " + prefix );

   if ( begin == -1 )
   {
      begin = dc.indexOf(prefix);
   }
   else
   {
      begin += 2;
   }

   var end = document.cookie.indexOf( ";", begin );

   if ( end == -1 )
   {
      end = dc.length;
   }

   var consultant = '';

   if ( begin != -1 )
   {
      consultant = unescape(dc.substring(begin + prefix.length, end));
   }

   var consultant_name = '';

   if (consultant != '')
   {
      consultant_name  = consultant_identity;
   }

   return consultant_name;
}

function getApplicantIdentityFromCookie()
{
   // Get the applicant_location cookie details.
   var dc     = document.cookie;
   var prefix = "applicant_identity=";
   var begin  = dc.indexOf( "; " + prefix );

   if ( begin == -1 )
   {
      begin = dc.indexOf( prefix );
   }
   else
   {
      begin += 2;
   }

   var end = document.cookie.indexOf( ";", begin );

   if ( end == -1 )
   {
      end = dc.length;
   }

   var applicant_identity = '';

   if ( begin != -1 )
   {
      applicant_identity = unescape(dc.substring(begin + prefix.length, end));
   }

   // Get the applicant cookie details.
   dc     = document.cookie;
   prefix = "apli=";
   begin  = dc.indexOf( "; " + prefix );

   if ( begin == -1 )
   {
      begin = dc.indexOf(prefix);
   }
   else
   {
      begin += 2;
   }

   var end = document.cookie.indexOf( ";", begin );

   if ( end == -1 )
   {
      end = dc.length;
   }

   var applicant = '';

   if ( begin != -1 )
   {
      applicant = unescape(dc.substring(begin + prefix.length, end));
   }

   var applicant_name = '';
   var applicant_email = '';	// NOTE: not currently used but extracted in case needed in future

   if (applicant != '')
   {
      var divider_loc     = applicant_identity.indexOf( '&' );
      applicant_name  = applicant_identity.substring( 0, divider_loc );
      applicant_email = applicant_identity.substring( divider_loc + 1, applicant_identity.length );
   }

   return applicant_name;
}

function evaluateCLLICookie()
{
	var dc = document.cookie;
	if(!dc || dc.length == 0)
	{
		return false;
	}

	var prefix = "clli";
	var c_start = dc.indexOf(prefix + "=");

	if(c_start == -1)
	{
		return false;
	}
	else
	{
		c_start = c_start + prefix.length + 1; 
		var c_end = dc.indexOf(";", c_start);
		if (c_end == -1) c_end = dc.length;
		var c_value = unescape(dc.substring(c_start, c_end));

		if(c_value == "1")
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

function printAdditionalTabs( website_url )
{
    var nav_tabs = document.getElementById("nav_tabs");
    var listNode = document.createElement("li");
    listNode.setAttribute("class", "whiteBg");

	if(evaluateCLLICookie())
    {
	    listNode.innerHTML = "<a href=\"" + website_url + "/help/products\">Recruiter Services</a>";
		listNode.className = "whiteBg";
		nav_tabs.insertBefore(listNode, nav_tabs.firstChild);
    }
	else
	{
	    listNode.innerHTML = "<a href=\"" + website_url + "/cgi-bin/login_consultant.cgi\">Recruiter Login</a>";
		listNode.className = "whiteBg";
        nav_tabs.insertBefore(listNode, nav_tabs.firstChild);
	}
}

function printJobHunterBar( website_url, myprofile_name )
{
   var applicant_name = getApplicantIdentityFromCookie();
   
	if (myprofile_name == null) {
		myprofile_name = "My Jobsite";
	} else {
		myprofile_name = myprofile_name;
	};
	
   // Check to see if the user is logged in.
   if ( applicant_name == '' )
   {
      document.write( "<div class=\"border\">\n" +
					  "<h2>Job Hunter Login</h2>\n" +
                      "<form id=\"mjlogin\" method=\"post\" name=\"mjlogin\" action=\"" + website_url + "/cgi-bin/login_applicant.cgi?src=hp\" class=\"jsFormValidate\">\n" +
        			  "<fieldset>\n" +
            		  "<legend>Job Hunter Login</legend>\n" +
                      "<div class=\"formGroup one\">\n" +
                      "<input type=\"hidden\" name=\"action\" value=\"login_user\" />\n" +
					  "<span class=\"formInnerBlock\">\n" +
                      "<label for=\"login_email\" class=\"pre\">Email Address</label>\n" +
                      "<input type=\"text\" class=\"inputText jsEmail\" name=\"email\" id=\"login_email\" autocomplete=\"off\" value=\"\" />\n" +
					  "</span>\n" +
					  "<span class=\"formInnerBlock\">\n" +
                      "<label for=\"login_password\" class=\"pre\">Password</label>\n" +
					  "<input type=\"password\" class=\"inputText jsRequired\" id=\"login_password\" name=\"password\" value=\"\" />\n" +
					  "</span>\n" +
                      "</div>\n" +
					  "<input type=\"submit\" class=\"inputButton\" value=\"Login\" />\n" +
                      "<a href=\"/remind?type=C\">Lost password?</a><a href=\"/faq/Jobseeker/?src=hp\">Help</a>" +
            		  "</fieldset>\n" +
                      "</form>\n" +
                      "</div>" );
   }
   else
   {

      document.write( "<div class=\"border loggedin\">\n" +
					  "<h2>Job Hunter Login</h2>\n" +
                      "<p>\n" +
                      "You are logged in as\n" +
					  "<br /><strong>" + applicant_name + "</strong>.\n" +
                      "<br /><br /><a href=\"" + website_url + "/cgi-bin/myjobsite.cgi?src=hp\">" + myprofile_name + "</a> &nbsp;&nbsp; <a href=\"/faq/Jobseeker/?src=hp\">Help</a> &nbsp;&nbsp; <a href=\"/cgi-bin/logoff.cgi?src=hp\">Sign Out</a>\n" +
                      "</p>\n" +
                      "</div>");
   }
}

function printConsultantBar( website_url, websiteIdentity )
{
	var consultant_name = getConsultantIdentityFromCookie();

	// Check to see if the user is logged in.
	if ( consultant_name != '' )
	{
		document.write("<div class=\"post-a-job loggedin\">" +
			"<div id=\"recruiterLogin\" class=\"cell style-2\">" +
			"<div class=\"border\">\n" +
			"<h2>Recruiter</h2>\n" +
			"<p>\n" +
			"You are logged in as\n" +
			"<br /><strong>" + consultant_name + "</strong>.\n" +
			"<br /><br /><a href=\"/cgi-bin/myadvmgr.cgi\">Client Home</a> &nbsp;&nbsp; <a href=\"/faq/Recruiter\">Help</a> &nbsp;&nbsp; <a href=\"/cgi-bin/logoff.cgi\">Sign Out</a>\n" +
			"</p>\n" +
			"</div></div></div>");
	}
	else{
		document.write("<div class=\"post-a-job\">" +
			"<div id=\"recruiterLogin\" class=\"cell style-2\">" +
			"<div class=\"border\">" +
			"<h2>Recruiter</h2>" +
			"<ul><li><a href=\"/recruiter/?src=hp\" class=\"rec-login\">Recruiter login</a></li>" +
			"<li><a href=\"/recruiter_services/\" class=\"rec-service\">Recruiter services</a></li></ul>" +
			"<a href=\"/cgi-bin/ovp_products.cgi?partner=hplink&amp;src=hp\" class=\"postAjob-card\">Post a job by credit card</a>" +
			"</div></div></div>");
	}
}

function printConsultantBar_RecHome( website_url, websiteIdentity )
{
	var consultant_name = getConsultantIdentityFromCookie();

	// Check to see if the user is logged in.
	if ( consultant_name != '' )
	{
		document.write("<h2>Recruiter Login</h2>" +
			"<p>You are logged in as" +
			"<br /><strong>" + consultant_name + "</strong>." +
			"<br /><br /><a href=\"/cgi-bin/myadvmgr.cgi\">Client Home</a> &nbsp;&nbsp; <a href=\"/faq/Recruiter\">Help</a> &nbsp;&nbsp; <a href=\"/cgi-bin/logoff.cgi\">Sign Out</a>" +
			"</p>");
	}
	else{
		document.write("<form method=\"post\" name=\"login\" action=\"" + website_url + "/cgi-bin/login_consultant.cgi\" class=\"jsFormValidate\"><fieldset>" +							
			"<h2>Recruiter Login</h2>" +
			"<input type=\"hidden\" name=\"action\" value=\"login_user\" class=\"input-hidden\" />" +
			"<label for=\"email\">Email</label>" +
			"<input type=\"text\" name=\"email\" class=\"text jsEmail\" id=\"email\" autocomplete=\"off\" />" +
			"<label for=\"password\">Password</label>" +
			"<input type=\"password\" name=\"agency_pwd\" class=\"text jsRequired\" id=\"password\" />" +
			"<label for=\"security_code\">Security Code</label>" +
			"<input type=\"password\" class=\"text jsRequired\" id=\"security_code\" name=\"security_code\" />" +
			"<input type=\"submit\" class=\"submit\" value=\"Login\" />" +
			"<p><a href=\"/remind?type=R\">Forgotten your password and/or security code?</a></p>" +
		"</fieldset></form>");
	}
}

// Bespoke function written for Emed Careers but could be used by any site.
function printJobHunterBarEC( website_url, websiteIdentity, page_ident )
{
	var applicant_name = getApplicantIdentityFromCookie();

	// Check to see if the user is logged in.
	if ( applicant_name == '' )
	{
		if(page_ident && page_ident == "home")
		{
			document.write("<span>Welcome, please <a href=\"" + website_url + "/prereg/\" rel=\"nofollow\">register</a> or <a href=\"" + 
				website_url + "/cgi-bin/login_applicant.cgi\" rel=\"nofollow\">sign in</a></span>");

		}
		else
		{
			document.write( "<span id=\"navBar\">\n" +
				"Welcome, please <a href=\"/prereg\" rel=\"nofollow\">register</a> or <a href=\"" + website_url + "/cgi-bin/login_applicant.cgi\" rel=\"nofollow\">sign in</a>\n" +
				"</span>" );
		}
	}
	else
	{
		document.write( "<span id=\"navBar\" class=\"loggedin\">" +
			"Welcome  <strong>" + applicant_name + "</strong>.  <a href=\"" + website_url + "/cgi-bin/logoff.cgi\" rel=\"nofollow\">Log off</a>" +
			"</span>");
	}
}

function printConsultantBarEC( website_url, websiteIdentity )
{
	var consultant_name = getConsultantIdentityFromCookie();

	// Check to see if the user is logged in.
	if ( consultant_name != '' )
	{
		document.write( "<span id=\"navBar\" class=\"loggedin\">" +
			"Welcome  <strong>" + consultant_name + "</strong>.  <a href=\"" + website_url + "/cgi-bin/logoff.cgi\" rel=\"nofollow\">Log off</a>" +
			"</span>");
	}
}

