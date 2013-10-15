define(

    // this module's name
    "v2/Models/FullVacancy",

    // its dependencies
    ["v2/Models/Vacancy"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (Vacancy) {

	var FullVacancy = Vacancy.extend({

	    parse: function(data){
		/* intercept the data from the server before it is used to populate the model */ 
		return this.parseObj(data.response[0]); // parseObj() is inherited from Models/Vacancy
	    },

	    fetch: function(){
		if (!protojs.vacancyListView.contains(this.get('vac_ref'), 'from fv.fetch')){
		    /* only fetch the data from the server if we can't
		       already access via the vacancy List
		       This is fine as long the API returns the 
		       same data for collections as for models.
		       This should be changed if the individual vacancy 
		       API call starts returning extra data */ 
		    return Backbone.Model.prototype.fetch.call(this);
		} else {
		    /* we may not have the data already 
		       (e.g. a deeplink to a previous full vacancy view */ 
		    var d = protojs.vacancyListView.getModelAttributes(this.get('vac_ref'))
		    this.set(d);
		    this.trigger('change');
		}
	    },

	    destroy: function(){ return false } // don't send a 'DELETE' REST API call

	});

	return FullVacancy;
    }
)
