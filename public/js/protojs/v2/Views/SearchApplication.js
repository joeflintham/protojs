define(

    // this module's name
    "v2/Views/SearchApplication",

    // its dependencies
    ["v2/Views/protojsView", "v2/Views/FullVacancyView"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (protojsView, FullVacancyView) {

	var SearchApplication = protojsView.extend({
	
	    el: $('body'), // this controller will manipulate the classes on the body tag

	    initialize: function(){

		_.bindAll(this, 'performSearch', 'loadVacancy'); // bind the context of these methods to this context
		/* startloading and stoploading events inherited from protojsView.js */
		this.listenTo(this, 'startLoading', this.showLoader); // event listeners which
		this.listenTo(this, 'doneLoading', this.hideLoader); // control the 'loader'
		

		var self = this;
		$.address.externalChange(function(){ // direct links, permits deeplinking
		    self.updateQuery();
		});

		$.address.internalChange(function(){ // internal changes triggered by the protojs apps
		    self.updateView();
		});

	    },

	    showLoader: function(e){
		$(this.el).addClass('loading')
	    },

	    hideLoader: function(e){
		$(this.el).removeClass('loading')
	    },

	    performSearch: function(e){ // called by the SearchFormView controller

		if (e) e.preventDefault()
		this.clearErrors();
		this.startLoading();

		/* if we're not on the search page, redirect there */
		var searchLocation = protojs.searchPathname + '#/?' + $.address.queryString();

		if (protojs.searchPathname !== window.location.pathname){
		    window.location = searchLocation;
		    return true;
		}

		/* get the body view ready for displaying results */
		$.address.parameter('view','showResults');
		$(this.el).addClass('hasSearch');
		/* trigger the search */
		protojs.vacancyListView.update();

	    },

	    loadVacancy: function(attrs){
		this.clearErrors();

		/* ignore if there are no valid parameters
		   attrs = should be a set of vacancy model attributes
		   - minimum required is the vac_ref */
		if (attrs && attrs.vac_ref) {

		    /* get rid of any already existing FullVacancyView */
		    if (protojs.fv) { protojs.fv.remove(); }
		    
		    protojs.fv = new FullVacancyView(attrs)

		} else {
		    this.displayError(new Error('No vacancy specified'));
		}
	    },

	    throwError: function(err){
		/* display an error message */
		$(protojs.errorPanel).html('<p class="error">' + err.message + '</p>')
		/* uncomment following line if you need to see the stack */
		//$(protojs.errorPanel).html('<p class="error">' + err.stack + '</p>')
		if (err) { $(this.el).addClass('viewErrors'); }
	    },

	    clearErrors: function(){
		$(this.el).removeClass('viewErrors');
		$(protojs.errorPanel).empty()
	    },

	    updateQuery: function(){

		/* called after initialisation */
		protojs.searchFormApp.updateForms();

		var view = $.address.parameter('view');
		var vref = $.address.parameter('showVacancy');

		if (view == "showVacancy" && vref){ // page request is to view a vacancy
		    this.loadVacancy({vac_ref: vref})

		} else if (view == "showSaved") { // page request is to view saved searches
		    protojs.savedVacancyApp.show();

		} else if (view == "showResults"){ // load search results based on any existing parameters
		    protojs.vacancyListView.update();
		}
		protojs.searchApp.updateView();
	    },
	    
	    updateView: function(){

		/* triggered by changes to the url hash
		   also called explicitly by updateQuery above */
		if ($.address.parameterNames().length < 1 && protojs.searchPathname === window.location.pathname) {
		    /* no parameters, no search, show the advanced search form */
		    $.address.parameter('view','showForm');
		}

		var view = $.address.parameter('view');
		var err = $.address.parameter('err');
		var vurl = $.address.parameter('showVacancy');

		$(this.el).removeClass('viewVacancy').removeClass('viewSaved').removeClass('viewResults').removeClass('formView').removeClass('viewResults').removeClass('noResults');
		
		if (view == "showVacancy" && vurl){ // page request is to view a vacancy
		    $(this.el).addClass('viewVacancy');

		} else if (view == "showSaved") { // page request is to view saved searches
		    $(this.el).addClass('viewSaved');
		    
		} else if (view == "noResults") { // page request is to view saved searches
		    $(this.el).addClass('noResults');
		    
		} else if (view == "showForm") {
		    $(this.el).addClass('formView');

		} else {
		    $(this.el).addClass('viewResults');
		}

		/* take the opportunity to update the saved vacancies widget
		   and the search metadata widget (pagination, etc */
		protojs.savedVacancyApp.update()
		protojs.searchInfo.update()
		
	    },
	    
	});

	return SearchApplication;

    }
)
