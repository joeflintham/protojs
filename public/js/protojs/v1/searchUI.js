"use strict"

var protojs = {}
protojs.searchPathname = "/search.html";
protojs.searchForm = "form#psform";
protojs.searchInfoPanel = 'div#search_info';
protojs.errorPanel = 'div#error_panel';
protojs.fullVacancyPanel = 'div#full_vacancy';
protojs.vacancyDetailsPanel = 'div#vacancy_details_content';
protojs.searchResultPanel = 'div#search_results';
protojs.savedResultPanel = 'div#saved_results';
protojs.searchFiltersPanel = 'div#search_filters';
protojs.savedToolsPanel = 'div#saved_search_tools';
protojs.pagerNode = '<div id="pagerNode" />';
protojs.fv = ''; // placeholder for a 'FullVacancy' model when used

$(document).ready(function(){

    var Vacancy = Backbone.Model.extend({
	
	initialize: function(){
	    this.prepare();
	},

	render: function(){
	    this.view = new VacancyView({model: this});
	    $(protojs.searchResultPanel).append(this.view.render().el);
	},

	remove: function(){
	    this.view.remove();
	    this.destroy();
	},

	prepare: function(){

	    try {
		var now = new Date();
		var one_day =  (1000 * 60 * 60 * 24);
		var posted = new Date(this.get('posted'));

		var diff = (Math.floor((now.getTime() - posted.getTime()) / one_day));

		var ago = '';
		switch (diff){
		case 0:
		    ago = 'today';
		    break;
		case 1:
		    ago = 'yesterday';
		    break;
		default:
		    ago = diff + ' days ago';
		    break;
		}

	    } catch (e) {
		console.log(e);
	    }

	    this.set('ago', ago);
	    this.set('href', '#');
	}
	
    });



    var SavedVacancy = Vacancy.extend({
	
	render: function(){
	    this.view = new VacancyView({model: this});
	    $(protojs.savedResultPanel).append(this.view.render().el);
	}, 

	remove: function(){
	    this.view.remove();
	    this.destroy();
	}
    });



    var VacancyList = Backbone.Collection.extend({
	model: Vacancy
    });




    var SavedVacancyList = Backbone.Collection.extend({
	model: SavedVacancy,
    });



    var SavedSearchApplication = Backbone.View.extend({

	el: protojs.savedToolsPanel,

	events: {
	    'click a.saved_search_link': 'show',
	},

	update: function(){

	    var d = {
		numSaved: protojs.savedVacancyList.length,
		saved_search_link: '#'
	    }

	    $(this.el).empty();
	    var t = _.template($('#saved_search').html(), d);
	    $(this.el).html(t)

	    $(this.el).find('p.viewSavedSearches').removeClass('hasSavedSearches');	
	    if (d.numSaved > 0){
		$(this.el).find('p.viewSavedSearches').addClass('hasSavedSearches');	
	    }

	},

	loadFromStorage: function(){
	    var data = sapi.loadSavedSearch();
	    $(protojs.savedResultPanel).empty();
	    protojs.savedVacancyList.reset();
	    _.each(data, function(o){
		protojs.savedVacancyList.add(o);
	    });
	    this.update();
	},

	store: function(){
	    sapi.updateSavedSearch(protojs.savedVacancyList);
	    this.update();
	},

	show: function(e){
	    if (e) e.preventDefault();

	    $.address.parameter('view','savedSearch');
	    protojs.searchInfo.update();
	},

	hide: function(e){
	    if (e) e.preventDefault();

	    $.address.parameter('view','');
	    protojs.searchInfo.update();
	}
	
    });





    var VacancyView = Backbone.View.extend({
	
	initialize: function(){
	    _.bindAll(this, 'save', 'show', 'unsave', 'applyFor');
	},

	render: function(){
	    var vacData = this.model.attributes;

	    vacData.savedclass = 'unsaved';
	    vacData.savelink = '#';
	    vacData.savetext = 'Save';
	    vacData.unsavelink = '#';
	    vacData.unsavetext = 'Unsave';
	    vacData.applylink = '#';
	    vacData.applytext = 'Apply Now';

	    var vt = _.template($('#vacancy').html(), vacData)
	    this.$el.html(vt);
	    this.refreshView();
	    return this;
	},

	refreshView: function(){
	    if (protojs.savedVacancyList.where({ref: this.model.get('ref')}).length > 0){
		$(this.$el).find('div.vacancy').removeClass('unsaved').addClass('saved');
	    } else {
		$(this.$el).find('div.vacancy').removeClass('saved').addClass('unsaved');
	    }
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
	    protojs.savedVacancyList.add(this.model.attributes)
	    this.$el.find('div.vacancy').removeClass('unsaved').addClass('saved');
	},

	unsave: function(e){
	    e.preventDefault()
	    var mToRemove = protojs.savedVacancyList.where({ref: this.model.get('ref')});
	    protojs.savedVacancyList.remove(mToRemove)
	    this.$el.find('div.vacancy').removeClass('saved').addClass('unsaved');
	},

	applyFor: function(e){
	    e.preventDefault()
	    protojs.ssearchApp.displayError(new Error('\'Apply for\' functionality not yet implemented'));
	},

    });







    var FullVacancy = Backbone.Model.extend({

	render: function(){
	    this.view = new FullVacancyView({model: this});
	    this.view.render();
	},

	remove: function(){
	    this.view.remove();
	    this.destroy();
	},

    });

    var FullVacancyView = Backbone.View.extend({

	el: protojs.fullVacancyPanel,

	model: FullVacancy,

	render: function(){

	    var smt = _.template($('#full_vacancy_listing').html(), this.model.attributes);
	    $(this.el).html(smt);


	    var details = $.extend({
		savelink: '#',
		unsavelink: '#'
	    }, this.model.attributes);

	    var vmt = _.template($('#vacancy_details').html(), details);
	    $(protojs.vacancyDetailsPanel).html(vmt);

	    var m = protojs.savedVacancyList.where({ref: this.model.get('ref')});

	    $(protojs.vacancyDetailsPanel).addClass('unsaved').removeClass('saved')
	    if (m.length > 0){
		$(protojs.vacancyDetailsPanel).addClass('saved').removeClass('unsaved')
	    }

	    var self = this;
	    $(protojs.vacancyDetailsPanel).find('p.save a').bind('click', function(e){
		e.preventDefault();
		protojs.savedVacancyList.add(self.model.attributes)
		self.render();
	    });

	    $(protojs.vacancyDetailsPanel).find('p.unsave a').bind('click', function(e){
		e.preventDefault();
		self.render();
	    });

	    protojs.searchInfo.update();
	},

	remove: function(){
	    $(this.el).empty();
	}
    });






    var SearchInfoModel = Backbone.Model.extend({
	
	defaults: function(){ 
	    return {
		start: '', 
		end: '',
		total: '',
		page: '',
		pages: '', 
		perPage: '',
		return_to_search_link: '',
	    }
	},

	initialize: function(){
	    this.view = new SearchInfoView({model: this});
	},

	update: function(metadata){
	    if (metadata) this.set(metadata);
	    this.view.render();
	}
	
    });

    var SearchInfoView = Backbone.View.extend({

	el: protojs.searchInfoPanel,

	model: SearchInfoModel,

	events: {
	    'click a.return_to_search_link' : 'loadSearchResults',
	},

	render: function(){

	    var smt = _.template($('#result_meta').html(), this.model.attributes);
	    $(this.el).html(smt);

	    if ($.address.parameter('view')) {

	    }
	},

	loadSearchResults: function(e){
	    if (e) e.preventDefault();
	    $.address.parameter('view', '');
	    if (protojs.fv.remove) { protojs.fv.remove();}
	    protojs.searchApp.updateQuery();
	}

    });







    
    var searchApplication = Backbone.View.extend({
	
	el: $('body'),

	events: {
	    'submit form#psform' : 'performSearch',
	},
	
	initialize: function(){

	    this.delegateEvents()
	    
	    _.bindAll(this, 'performSearch', 'loadVacancy', 'saveVacancy', 'showVacancy', 'unsaveVacancy');

	    this.listenTo(protojs.vacancyList, 'add', this.addVacancy);
	    this.listenTo(protojs.vacancyList, 'remove', this.removeVacancy);

	    this.listenTo(protojs.savedVacancyList, 'add', this.saveVacancy);
	    this.listenTo(protojs.savedVacancyList, 'remove', this.unsaveVacancy);

	    var self = this;
	    $.address.externalChange(function(){
		self.updateQuery();
	    });

	    $.address.internalChange(function(){
		self.updateView();
	    });

	},

	performSearch: function(e){

	    if (e) e.preventDefault()
	    this.clearErrors();

	    $(this.el).addClass('loading');

	    sapi.processFilters(protojs.searchFiltersPanel);
	    sapi.processForm(protojs.searchForm, this.processData);

	    var searchLocation = protojs.searchPathname + '#/?' + $.address.queryString();

	    if (protojs.searchPathname !== window.location.pathname){
		window.location = searchLocation;
		return true;
	    }

	    _.each(protojs.vacancyList.toArray(), function(v){
		protojs.vacancyList.remove(v);
	    });	    
	    
	    if (protojs.vacancyList.length < 1) sapi.performSearch(this.processData);

	},

	saveVacancy: function(v){
	    this.clearErrors();
	    v.render()
	    protojs.savedSearchApp.store();
	},

	unsaveVacancy: function(v){
	    this.clearErrors();
	    v.remove()
	    protojs.savedSearchApp.store();
	},

	loadVacancy: function(m){
	    this.clearErrors();
	    if (m && m.ref) {
		$(this.el).addClass('loading');
		sapi.loadVacancy(m, this.showVacancy)
		$.address.parameter('showVacancy', m.ref);
		$.address.parameter('view', 'showVacancy');
	    }
	},

	showVacancy: function(err, data){

	    if (err) {
		this.throwError(err)
		return
	    }
	    if (data){

		$(this.el).removeClass('loading');

		protojs.fv = new FullVacancy(data)
		protojs.fv.render();
	    }
	},

	throwError: function(err){
	    $(protojs.errorPanel).html('<p class="error">' + err.message + '</p>')
//	    $(protojs.errorPanel).append('<p class="error">' + err.stack + '</p>')
	    if (err) { $(this.el).addClass('viewErrors'); }
	},

	clearErrors: function(){
	    $(this.el).removeClass('viewErrors');
	    $(protojs.errorPanel).empty()
	},

	processData: function(err, res){

	    $(protojs.searchApp.el).removeClass('loading');

	    $(protojs.searchFiltersPanel + ' fieldset').empty();

	    $(protojs.searchResultPanel).empty();

	    protojs.savedSearchApp.loadFromStorage();
	    protojs.savedSearchApp.hide();

	    if (res && res.data && res.data.length > 0){
		
		try {

		    protojs.searchInfo.update(res.meta);

		    /* disabled while cookie issue prevents scraping beyond first page
		    protojs.searchApp.paginate(res.meta);
		    */
		    protojs.searchApp.refreshFilters(res.data);
		    
		    for (var a =0; a < res.data.length; a++){
			protojs.vacancyList.add(res.data[a]);
		    }
		} catch (e) {
		    console.log(e.message);
		}
	    } else {
		var template = $('#no_results').html();
		$(protojs.searchResultPanel).html(template);
	    }
	},
	
	addVacancy: function(v){
	    v.render();
	},

	removeVacancy: function(v){
	    v.remove();
	},

	updateQuery: function(){
	    
	    $(this.el).addClass('loading');
	    sapi.processQuery(protojs.searchForm, function(){});
	    protojs.savedSearchApp.loadFromStorage();
	    protojs.searchInfo.update();

	    var view = $.address.parameter('view');
	    var vref = $.address.parameter('showVacancy');

	    if (view == "showVacancy" && vref){ // page request is to view a vacancy
		sapi.loadVacancy({ref: vref}, this.showVacancy)

	    } else if (view == "savedSearch") { // page request is to view saved searches
		protojs.savedSearchApp.show();

	    } else { // load search results based on any existing parameters
		$.address.parameter('view', '');
		$.address.parameter('showVacancy', '');
		this.refreshFilters([])
		if (protojs.searchPathname === window.location.pathname) this.performSearch()
	    }
	    this.updateView();
	},
	   
	updateView: function(){

	    var view = $.address.parameter('view');
	    var err = $.address.parameter('err');
	    var vurl = $.address.parameter('showVacancy');

	    $(this.el).removeClass('viewVacancy').removeClass('viewSaved').removeClass('viewResults');
	    
	    if (view == "showVacancy" && vurl){ // page request is to view a vacancy
		$(this.el).addClass('viewVacancy');

	    } else if (view == "savedSearch") { // page request is to view saved searches
		$(this.el).addClass('viewSaved');
				
	    } else {
		$(this.el).addClass('viewResults');
	    }
	    
	},
	
	refreshFilters: function(data){

	    try {

		$(protojs.searchFiltersPanel + ' fieldset').empty();
		
		var filterData = sapi.refreshFilters(data);

		for (var f in filterData){
		    if (filterData[f] && filterData[f].length > 0){
			var a = 0; while (a < filterData[f].length){
			    var filter = _.template($('#radio_search_filters_field').html(), filterData[f][a]);
			    $(protojs.searchFiltersPanel + ' #' + f + '_fields').append(filter);
			    a++;
			}
		    }
		}

		/*
		if (filterData.locations && filterData.locations.length > 0){
		    var a = 0; while (a < filterData.locations.length - 1){
			var location_filter = _.template($('#radio_search_filters_field').html(), filterData.locations[a]);
			$(protojs.searchFiltersPanel + ' #location_fields').append(location_filter);
			a++;
		    }
		}

		if (filterData.jobtypes && filterData.jobtypes.length > 0){
		    var a = 0; while (a < filterData.jobtypes.length - 1){
			var jobtype_filter = _.template($('#radio_search_filters_field').html(), filterData.jobtypes[a]);
			$(protojs.searchFiltersPanel + ' #duration_fields').append(jobtype_filter);
			a++;
		    }
		}

		*/


	    } catch(e) {
		console.log(e, e.message);
	    }

	},

	pageLink: function(e){
	    e.preventDefault();

	    /*
	      var rowNum = e.data.p * e.data.meta.perPage;
	      $.address.parameter('displayrows',e.data.meta.perPage);
	      $.address.parameter('rownum',rowNum);
	      searchApp.performSearch()
	    */
	},

	paginate: function(meta){

	    if (parseInt(meta.pages) > 1){ 
		//if only one page of results
		// then no point in bulding a navigator

		var pagerNode = $(protojs.pagerNode)
		var counter = 1;								
		
		if (meta.pages > 10){					
		    // if there are more than ten pages
		    // of results, then only show the 
		    // nearest 11 page links
		    // and for pages out of that range,
		    // give a 'first' or 'last' link
		    // where appropriate
		    counter = meta.page - 5;				
		    // 'counter' will be the first
		    // linked page number
		    
		    if (counter < 2){ counter = 1; } 		
		    // current page is within the 
		    // first 6 pages
		    
		    else { 									
			// give a 'back to first page' link
			var firstSpan = $('<span id="firstLink" class="pSpan" />')
			    .append($('<a href="?page=1">First</a> ... '))
			pagerNode.append(firstSpan);
		    }
		}
		
		
		var endcounter = counter + 10; 					
		// we're going to supply a max
		// of 11 page links ...
		
		if (endcounter > meta.pages){ endcounter = meta.pages; } 
		// or however many pages there are 
		// if fewer than 11
		
		// NOTE
		// (we use 11 because it means there
		// are 5 live links either side of 
		// the non-linked current page 
		// in the centre)
		
		
		for (var b = counter; b <= endcounter; b++){ 	// run over the counter 
		    // and create the page links
		    
		    var number = b; 							
		    // this will be the page number 
		    // linked to in each iteration
		    var numbertxt = number;
		    
		    var pSpan = $('<span class="pSpan" />')
		    
		    if (meta.page == (b)) {		
			// we're looping over the current page
			pSpan.text(numbertxt); 
		    } 	// so we just need a piece of text
		    
		    else { 									
			// create a link
			
			var pLink = $('<a href="?page='+number+'" class="pLink">' + number + '</a>')
			    .bind('click',{obj:protojs.searchApp,p:number,meta:meta},protojs.searchApp.pageLink);
			pSpan.append(pLink);
		    }										
		    
		    pagerNode.append(pSpan);
		    
		} 											
		// pagination loop complete
		
		if (endcounter < meta.pages){ 			
		    // there are more pages beyond 
		    // the last link in the current menu
		    
		    var lastSpan = $('<span id="lastLink" class="pSpan" />')
		    
		    var lastLink = $('... <a href="?page='+meta.pages+'">Last</a>');
		    
		    // create a link to the last page
		    lastSpan.append(lastLink);
		    pagerNode.append(lastSpan);

		}
		
	    }

	    $(protojs.searchInfoPanel).append($(pagerNode))
	}

    });


	protojs.vacancyList = new VacancyList;
	protojs.savedVacancyList = new SavedVacancyList;
	protojs.savedSearchApp = new SavedSearchApplication;
	protojs.searchInfo = new SearchInfoModel;
	protojs.searchApp = new searchApplication;


});
