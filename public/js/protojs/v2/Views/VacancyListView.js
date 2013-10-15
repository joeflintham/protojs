define(

    // this module's name
    "v2/Views/VacancyListView",

    // its dependencies
    ["v2/Views/protojsView", "v2/Collections/VacancyList", "v2/Views/VacancyView"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (protojsView, VacancyList, VacancyView) {

	var VacancyListView = protojsView.extend({

	    /* this controller curates the search results for any given search */

	    el: protojs.searchResultPanel,

	    initialize: function(){
		this.collection = new VacancyList;
		_.bindAll(this, 'render', 'contains')
		this.listenTo(this.collection, 'sync', this.render);
	    },

	    render: function(){

		if ($(this.el).length < 1) return
		var self = this;
		$(this.el).empty()

		if (this.collection.length > 0){
		    this.collection.each(function(o){
			var v = new VacancyView({model: o});
			var a = v.render()
			$(self.el).append(a.el)
		    });
		} else {
		    $.address.parameter('view','noResults')
		}
		protojs.searchApp.doneLoading()
	    },

	    contains: function(v, msg){
		/* changed this to stop using underscore's .where({}) method
		   because it inexplicably only works once :-( */
		var r = false;
		var a = 0; while (a < this.collection.length){
		    var d = this.collection.models[a].get('vac_ref'); 
		    if (v == d) { r = true; break }
		    a++;
		}
		return r;
	    },

	    getModelAttributes: function(v){
		var r = {}
		var a = 0; while (a < this.collection.length){
		    var d = this.collection.models[a].get('vac_ref'); 
		    if (v == d) { r = this.collection.models[a].attributes; break }
		    a++;
		}
		return r;
	    },

	    getNextPrevLinks: function(v){
		var skipLinks = {}

		if (this.contains(v)){
		    _.each(this.collection, function(e,i,a){
			if (a.models[i].get('vac_ref') == v){
			    if ((i-1) > -1) {
				skipLinks.prev = {}
				skipLinks.prev.index = a.models[i-1].get('vac_ref');
				skipLinks.prev.title = a.models[i-1].get('job_title')
			    }
			    if ((i+1) < a.length) {
				skipLinks.next = {}
				skipLinks.next.index = a.models[i+1].get('vac_ref');;
				skipLinks.next.title = a.models[i+1].get('job_title');
			    }
			}
		    });
		}
		return skipLinks;
	    },


	    update: function(){
		var queryParams = {}	    
		$.address.parameter('view','showResults');
		$.address.parameterNames().forEach(function(e,i,v){
		    queryParams[e] = $.address.parameter(e);
		});
		protojs.searchApp.startLoading();
		this.collection.fetch({data: queryParams});
	    }

	});

	return VacancyListView
    }
)
