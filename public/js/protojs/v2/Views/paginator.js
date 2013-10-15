define(

    // this module's name
    "v2/Views/paginator",

    // its dependencies
    ["v2/Views/protojsView"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (protojsView) {

	var paginator = protojsView.extend({					  

	    paginate: function(meta){

		if (parseInt(meta.pages) > 1){ 
		    //if only one page of results
		    // then no point in bulding a navigator

		    $(this.el).empty();

		    var counter = 1;								
		    
		    if (meta.pages > 10){					
			// if there are more than ten pages
			// of results, then only show the 
			// nearest 11 page links
			// and for pages out of that range,
			// give a 'first' or 'last' link
			// where appropriate
			counter = meta.page - 5;				
			// 'counter' will be the first
			// linked page number
			
			if (counter < 2){ counter = 1; } 		
			// current page is within the 
			// first 6 pages
			
			else { 									
			    // give a 'back to first page' link
			    var firstSpan = $('<span id="firstLink" class="pSpan" />')
				.append($('<a href="?page=1">First</a>'))
				.bind('click',{page:1},protojs.searchInfo.loadPage);
			    $(this.el).append(firstSpan);
			    var dotdot = $('<span class="pSpan ellipse active">...</span>')
			    $(this.el).append(dotdot);
			    
			}
		    }
		    
		    
		    var endcounter = counter + 10; 					
		    // we're going to supply a max
		    // of 11 page links ...
		    
		    if (endcounter > meta.pages){ endcounter = meta.pages; } 
		    // or however many pages there are 
		    // if fewer than 11
		    
		    // NOTE
		    // (we use 11 because it means there
		    // are 5 live links either side of 
		    // the non-linked current page 
		    // in the centre)
		    
		    
		    for (var b = counter; b <= endcounter; b++){ 	// run over the counter 
			// and create the page links
			
			var number = b; 							
			// this will be the page number 
			// linked to in each iteration
			var numbertxt = number;
			
			var pSpan = $('<span class="pSpan" />')
			
			if (meta.page == (b)) {		
			    // we're looping over the current page
			    pSpan.text(numbertxt).addClass('active');
			    
			} 	// so we just need a piece of text
			
			else { 									
			    // create a link
			    
			    var pLink = $('<a href="?page='+number+'" class="pLink">' + number + '</a>')
				.bind('click',{page:number},protojs.searchInfo.loadPage);
			    pSpan.append(pLink);
			}										
			
			$(this.el).append(pSpan);
			
		    } 											
		    // pagination loop complete
		    
		    if (endcounter < meta.pages){ 			
			// there are more pages beyond 
			// the last link in the current menu
			
			var lastSpan = $('<span id="lastLink" class="pSpan" />')
			
			var lastLink = $('<a href="?page='+meta.pages+'">Last</a>')			    
			    .bind('click',{page:meta.pages},protojs.searchInfo.loadPage);
			number;
			
			var dotdot = $('<span class="pSpan ellipse active">...</span>')
			$(this.el).append(dotdot);
			// create a link to the last page
			lastSpan.append(lastLink);
			$(this.el).append(lastSpan);

		    }
		    
		    return this.el;
		}

	    }

	});

	return paginator
    }
)
