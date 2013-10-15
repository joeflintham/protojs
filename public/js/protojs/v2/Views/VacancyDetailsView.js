define(

    // this module's name
    "v2/Views/VacancyDetailsView",

    // its dependencies
    ["v2/Views/protojsView", "v2/Models/VacancyDetails"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (protojsView, VacancyDetails) {

	/* I believe this controller to be self-explanatory :-) */

	var VacancyDetailsView = protojsView.extend({
	    
	    model: VacancyDetails,

	    el: protojs.vacancyDetailsPanel,

	    events: {
		'click p.save>a' : 'save',
		'click p.unsave>a' : 'unsave',
	    },

	    initialize: function(){
		_.bindAll(this, 'save', 'unsave')
	    },

	    render: function(){

		if (templates.vacancy_details){
		    var vmt = _.template(templates.vacancy_details, this.model.attributes);
		    $(this.el).html(vmt);
		}
		
		$(this.el).addClass('unsaved').removeClass('saved')
		if (protojs.savedVacancyApp.contains(this.model.get('vac_ref'))){
		    $(this.el).addClass('saved').removeClass('unsaved')
		}
	    },

	    save: function(e){
		e.preventDefault();
		protojs.savedVacancyApp.save(this.model.attributes)
		this.render();
	    },

	    unsave: function(e){
		e.preventDefault();
		protojs.savedVacancyApp.unsave(this.model.get('vac_ref'))
		this.render();
	    }

	});

	return VacancyDetailsView;
    }
)
