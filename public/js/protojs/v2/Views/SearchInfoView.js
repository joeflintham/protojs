define(

    // this module's name
    "v2/Views/SearchInfoView",

    // its dependencies
    ["v2/Views/protojsView", "v2/Models/SearchInfoModel", "v2/Views/paginator"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (protojsView, SearchInfoModel, paginator) {

	/* SearchInfoView is responsible for initialising, 
	   rendering and monitoring the display of search tools 
	   - such as pagination, and 'return to search', 'next' and 'previous' links */

	var SearchInfoView = protojsView.extend({

	    el: protojs.searchInfoPanel,

	    model: SearchInfoModel,

	    events: {
		'click a.return_to_search_link' : 'loadSearchResults',
		'click a#skip_to_prev' : 'skipTo',
		'click a#skip_to_next' : 'skipTo'
	    },

	    initialize: function(){
		this.model = new SearchInfoModel;
		this.paginator = new paginator;
		this.render();
		this.listenTo(this.model, 'change', this.render);
		_.bindAll(this, 'keypress', 'loadPage')
		$(document).bind('keydown', this.keypress) // don't forget to unbind this if you unload this app
	    },

	    remove: function(){
		$(document).unbind('keydown', this.keypress)
	    },

	    render: function(){
		if (templates.result_meta){
		    var smt = _.template(templates.result_meta, this.model.attributes);
		    $(this.el).html(smt);
		}
	    },

	    skipTo: function(e){
		if (!e) return
		var target = '';
		if (e.keyCode){
		    if (e.keyCode  == 74){ // j
			target = $(this.el).find('a#skip_to_prev')
		    } else if (e.keyCode == 75){ // k
			target = $(this.el).find('a#skip_to_next')
		    }
		} else {
		    e.preventDefault();
		    target = $(event.target)
		}
		/* the reference (=vac_ref) for the vacancy in question 
		   is placed in a data attribute on the 'nex' / 'prev' link anchor */ 
		var ref = $(target).data('index')
		if (ref){ protojs.searchApp.loadVacancy({vac_ref: ref}); }
	    },

	    keypress: function(e){
		if (!e) return;
		this.skipTo(e)
	    },

	    loadSearchResults: function(e){
		if (e) e.preventDefault();
		$.address.parameter('view', 'showResults');
		$.address.parameter('showVacancy', '');
		/* remove the current FullVacancy if it is being used */ 
		if (protojs.fv && protojs.fv.remove) { protojs.fv.remove();}
		protojs.searchApp.updateQuery();
	    },

	    update: function(metadata){
		$(this.el).removeClass('skipLinks').removeClass('hasPrev').removeClass('hasNext');
		
		if (protojs.vacancyListView.contains($.address.parameter('showVacancy'))){
		    var nextprevlinks = protojs.vacancyListView.getNextPrevLinks($.address.parameter('showVacancy'));
		    var nd = {}
		    if (nextprevlinks.hasOwnProperty('prev')) {
			$(this.el).addClass('hasPrev')
			nd.prev_vac_ref = nextprevlinks.prev.index,
			nd.prev_vac_title = nextprevlinks.prev.title
		    }
		    if (nextprevlinks.hasOwnProperty('next')) {
			$(this.el).addClass('hasNext')
			nd.next_vac_ref = nextprevlinks.next.index,
			nd.next_vac_title = nextprevlinks.next.title
		    }
		    /* update the SearchInfoModel attributes
		       (which will trigger a 'change' event
		       which will in turn fire the 'render' method) */
		    this.model.set(nd)
		    $(this.el).addClass('skipLinks');
		}
		if (!metadata) return;

		var m = {}
		m.page = (metadata.page) ? metadata.page : '1';
		m.pages = (metadata.last_page) ? metadata.last_page : '1';
		m.per_page = (metadata.rows) ? metadata.rows : '0';
		m.total  = metadata.total_results;
		m.start = ((m.page - 1) * m.per_page) + 1
		m.end = (m.start + m.per_page) - 1;
		this.model.update(m);
		/* pass the pagination data to the paginator
		   which will return a HTML object */
		$(this.el).find('#pagination').html(this.paginator.paginate(m));

	    },

	    /* triggered by the pagination links */
	    loadPage: function(e){
		if (e) e.preventDefault()
		if (!(e && e.data && e.data.page)) return false;
		$.address.parameter('page',e.data.page);
		protojs.searchApp.updateQuery();
	    }

	});

	return SearchInfoView;
    }
)
