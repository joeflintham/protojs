define(

    // this module's name
    "v2/Views/VacancyView",

    // its dependencies
    ["v2/Views/protojsView"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (protojsView) {

	var VacancyView = function(){
	    console.log(blah);
	}
	/*protojsView.extend({
	    
	    initialize: function(){
		_.bindAll(this, 'render', 'show');
	    },

	    render: function(){

		if ($(this.$el).length < 1) return
		var vacData = this.model.attributes;

		vacData.savedclass = 'unsaved';
		vacData.savelink = '#';
		vacData.savetext = 'Save';
		vacData.unsavelink = '#';
		vacData.unsavetext = 'Unsave';
		vacData.applylink = '#';
		vacData.applytext = 'Apply Now';

		if (templates.vacancy){
		    var vt = _.template(templates.vacancy, vacData)
		    this.$el.html(vt);
		}
		if (protojs.savedVacancyApp.contains(this.model.get('vac_ref'))){
		    $(this.$el).find('div.vacancy').removeClass('unsaved').addClass('saved');
		} else {
		    $(this.$el).find('div.vacancy').removeClass('saved').addClass('unsaved');
		}

		return this;
	    },

	    events: {
		'click h3>a' : 'show',
		'click span.unsave a': 'unsave',
		'click span.save a': 'save',
		'click span.apply a': 'applyFor'
	    },

	    show: function(e){
		e.preventDefault();
		protojs.searchApp.loadVacancy(this.model.attributes)
	    },

	    save: function(e){
		e.preventDefault()
		protojs.savedVacancyApp.save(this.model.attributes)
		this.$el.find('div.vacancy').removeClass('unsaved').addClass('saved');
	    },

	    unsave: function(e){
		e.preventDefault()
		protojs.savedVacancyApp.unsave(this.model.get('vac_ref'))
		this.$el.find('div.vacancy').removeClass('saved').addClass('unsaved');
	    },

	    applyFor: function(e){
		e.preventDefault()
		protojs.throwError(new Error('\'Apply now\' functionality yet to implemented'));
	    }
	});*/

	return VacancyView
    }
)
