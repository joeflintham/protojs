// #@(#)core.js	1.7 12:44:22,07/09/04 (yy/mm/dd)

function addLoadEvent(func)
{
    var oldonload = window.onload;

    if (typeof window.onload != 'function')
    {
	window.onload = func;
    }
    else
    {
	window.onload = function() { oldonload(); func(); }
    }
}

function cookiesEnabled()
{	
	// The official way to detect cookies is to use navigator.cookieEnabled
	// but there's a problem in all versions of Firefox where it returns a
	// a global enabled/disabled value and ignores site specific cookie blocking
	
	var cookieEnabled = false;

	document.cookie = "testcookie"
	cookieEnabled = (document.cookie.indexOf("testcookie")!=-1);

	return cookieEnabled;
}

function createCookie(name,value,days)
{
    var expires = "";

    if (days)
    {
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	expires = "; expires="+date.toGMTString();
    }

    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);				
	}
	return null;
}

function eraseCookie(name)
{
	createCookie(name,"",-1);
}

function findParentByClass(childElement, targetClassRegexp)
{
    var targetElement;
    var candidateElement = childElement.parentNode;

    while ( !targetElement && (candidateElement != document) )
    {
	if ( candidateElement.className.match(targetClassRegexp) )
	{
	    targetElement = candidateElement;
	}
	else
	{
	    candidateElement = candidateElement.parentNode;
	}
    }

    return targetElement;
}

function findTopLeft(obj) 
{
    var curTop = 0;
    var curLeft = 0;

    if (obj.offsetParent) 
    {
	curLeft = obj.offsetLeft
	curTop = obj.offsetTop
	while (obj = obj.offsetParent) 
	{
	    curLeft += obj.offsetLeft
	    curTop += obj.offsetTop
	}
    }

    return [curTop, curLeft];
}

function findBounds(obj)
{
    var topLeft = findTopLeft(obj);

    return [topLeft[0], topLeft[1], topLeft[0] + obj.offsetHeight, topLeft[1] + obj.offsetWidth];
}

function getScrollTop()
{
    var scrollTop;

    if ( document.documentElement && document.documentElement.scrollTop )
    {
	scrollTop = document.documentElement.scrollTop;
    }
    else if ( document.body.scrollTop )
    {
	scrollTop = document.body.scrollTop;
    }
    else
    {
	scrollTop = 0;
    }

    return scrollTop;
}

function getINodeTextContent(element)
{
    if ( element.innerText )
    {
	return element.innerText;
    }
    else
    {
	return element.textContent;
    }
}

function lookupElementByClass(className, elements)
{
    var element;
    var pattern = new RegExp("\\b" + className + "\\b");

    for (var i = 0; !element && (i < elements.length); i++)
    {
	if ( elements[i].className.match(pattern) )
	{
	    element = elements[i];
	}
    }

    return element;
}

function lookupLabelByElementID(id, labels)
{
    var label;

    for (var i = 0; !label && (i < labels.length); i++)
    {
	if ( labels[i].htmlFor == id )
	{
	    label = labels[i];
	}
    }

    return label;
}

function loadScript(script)
{
    document.write('<scr' + 'ipt type="text/javascript" src="' + script + '"></script>');
}


