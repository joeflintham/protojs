define(

    // this module's name
    "v2/Views/FullVacancyView",

    // its dependencies
    ["v2/Views/protojsView", "v2/Models/FullVacancy", "v2/Models/VacancyDetails", "v2/Views/VacancyDetailsView"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (protojsView, FullVacancy, VacancyDetails, VacancyDetailsView) {

	var FullVacancyView = protojsView.extend({

	    model: FullVacancy,

	    vac_ref: '',

	    el: protojs.fullVacancyPanel,

	    initialize: function(){
		_.bindAll(this, 'render')

		this.model = new FullVacancy(this.options);
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model, 'change', this.render);
		protojs.searchApp.startLoading();
		this.model.fetch()
		$.address.parameter('view', 'showVacancy');
		$.address.parameter('showVacancy', this.model.get('vac_ref'));
	    },

	    render: function(){

		try {

		    if (templates.full_vacancy_listing){
			var smt = _.template(templates.full_vacancy_listing, this.model.attributes);
			$(this.el).html(smt);
		    }		
		    var details = $.extend({
			savelink: '#',
			unsavelink: '#'
		    }, this.model.attributes);

		    /* we instantiate a VacancyDetails view only here */
		    var detailObj = new VacancyDetails(details);
		    this.detailPanel = new VacancyDetailsView({model: detailObj});
		    this.detailPanel.render();
		    

		} catch(e) {
		    protojs.searchApp.throwError(e);
		}

		protojs.searchApp.doneLoading()

	    },

	    remove: function(){
		$(this.el).empty();
		this.stopListening(); 
		/* e.g. if this view is removed before the API response 
		   is received, we don't want the 'render' funciton to be executed */
	    }
	});

	return FullVacancyView;
    }
)
