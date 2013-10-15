// #@(#)controls.js	1.15 15:48:32,08/07/18 (yy/mm/dd)

function OpenMonitor(name)
{
    openPopUp(name);
}

function actionPopinShow()
{
    var thisID = this.id
    var popinID = thisID.replace(/Link\d*$/, '');
    var popin = document.getElementById(popinID);

    var followLink = true;
    if ( popin )
    {
	showPopin(popin);
	followLink = false;
    }

    return followLink;
}

// Custom handler for AV.
// Hides all channel pop-ups when one is clicked, so only one is open at a time.
// Should be rolled into a proper generic solution.  TALK TO ME!   -- tmg 18/07/2008
function actionPopinShowAV()
{
    var thisID = this.id
    var popinID = thisID.replace(/Link\d*$/, '');
    var popin = document.getElementById(popinID);

    var followLink = true;
    if ( popin )
    {
	hidePopinDirect(document.getElementById('channelPop1'));
	hidePopinDirect(document.getElementById('channelPop2'));
	hidePopinDirect(document.getElementById('channelPop3'));
	showPopin(popin);
	followLink = false;
    }

    return followLink;
}

function actionPopinHide()
{
    hidePopin(this);
    return false;
}

function actionPopinHideAndFlag()
{
    flagPopinLinkAction(this);
    hidePopin(this);
    return false;
}

function actionPopinFollowAndFlag()
{
    flagPopinLinkAction(this);
    return true;
}

function actionRemoveDefaultValue()
{
    if ( this.value == this.defaultValue )
    {
	this.value = "";
    }
}

function actionCheckboxGroupReset()
{
    var group = this.className.match(/\b(jsCheckboxGroup.*)Reset\b/);
    resetCheckboxGroup(group[1]);

    return false;
}

function actionCheckboxGroup()
{
}

function actionConfirm()
{
    var retVal = true;

    var keyMatch = this.className.match(/\bjsConfirm.*\b/);
    var key = keyMatch[0];
    var text = jsConfirmLUT[key];
    if ( text )
    {
	retVal = confirm(text);
    }

    return retVal;
}

function actionInsertDefaultValue()
{
    if ( this.value == "" )
    {
	this.value = this.defaultValue;
    }
}

function flagPopinLinkAction(popinChild)
{
    var popin = findPopinFromChild(popinChild);
    var cookieName = popin.id;
    createCookie(cookieName, 1, 365);
}

function openPopUp(href)
{
    // toolbar=1  for back/forward buttons with FF & IE6
    // location=1 for back/forward buttons with IE7 
    // status=1   for IE6
    var options = "toolbar=1,location=0,directories=0,status=0,menubar=1,scrollbars=1,copyhistory=0,width=780,height=550,top=20,left=0,resizable=1";
    var myWindow = window.open(href, "jsfriend", options);
    myWindow.focus();
}

function showPopinConditional(popin)
{
    if( cookiesEnabled() )
    {
	var cookieName = popin.id;
	var cookieVal = readCookie(cookieName);
	if ( !cookieVal )
	{
	    showPopin(popin);
	}
    }
}

function showPopin(popin)
{
    if ( popin.className.match(/\bjsPopinPosnRelTop\b/) )
    {
	var screenTop = getScrollTop();
	popin.style.top = (screenTop + 75) + "px";
    }
    popin.className += ' showElement';

    hideOverlappedElements(popin, 'select');
}

function hidePopinDirect(popin)
{
    popin.className = popin.className.replace(/ showElement\b/, '');
    showHiddenElements('select');
}

function hidePopin(popinChild)
{
    var popin = findPopinFromChild(popinChild);
    popin.className = popin.className.replace(/ showElement\b/, '');

    showHiddenElements('select');
}

function findPopinFromChild(popinChild)
{
    return findParentByClass(popinChild, /\bjsPopin/);
}

function hideOverlappedElements(popin, tagName)
{
    var popinBounds = findBounds(popin);
    var popinTopBound = popinBounds[0];
    var popinLeftBound = popinBounds[1];
    var popinBtmBound = popinBounds[2];
    var popinRightBound = popinBounds[3];

    var elements = document.getElementsByTagName(tagName);
    for(i = 0; i < elements.length; i++)
    {
	var selBounds = findBounds(elements[i]);
	var selTopBound = selBounds[0];
	var selLeftBound = selBounds[1];
	var selBtmBound = selBounds[2];
	var selRightBound = selBounds[3];
	
	if ( !((popinTopBound > selBtmBound) || (popinBtmBound < selTopBound) || 
	      (popinLeftBound > selRightBound) || (popinRightBound < selLeftBound)) )
	{
	    elements[i].className += ' hideElement';
	}		
    }
}

function showHiddenElements(tagName)
{
    var elements = document.getElementsByTagName(tagName);
    for(i = 0; i < elements.length; i++)
    {
	elements[i].className = elements[i].className.replace(/ ?hideElement\b/, '');
    }
}

function resetCheckboxGroup(groupName)
{
    var inputs = document.getElementsByTagName('input');
    var groupNamere = new RegExp("\\b" + groupName + "(\\D|\\b)");

    for (var i = 0; i < inputs.length; i++)
    {
	var input = inputs[i];
	if ( (input.type == 'checkbox') && (input.className.match(groupNamere)) )
	{
	    input.checked = false;
	}
    }
}

function deselectCheckboxAll( groupName )
{
	var elements = document.getElementsByTagName( 'input' );

	for ( var i = 0; i < elements.length; i++ )
	{
		if ( elements[i].type == 'checkbox' )
		{
			if ( elements[i].className.match(/\bjsCheckboxAll\b/) )
			{
				if ( elements[i].name == groupName )
				{
					elements[i].checked = false;
				}
			}
		}
	}
}

function deselectCheckboxExceptAll( groupName )
{
	var elements = document.getElementsByTagName( 'input' );

	for ( var i = 0; i < elements.length; i++ )
	{
		if ( elements[i].type == 'checkbox' )
		{
			if ( elements[i].className.match(/\bjsCheckbox\b/) )
			{
				if ( elements[i].name == groupName )
				{
					elements[i].checked = false;
				}
			}
		}
	}
}

function listHoverOver( list )
{
	var className = list.className.match(/\b(jsHoverList\d\d)\b/)

   list.className += ' hover';

   if( listHoverItems = document.getElementById( className[0] + '-Items' ) )
	{
	   listHoverItems.style.display = 'block';
	}
}

function listHoverOut( list )
{
	var className = list.className.match(/\b(jsHoverList\d\d)\b/)

   list.className = list.className.replace( / ?hover\b/, '' );

   if ( listHoverItems = document.getElementById( className[0] + '-Items' ) )
	{
   	listHoverItems.style.display = 'none';
	}
}

function prepareLists()
{
	var elements = document.getElementsByTagName('li');

	for (var i = 0; i < elements.length; i++)
	{
		if ( elements[i].className.match(/\bjsHoverList/) )
		{
			elements[i].onmouseover = function() { listHoverOver( this ); };
			elements[i].onmouseout  = function() { listHoverOut( this ); };
		}
	}
}

function prepareLinks()
{
    var elements = document.getElementsByTagName('a');
    for (var i = 0; i < elements.length; i++)
    {
	if ( elements[i].className.match(/\bjsPopup\b/) )
	{
	    elements[i].onclick = function() { openPopUp(this.href); return false; }
	}
	else if ( elements[i].className.match(/\bjsPopinShowAV\b/) )
	{
	    elements[i].onclick = actionPopinShowAV;
	}
	else if ( elements[i].className.match(/\bjsPopinShow\b/) )
	{
	    elements[i].onclick = actionPopinShow;
	}
	else if ( elements[i].className.match(/\bjsPopinHide\b/) )
	{
	    elements[i].onclick = actionPopinHide;
	}
	else if ( elements[i].className.match(/\bjsPopinFollowAndFlag\b/) )
	{
	    elements[i].onclick = actionPopinFollowAndFlag;
	}
	else if ( elements[i].className.match(/\bjsPopinHideAndFlag\b/) )
	{
	    elements[i].onclick = actionPopinHideAndFlag;
	}
	else if ( elements[i].className.match(/\bjsCheckboxGroup[\d-]+Reset\b/) )
	{
	    elements[i].onclick = actionCheckboxGroupReset;
	}
	else if ( elements[i].className.match(/\bjsConfirm/) )
	{
	    elements[i].onclick = actionConfirm;
	}
    }
}

function prepareFormFields()
{
    var inputs = document.getElementsByTagName('input');
    var buttons = document.getElementsByTagName('button');

    var elementsGroup = [ inputs, buttons ];
    for (var i = 0; i < elementsGroup.length; i++)
    {
	var elements = elementsGroup[i];
	for (var j = 0; j < elements.length; j++)
	{
	    if ( (elements[j].type == "text") && elements[j].className.match(/\bjsDefaultValue\b/) )
	    {
		elements[j].onfocus = actionRemoveDefaultValue;
		elements[j].onblur  = actionInsertDefaultValue;
	    }

	    if ( elements[j].className.match(/\bjsCheckboxGroup/) )
	    {
		elements[j].onclick = actionCheckboxGroup;
	    }

	    if ( elements[j].className.match(/\bjsConfirm/) )
	    {
		elements[j].onclick = actionConfirm;
	    }

			if ( elements[j].className.match(/\bjsCheckbox\b/) || elements[j].className.match(/\bjsCheckboxAll\b/) )
			{
				if ( elements[j].className.match(/\bjsCheckbox\b/) )
				{
					elements[j].onclick = function() { deselectCheckboxAll( this.getAttribute( "name" ) ); };
				}
				else if ( elements[j].className.match(/\bjsCheckboxAll\b/) )
				{
					elements[j].onclick = function() { deselectCheckboxExceptAll( this.getAttribute( "name" ) ); };
				}
			}
	}
    }
}

function prepareDivs()
{
    var elements = document.getElementsByTagName('div');
    for (var i = 0; i < elements.length; i++)
    {
	if ( elements[i].className.match(/\bjsPopinShowIfNoFlag\b/) )
	{
	    showPopinConditional(elements[i]);
	}
    }
}

function prepareControls()
{
    prepareLinks();
    prepareFormFields();
    prepareDivs();
    prepareLists();
}

addLoadEvent(prepareControls);

