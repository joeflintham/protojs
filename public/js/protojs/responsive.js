

var flyoutsDisabled = false;

$(document).ready(function(){

	var handleFlyouts = function(){
	    if (window.innerWidth < 800){
		console.log('disabling flyouts')
		flyoutsDisabled = true;
		$('#firstNav').find('.flyout').removeClass('flyout').addClass('unflyout');
	    } else {
		if (flyoutsDisabled){
		    console.log('enabling flyouts')
		    $('#firstNav').find('.unflyout').removeClass('unflyout').addClass('flyout');
		    flyoutsDisabled = false;
		}
	    }
	    if (window.innerWidth > 400){
		$('ul#firstNav').css('height','auto');
		$('ul#firstNav').css('opacity','1');
	    }
	}
    
    $(window).on('resize', handleFlyouts);
    handleFlyouts();


    var displayMobiMenu = true;
    var mobiMenuHeight = '';
    

    var toggleMobiMenu = function(e){
	if (e) e.preventDefault()
	if (displayMobiMenu){
	    $('ul#firstNav').css('opacity','0').css('height','0px');
	    $('img#mob_nav_icon').attr('src','/img/protoimg/mob_nav_icon.png');
	    displayMobiMenu = false;
	} else {
	    $('ul#firstNav').css('opacity','1').css('height',mobiMenuHeight);
	    $('img#mob_nav_icon').attr('src','/img/protoimg/mob_nav_close.png');
	    displayMobiMenu = true;
	}
    }
    $('div#mobiNavControl>a').on('click', toggleMobiMenu);

    if (window.innerWidth < 401){	
	mobiMenuHeight = $('ul#firstNav').css('height');
	toggleMobiMenu();
    }

});
