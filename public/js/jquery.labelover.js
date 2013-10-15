/* [%-# @(#)jquery.labelover.js	1.2 09:18:47,12/04/26 (yy/mm/dd) -%] */
jQuery.fn.labelOver = function(overClass,  inHiddenClass) {
	return this.each(function(){
		var label = jQuery(this);
		var f = label.attr('for');
		var hiddenClass = (inHiddenClass != "undefined") ? inHiddenClass : "";
		if (f) {
			var input = jQuery('#' + f);
			
			this.hide = function() {
			  label.css({ textIndent: -10000 })
			  label.addClass(hiddenClass);
			}
			
			this.show = function() {
			  if (input.val() == '') label.css({ textIndent: 0 })
			  label.removeClass(hiddenClass);
			}

			// handlers
			input.focus(this.hide);
			input.blur(this.show);
		  label.addClass(overClass).click(function(){ input.focus() });
			
			if (input.val() != '') this.hide(); 
		}
	})
}

$(document).ready(function(){	
	$('label.pre').labelOver('over', 'hide')
});
