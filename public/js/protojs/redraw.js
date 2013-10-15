


$(document).ready(function(){

    /* advanced search bar controller - LEGACY */
  
    $("#advancedSearchToggle").click(function(e) {
	e.preventDefault();
	var strLinkText = $(this).text().toString();
	var defaultText = "More Search Options",toggledText = "Fewer Search Options";
	if(strLinkText==toggledText){ 
	    $(this).text(defaultText);
	    $(this).removeClass('toggled'); 
	}else{
	    $(this).text(toggledText); 
	    $(this).addClass('toggled'); 
	}
	$("#advancedSearch").slideToggle(); 
    });

    /* background image switcher */

    var bgSwitcher = function(){

	var imgUrlPrefix = '/img/protoimg/';
	var bg_image_files = [
	    'bg_001.png',
	    'bg_002.png',
	    'bg_003.png',
	    'bg_004.png',
	    'bg_005.png',
	    'bg_006.png'
	];
	var bg_images = [];
	
	var $bgFader = $('body.proto .bgFader');
	var $divB = $($(document.createElement('div')).attr('id','divb').prependTo($bgFader).addClass('fade'));
	var $divA = $($(document.createElement('div')).attr('id','diva').prependTo($bgFader).addClass('fade'));

	var curBGImage = $divA;
	var lastBGImage = $divB;

	var a = 0;
	var playing = false;
	var switchBackground = function(){

	    if (playing) return false;
	    playing = true;
	    imageToShow = bg_images[a];

	    lastBGImage.css('opacity','0');
	    lastBGImage.css('z-index','2');

	    curBGImage.css('z-index','1');
	    curBGImage.animate({opacity:0}, 5000);

	    lastBGImage.css('background-image','url('+imageToShow.src+')');

	    lastBGImage.animate({opacity:1}, 2000);
	    var tempBGImage = lastBGImage;
	    lastBGImage = curBGImage;
	    curBGImage = tempBGImage;
	    a++; if (a > bg_images.length - 1) a = 0;
	    window.setTimeout(switchBackground, 7000);
	    window.setTimeout(function(){playing = false;}, 2000);
	}

	var b = 0;
	var preloadBackgrounds = function(){
	    if (b > bg_image_files.length - 1) return 
	    imgUrl = imgUrlPrefix + bg_image_files[b];
	    var img = new Image();
	    img.src = imgUrl;
	    bg_images.push(img);
	    img.onload = function(){
		b++;
		switchBackground();
		preloadBackgrounds();
	    };
	}

	preloadBackgrounds();
    }()

    /* tabs */

    var tabSwitcher = function(){
	// Cutting the mustard: http://responsivenews.co.uk/post/18948466399/cutting-the-mustard
	if('querySelector' in document
	   && 'localStorage' in window
	   && 'addEventListener' in window) {
	    // show the selected tab in question
	    var showTab = function(e){

		//get context
		if (e && e.data && e.data.obj) obj = e.data.obj; // triggered by event with context object
		else if (e) obj = e; // called with context obj as argument
		else return false; // insane!

		/* reset tabbed content  */
		$('body.proto .tab-body').css('display', 'none');
		$('body.proto .tab-title').removeClass('active');
		
		// anchor href should match id selector of target tab which we then display
		var myAnchor = $(obj).find('a.tab-heading').attr('href');
		$(myAnchor + ' .tab-body').css('display', 'block');

		// 
		$('body.proto a[href='+myAnchor+']').parents('.tab-controller').addClass('active');
		return false;
	    }

	    $('body.proto .tab-title').each(function(){

		$('body.proto .nojs').removeClass('nojs');

		$(this).addClass('tab-controller');

		var anchor = $(this).find('a.tab-heading')
		
		$(anchor).bind('click', {obj:this}, showTab);
		
	    });

	    showTab($('body.proto .tab-title').first());
	}
    }()

    /* fix menu - A BIT OF A HACK */
    /* account links and other main menu items need to be in separate uls in order to enable repsonsive layout */

    var fixMenu = function(){

	var $defaultMenu = $('ul#firstNav');
	
	/* we'll keep the accoun links as they are, and detach and reposition the other list items */

	var $orphans = $defaultMenu.find('>li#accountMenu');

	var $newMenu = $(document.createElement('ul')).attr('id','account_menu');

	$defaultMenu.after($newMenu);

	/* hmmm, let's come back to this one :-(
	 * the ql nav and the js that controls it is built using template tags
	 * it'll be easier to build from scratch
	 */
//	$orphans.appendTo($newMenu);
    }()

});
