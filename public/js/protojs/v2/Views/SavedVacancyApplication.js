define(

    // this module's name
    "v2/Views/SavedVacancyApplication",

    // its dependencies
    ["v2/Views/VacancyListView", "v2/Collections/SavedVacancyList", "v2/Views/VacancyView"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (VacancyListView, SavedVacancyList, VacancyView) {

	/* curates the collection of saved vacancies */
	var SavedVacancyApplication = VacancyListView.extend({

	    el: protojs.savedSearchToolsPanel,

	    events: {
		'click a.saved_search_link': 'show',
	    },

	    initialize: function(){
		this.savedVacancyList = new SavedVacancyList;
		this.loadFromStorage();

		_.bindAll(this, 'update', 'save', 'unsave', 'render')
	    },

	    render: function(){
		if ($(protojs.savedSearchResultPanel).length < 1) return
		$(protojs.savedSearchResultPanel).empty()

		if (this.savedVacancyList.length > 0){
		    this.savedVacancyList.each(function(o){
			var v = new VacancyView({model: o});
			var a = v.render()
			$(protojs.savedSearchResultPanel).append(a.el)
		    });
		} else {
		    var e = $('<p>You currently have no saved vacancies</p>');
		    $(protojs.savedSearchResultPanel).append(e)
		}
	    },


	    update: function(){
		
		if ($(this.el).length < 1) return
		this.savedVacancyList.updateSavedSearch();

		var d = {
		    numSaved: this.savedVacancyList.length,
		    saved_search_link: '#',
		    return_to_search_link: '#'
		}

		$(this.el).empty();

		if (templates.saved_search){
		    var t = _.template(templates.saved_search, d);
		    $(this.el).html(t)
		}

		$(this.el).find('p.viewSavedSearches').removeClass('hasSavedSearches');	
		if (d.numSaved > 0){
		    $(this.el).find('p.viewSavedSearches').addClass('hasSavedSearches');	
		}
		
		this.render();

	    },

	    contains: function(v){
		var r = false;
		if (this.savedVacancyList.where({vac_ref: v}).length > 0) r = true; 
		return r;
	    },

	    loadFromStorage: function(){
		var data = this.savedVacancyList.loadSavedSearch();
		this.savedVacancyList.reset();
		var self = this
		_.each(data, function(o){
		    self.savedVacancyList.add(o);
		});
	    },

	    show: function(e){
		if (e) e.preventDefault();

		$.address.parameter('view','showSaved');
		protojs.searchInfo.update();
	    },

	    hide: function(e){
		if (e) e.preventDefault();

		$.address.parameter('view','');
		protojs.searchInfo.update();
	    },

	    save: function(v){
		this.savedVacancyList.add(v)
		this.update()
	    },
	    
	    unsave: function(v){
		var m = this.savedVacancyList.where({vac_ref: v});
		this.savedVacancyList.remove(m)
		this.update()
	    },
	    
	});
	
	return SavedVacancyApplication
    }
)
