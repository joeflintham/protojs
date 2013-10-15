
require(['v2/Views/SearchInfoView', 'v2/Views/SearchFormView', 'v2/Views/VacancyListView', 'v2/Views/SearchApplication', 'v2/Views/SavedVacancyApplication'], function(SearchInfoView, SearchFormView, VacancyListView, SearchApplication, SavedVacancyApplication) {

    $(document).ready(function(){
	
	var checkReady = function(){

	    for (a in templateList){
		if (!(templates[a])) return !!0;
	    }

	    protojs.searchInfo = new SearchInfoView;
	    protojs.searchFormApp = new SearchFormView;
	    protojs.vacancyListView = new VacancyListView;
	    protojs.searchApp = new SearchApplication;
	    protojs.savedVacancyApp = new SavedVacancyApplication;

	    protojs.searchApp.updateQuery();
	    return true;
	}

	if (!checkReady()){ // in dev, we should load each template asynchronously
	                    // in live, the templates {} object should be prepopulated in the build process
	    for (a in templateList){
		$.ajax({
		    url: templateList[a],
		    method: 'GET',
		    async: true,
		    ctx: {name: a},
		    success: function(d) {
			templates[this.ctx.name] = d;
			checkReady();
		    }
		});
	    }
	}

    });

});
