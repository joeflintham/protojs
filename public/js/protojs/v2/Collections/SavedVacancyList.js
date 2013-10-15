define(

    // this module's name
    "v2/Collections/SavedVacancyList",

    // its dependencies
    ["v2/Models/SavedVacancy"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (SavedVacancy) {

	var SavedVacancyList = Backbone.Collection.extend({
	    model: SavedVacancy,

	    initalize: function(){
		_.bindAll(this, 'updateSavedSearch', 'updateView')
		this.listenTo(this, 'change', this.updateView);
	    },

	    /* we are emulating saved search by using localStorage */
	    loadSavedSearch: function(){
		var d = JSON.parse(localStorage.getItem('savedsearches'));	    
		return d; 
	    },

	    updateSavedSearch: function(e){
		var d = JSON.stringify(this);
		localStorage.setItem('savedsearches', d);
	    },

	    updateView: function(){
		protojs.savedSearchApp.render()
	    }

	});

	return SavedVacancyList
    }
)
