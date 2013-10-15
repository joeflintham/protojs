define(

    // this module's name
    "v2/Views/protojsView",

    // its dependencies
    [],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function () {

	/* this is an ur-class for the search app objects */
	var protojsView = Backbone.View.extend({

	    startLoading: function(){
		this.trigger('startLoading');
	    },

	    doneLoading: function(){
		this.trigger('doneLoading');
	    }
	});

	return protojsView;
    }
)
