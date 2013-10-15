define(

    // this module's name
    "v2/Views/SearchFormView",

    // its dependencies
    ["v2/Views/protojsView"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (protojsView) {

	var searchFormView = protojsView.extend({

	    el: $('body'),

	    formData: {},

	    /* the events attribute decalres up front what events 
	       this controller should listen to.
	       However, the HTML selector used needs to be in the DOM 
	       when this controller is initalised. 

	       Also, you cannot use a variable here. 
	       For that reason, we wait until we're in the initialize function
	       to bind events to the forms. */

	    events: {
		'click a.show_advanced_search' : 'showAdvancedSearch'
	    },

	    initialize: function(){
		_.bindAll(this, 'updateForms', 'performQSearch', 'performASearch', 'performFSearch', 'processForm', 'updateFacets', 'updateQuery', 'getFormData', 'processFilters', 'getFilterData', 'dataChanged', 'updateSliders')

		/* see above as to why we bind events here, instead of in the 'events' attribute */
		$(protojs.searchForm).on('submit', this.performQSearch);
		$(protojs.searchFiltersPanel).on('submit', this.performFSearch);
		$(protojs.advancedSearchForm).on('submit', this.performASearch);	    

		/* there are two sliders, both controlling the salary_min and salary_max values */
		self = this;
		this.salary_sliders = $( ".salary_range" ).slider({
		    range: true,
		    min: 0,
		    max: 100,
		    values: [ 0, 100 ],
		    slide: function( event, ui ) {
			var smin = ui.values[0];
			var smax = ui.values[1];

			$('input.salary_min').val(smin);
			$('input.salary_max').val(smax);
			$('span.salary_amount').text( "£" + smin + ",000 - £" + smax + "000");
			self.dataChanged('div#salary');
			
		    },
		    change: function( event, ui ) {
			var smin = ui.values[0];
			var smax = ui.values[1];
			$('input.salary_min').val(smin);
			$('input.salary_max').val(smax);
			$('span.salary_amount').text( "£" + smin + ",000 - £" + smax + "000");
		    },
		    stop: function(event,ui){
			var smin = ui.values[0];
			var smax = ui.values[1];
			$('input.salary_min').val(smin);
			$('input.salary_max').val(smax);
			$('span.salary_amount').text( "£" + smin + ",000 - £" + smax + "000");
			self.updateSliders(smin,smax);
		    }
		});

		/* build the sector checkboxes in the advanced form */
		
		/* sector_lookup is a global JSON object */
		if ($(protojs.advancedSearchForm).length > 0){
		    var keys = [];
		    for (var key in sector_lookup){
			if (sector_lookup.hasOwnProperty(key)){
			    keys.push(key);
			}
		    }
		    keys.sort();

		    _.each(keys, function(e,i,v){
			var fieldData = {
			    field_type: 'checkbox',
			    field_name: 'sector',
			    field_id: 'sector_' + e,
			    label: sector_lookup[e].name,
			    value: e,
			    count: '',
			    checked: '',
			    disabled: '',
			    className: 'sector_field'
			}
			if (templates.search_filters_field){
			    var sectorfilter = _.template(templates.search_filters_field, fieldData);
			    $(protojs.advancedSearchForm + ' #asf_sectors_fields')
				.append(sectorfilter);
			}
		    });
		}

	    },

	    dataChanged: function(d){
		$(d).addClass('changed'); // controls the visibility of 'Update' buttons in the facets
	    },

	    updateSliders: function(min,max){
		/* adjust the values of all the instances of the salary sliders */
		$('.salary_range').each(function(){
		    $(this).slider('values',0,min);
		    $(this).slider('values',1,max);
		});
	    },

	    showAdvancedSearch: function(e){
		if (e) e.preventDefault();
		$.address.parameter('view','showForm');
	    },

	    performQSearch: function(e){
		if (e) e.preventDefault()
		$.address.parameter('page',''); // this is a new search
		this.formData = {};
		this.processFilters(protojs.searchFiltersPanel); // get facets first
		this.processForm(protojs.searchForm); // overwrite values from quick search form
		protojs.searchApp.performSearch() // do the search
		this.updateForms(); // propagate the current search parameters to all forms
	    },
	    
	    performFSearch: function(e){
		if (e) e.preventDefault()
		$.address.parameter('page',''); // this is a new search
		this.formData = {};
		this.processForm(protojs.searchForm); // get quick search values first
		this.processFilters(protojs.searchFiltersPanel); // override with values from facets
		protojs.searchApp.performSearch() // do the search
		this.updateForms(); // propagate the current search parameters to all forms
	    },
	    
	    performASearch: function(e){
		if (e) e.preventDefault()
		$.address.parameter('page',''); // this is a new search
		this.formData = {};
		this.processForm(protojs.advancedSearchForm); // get values from advanced search form
		protojs.searchApp.performSearch() // do the search
		this.updateForms(); // propagate the current search parameters to all forms
	    },

	    processFilters: function(searchFiltersForm){	    
		
		try {
		    if ($(searchFiltersForm).length < 1) throw new Error('No search form specified');
		} catch(err) {
		    protojs.searchApp.throwError(err);
		}

		/* get the search parameters specified by the facets */
		this.formData = this.getFilterData(searchFiltersForm);

		this.updateQuery();

	    },

	    processForm: function(searchForm){	    
		
		try {
		    if ($(searchForm).length < 1) throw new Error('No search form specified');
		} catch (err) {
		    protojs.searchApp.throwError(err)
		}

		/* get the search parameters specified within in quick or advanced search forms */
		var fd = this.getFormData(searchForm);
		$.extend(this.formData, fd);

		this.updateQuery();

	    },
	    
	    updateQuery: function(){

		/* write the search parameters defined in the forsm to the url hash */
		var formData = this.formData;

		try {
		    for (var a in formData){
			if (formData[a] === '') formData[a] = '';
			$.address.parameter(a, formData[a]); // all query parameters are stored in the $.address object
		    }
		} catch (err) {
		    protojs.searchApp.throwError(err);
		}

	    },
	    
	    getFilterData: function(searchForm){
		
		/* go through the facets and turn them into search parameters */
		try {

		    var fd = {}

		    /* salary range */
		    fd.salary_min = $(searchForm + ' input.salary_min').val();
		    fd.salary_max = $(searchForm + ' input.salary_max').val();

		    /* locations */
		    var ls = $(searchForm).find('#locations_fields input:checked')
		    var locs = [];
		    $(ls).each(function(){
			locs.push($(this).val())
		    });
		    $.extend(fd, {location: locs.join(',')}) // comma-separated list

		    /* jobtypes */
		    var js = $(searchForm).find('#jobtypes_fields input:checked')
		    var jts = []
		    $(js).each(function(){
			jts.push($(this).val())
		    });
		    $.extend(fd, {job_type: jts.join(',')}) // comma-separated list

		    /* sectors */
		    var ss = $(searchForm).find('#sectors_fields input:checked')
		    var secs = [];
		    $(ss).each(function(){
			secs.push($(this).val())
		    });
		    $.extend(fd, {sector: secs.join(',')}) // comma-separated list

		    return fd;
		} catch (err) {
		    protojs.searchApp.throwError(err);
		}
		return {}

	    },

	    getFormData: function(searchForm){

		try {
		    var fd = {}
		    var qs = $(searchForm).serialize();
		    var pairs = qs.split('&');
		    var a = 0; 
		    var k = '';
		    while(a < pairs.length){
			k = pairs[a].split('=')[0]; fd[k] = pairs[a].split('=')[1];		
			a++;
		    }

		    /* fiddly bits */
		    var sectorFields = $(searchForm).find('input.sector_field:checked');
		    if (sectorFields.length > 0){
			var sectorString = _.map(sectorFields, function(e,i){
			    return $(e).val()
			}).join(',');  // comma-separated list
			fd['sector'] = sectorString;
		    }
		    var job_typeFields = $(searchForm).find('input.job_type:checked');
		    if (job_typeFields.length > 0){
			var job_typeString = _.map(job_typeFields, function(e,i){
			    return $(e).val()
			}).join(',');  // comma-separated list
			fd['job_type'] = job_typeString;
		    }

		    return fd;
		} catch (e) {
		    protojs.searchApp.throwError(err);
		}
		return {}
	    },

	    updateForms: function(){

		/* grab each of the url hash parameters
		   and attmept to update any form field with that name to its value */
		$.address.parameterNames().forEach(function(e,i,v){
		    this.updateFormValue(e,$.address.parameter(e));
		}, this);

		/* fiddly bits */ 
		var smin = ($.address.parameter('salary_min')) ? $.address.parameter('salary_min') : '0';
		var smax = ($.address.parameter('salary_max')) ? $.address.parameter('salary_max') : '100';
		$('.salary_range').slider('values',0,smin);
		$('.salary_range').slider('values',1,smax);
	    },

	    updateFormValue: function(key, val){

		/* trying to force a form field to have a particular value 
		   straightforward for input[type=text]
		   but trickier for input[type=radio|checkbox] */
		var e = $(protojs.searchForms).find('[name='+key+']');
		if (e.length > 0){
		    $(e).each(function(){
			if ($(this).attr('type') == "radio" || $(this).attr('type') == "checkbox"){
			    /* we've found a input field with a matching name, 
			       but it is a radio or checkbox */
			    var values = (val) ? val.toString().split(',') : [];
			    /* value might be a comma-separated list
			       so treat it as an array */
			    if (_.indexOf(values, $(this).val()) > -1){
				/* the value we're testing for is in the array */
				this.setAttribute("checked", "checked");
				this.checked = true;			
			    }
			} else {
			    /* works for input[type=text] 
			       untested on textareas, which might choke */
			    $(this).val(val);
			}
		    });
		}
	    },

	    /* called from VacancyList,  the collection repsonsible 
	       for handling the vacancy collection API response */
	    updateFacets: function(data){

		/* the data object should have the following structure:
		   {
		     locations: {},
		     jobtype: {},
		     sector: {}
		   }
		   see documentation for a detailed specification
		*/

		/* Locations */
		var locations = {};
		if (data.location){
		    _.each(data.location, function(e,i,v){
			/* each location might be a comma-separated list 
			   we'll break these up and provide a facet 
			   for each individual location,
			   so we have to do a manual count */
			var locs = i.split(',');
			_.each(locs, function(_e,_i,_v){
			    var count = parseInt(e,10); // the API provides a count for the CSL
			    if (locations[_e]){
				locations[_e] += count;
			    } else { locations[_e] = count } 
			});
		    });
		}
		
		var locationFilterData = []
		_.each(locations, function(count,loc){

		    /* the location parameter might be a CSL */
		    var checked = '';
		    var values = [];
		    if ($.address.parameter('location')){ values = $.address.parameter('location').split(','); }
		    if (_.indexOf(values, loc) > -1) { checked = "checked"; }
		    
		    var attrs = {
			field_type: 'checkbox',
			field_name: 'location',
			field_id: 'location_' + loc,
			label: loc,
			value: loc,
			count: '(' + count + ')',
			className: 'field',
			checked: checked,
			disabled: ''
		    };

		    locationFilterData.push(attrs);
		});


		/* Jobtypes */
		var jobtypes = {E:{count:'0',label:'Any'},P:{count:'0',label:'Permanent'},X:{count:'0',label:'Contract'},T:{count:'0',label:'Temporary'},H:{count:'0',label:'Part-time'}};
		/* we know what kinds of jobtypes we want to make facets for
		   we kust need to translate the code for each and read the count */
		if (data.jobtype){
		    _.each(data.jobtype, function(e,i,v){
			if (jobtypes[i]){
			    jobtypes[i].count = e;
			}
		    });
		}

		var jobtypeFilterData = []
		_.each(jobtypes, function(e,i,v){
		    
		    /* the jobtype parameter might be a CSL */
		    var checked = '';
		    var values = [];
		    if ($.address.parameter('job_type')){ values = $.address.parameter('job_type').split(','); }
		    if (_.indexOf(values, i) > -1) { checked = "checked"; }

		    var attrs = {
			field_type: 'checkbox',
			field_name: 'job_type',
			field_id: 'job_type_' + i,
			label: e.label,
			value: i,
			count: '(' + e.count + ')',
			className: 'field',
			checked: checked,
			disabled: ''//(salaryCounts[i] < 1) ? 'disabled' : ''
		    };

		    jobtypeFilterData.push(attrs);
		    
		});


		/* Sectors */
		var sectors = {};
		if (data.sectors){
		    _.each(data.sectors, function(e,i,v){
			sectors[i] = e;
		    });
		}

		var sectorFilterData = []
		_.each(sectors, function(count,sec){

		    /* the sector parameter might be a CSL */
		    var checked = '';
		    var values = [];
		    if ($.address.parameter('sector')){ values = $.address.parameter('sector').split(','); }
		    if (_.indexOf(values, sec) > -1) { checked = "checked"; }

		    
		    var attrs = {
			field_type: 'checkbox',
			field_name: 'sector',
			field_id: 'sector_' + sec,
			label: sector_lookup[sec].name, // sector_lookup is a global JSON object
			value: sec,
			count: '(' + count + ')',
			className: 'field',
			checked: checked,
			disabled: ''
		    };

		    sectorFilterData.push(attrs);
		});

		this.refreshFilters({
		    locations: locationFilterData,
		    jobtypes: jobtypeFilterData,
		    sectors: sectorFilterData
		})

	    },

	    refreshFilters: function(filterData){

		/* use the facet data generated in the updateFacets function
		   to build a list of radio or checkbox fields for the facet search */

		try {

		    if ($(protojs.searchFiltersPanel).length > 0){
			
			for (var f in filterData){
			    $(protojs.searchFiltersPanel + ' #' + f + '_fields').empty()
			    if (filterData[f] && filterData[f].length > 0){
				var a = 0; while (a < filterData[f].length){

				    /* create a HTML fragment for each facet and append to 
				       the appropriate widget */
				    if (templates.search_filters_field){
					var filter = _.template(templates.search_filters_field, filterData[f][a]);
					$(protojs.searchFiltersPanel + ' #' + f + '_fields')
					    .append(filter);
				    }

				    /* then bind the protojs.searchApp.dataChanged method
				       to the 'click' event of each field.
				       This could be improved by figuring out 
				       how to listen to a change event,
				       since using 'click' will trigger the function
				       even when the user clicks a radio that is already on
				       (thereby leaving the paramter unchanged) */
				    $(protojs.searchFiltersPanel + ' #' + f + '_fields')
					.find('input')
					.each(function(){
					    $(this).bind('click',function(e){
						var n = $(e.target).attr('name');
						protojs.searchFormApp.dataChanged('div#'+n)
					    });
					});

				    a++;
				}
			    }
			}
		    }

		    /* we're rebuilfing the facets, so remove any 
		       previously added changed-state class indicator */
		    $(protojs.searchFiltersPanel).find('div.changed').removeClass('changed');

		} catch(e) {
		    protojs.searchApp.throwError(e)
		}

	    }

	});

	return searchFormView;
    }
)
