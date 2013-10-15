/**
 * @projectDescription: Related javascript for the quick links navigation project
 * @author: JE
 */

// DEFAULT CONFIG SETTINGS
var qlConfig = {		fixedNav: true	};

$(document).ready(function(){
	
	var regLabel = $('#registerEmail').prev();
	var regLabelTxt = regLabel.text();
	
	// IE6 CHECK
	if((window.XMLHttpRequest == undefined) && (ActiveXObject != undefined)){
		var msie6 = true;
	}else{
		var msie6 = false;
	};
	
	
		$('#upload_cv_logged_in, #job_alerts_logged_in, #navLogoutLink, #navMyjobsiteLink, #accountLinks, #jbe_jalo_logged_in, #jbe_jalo_logged_in_2').remove();
		$('#accountMenu').addClass('registerAccount');
	
	
	if(qlConfig.fixedNav == true && msie6 == false){
		if($('#mainNav').length > 0){
			var top = $('#mainNav').offset().top;
			$(window).scroll(function(){
				var y = $(this).scrollTop();
				if(y >= top){
					$('#mainNav').addClass('fixed');
				}else{
					$('#mainNav').removeClass('fixed');
				};
			});
		};
	};
	
	if(msie6 == false){
		$('#mainNav #accountMenu .wrapper').hover(function(){
			$(this).addClass('isHovered');
			$(this).children('.flyout, .clearing').show();
		}, function(){
			$(this).removeClass('isHovered');
			if($('#registerEmail').hasClass('isFocused')){
				$(this).children('.flyout, .clearing').show();
			}else{
				$(this).children('.flyout, .clearing').hide();
			};		
		});  
	};
	
	$('#registerEmail').focus(function(){
		regLabel.hide();
		$(this).addClass('isFocused');
	}).blur(function(){
		if($(this).val() == ''){
			regLabel.show();	
		}; 
		$(this).removeClass('isFocused');
		if($('#accountMenu .wrapper').hasClass('isHovered')){
			$(this).closest('div.flyout').show().next('.clearing').show();
		}else{
			$(this).closest('div.flyout').hide().next('.clearing').hide();
		};		
	});

	$('#registerDropdown .submitButton').click(function(){ 
	    $('#registerDropdown .errorMsg').remove();
		$('#registerEmail').removeClass('fieldError');
	    var hasError = false;
	    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	
	    var emailVal = $('#registerEmail').val();
	    if (emailVal == '') {
	        $(this).after('<span class="errorMsg">Please enter your email address</span>').prev().children('#registerEmail').focus().addClass('fieldError');
	        hasError = true;
	    } else if (!emailReg.test(emailVal)) {
	        $(this).after('<span class="errorMsg">Please enter a valid email address</span>').prev().children('#registerEmail').focus().addClass('fieldError');
	        hasError = true;
	    };
	    if(hasError == true) { return false; }
	});
	
	
		
});
