define(

    // this module's name
    "v2/Models/SearchInfoModel",

    // its dependencies
    ["v2/Views/protojsView"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (protojsView) {

	var SearchInfoModel = Backbone.Model.extend({
	    
	    defaults: function(){ 
		return {
		    start: '', 
		    end: '',
		    total: '',
		    page: '',
		    pages: '', 
		    per_page: '',
		    return_to_search_link: '',
		    prev_vac_ref: '',
		    next_vac_ref: '',
		    prev_vac_title: '',
		    next_vac_title: ''
		}
	    },

	    update: function(metadata){
		if (metadata) this.set(metadata);
	    }
	    
	});

	return SearchInfoModel
    }
)
