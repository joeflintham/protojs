var default_content="";
var urlParams;

(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

$(document).ready(function(){
	
	checkURL();
	$('ul li a').click(function (e){

			checkURL(this.hash);

	});
	
	//filling in the default content
	default_content = $('#pageContent').html();
	
	
	setInterval("checkURL()",250);
	
});

var lasturl="";

function checkURL(hash)
{
	if(!hash) hash=window.location.hash;
	
	if(hash != lasturl)
	{
		lasturl=hash;
		
		// FIX - if we've used the history buttons to return to the homepage,
		// fill the pageContent with the default_content
		
		if(hash=="")
		$('#pageContent').html(default_content);
		
		else
		loadPage(hash);
	}
}

function loadPage(url)
{
	url=url.replace('#page','');
	
	$('#loading').css('visibility','visible');
	
	$.ajax({
		type: "GET",
		// url: "/page_"+url+".html",
		url: "/v1/vacancy",
		data: urlParams,
		dataType: "json",
		success: function(msg){
			
			if(parseInt(msg)!=0)
			{
                var source = $("#search-result-template").html();
                var template = Handlebars.compile(source);
                var html = template(msg);

				$('#pageContent').html(html);
				$('#loading').css('visibility','hidden');
			}
		}
		
	});

}

