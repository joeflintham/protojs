define(

    // this module's name
    "v2/Collections/VacancyList",

    // its dependencies
    ["v2/Models/Vacancy"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (Vacancy) {

	var VacancyList = Backbone.Collection.extend({
	    model: Vacancy, 
	    url: '/v1/vacancy',
	    parse: function(data){
		/* before the data gets passed back to the object 
		   for the purpose of populating vacancy  models,
		   grab the facts and metadata and pass them to their respective apps */
		if (data.metadata) protojs.searchInfo.update(data.metadata)
		if (data.facets) protojs.searchFormApp.updateFacets(data.facets)
		return (data.response) ? data.response : data;
	    }
	});

	return VacancyList
    }
)
