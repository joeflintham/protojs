"use strict";
/* searchApi */

    var sapi = {

	formData: {},

	/* triggered from Backbone app */
	processForm: function(searchForm, callback){	    
	    
	    try {
		if ($(searchForm).length < 1) throw new Error('No search form specified');
	    } catch(err) {
		if (callback) callback(err);
	    }

	    $.extend(sapi.formData, sapi.getFormData(searchForm));

	    sapi.updateQuery();
	},
	
	/* triggered from Backbone app */
	processFilters: function(searchFiltersForm){	    
	    
	    try {
		if ($(searchFiltersForm).length < 1) throw new Error('No search form specified');
	    } catch(err) {
		protojs.searchApp.throwError(err);
	    }

	    sapi.formData = sapi.getFilterData(searchFiltersForm);

	    sapi.updateQuery();

	},

	updateQuery: function(){

	    var formData = sapi.formData;

	    try {
		for (var a in formData){
		    if (formData[a] === '') formData[a] = '';
		    $.address.parameter(a, formData[a]); // all query parameters are stored in the $.address object
		}
	    } catch (e) {
		protojs.searchApp.throwError(err);
	    }

	},
	
	processQuery: function(searchForm, callback){	    
	    
	    try {
		if ($(searchForm).length < 1) throw new Error('No search form specified');
	    } catch(err) {
		if (callback) callback(err);
	    }

	    try {
		var a=0; while (a < $.address.parameterNames().length-1){
		    var key = $.address.parameterNames()[a];
		    $(searchForm).find('[name='+key+']').val($.address.parameter([key]))
		    a++;
		}
	    } catch (e) {
		protojs.searchApp.throwError(err);
	    }

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
		return fd;
	    } catch (e) {
		protojs.searchApp.throwError(err);
	    }
	    return {}
	},

	getFilterData: function(searchForm){

	    try {

		var fd = {}

		/* get jobtypes */
		var jt = $(searchForm).find('#jobtypes_fields input:checked')
		$(jt).each(function(){
		    $.extend(fd, {jobtype: $(this).val()})
		});

		/* get salaries */
		var salariesSelected = []
		var jt = $(searchForm).find('#salaries_fields input:checked')
		$(jt).each(function(){
		    salariesSelected.push($(this).val() - 0);
		});

		$.extend(fd, {search_salary_type: 'A', search_salary_low: 'ANY', search_salary_high: ''})
		if (salariesSelected.length > 0){
		    var s = salariesSelected.sort()
		    var low_salary = s.shift();
		    var max_salary = low_salary + 9000;
		    if (low_salary != 100000){
			$.extend(fd, {search_salary_type: 'A', search_salary_low: 'SALAA' + low_salary.toString().replace(/\d{3}$/,''), search_salary_high: 'SALAB' + max_salary.toString().replace(/\d{3}$/,'')});
		    } else {
			$.extend(fd, {search_salary_type: 'A', search_salary_low: 'SALAA100', search_salary_high: 'SALAB1000'})
		    }
		}

		return fd;
	    } catch (e) {
		protojs.searchApp.throwError(err);
	    }
	    return {}
	},


	/* triggered from Backbone app */
	loadVacancy: function(attrs, callback){

	    if (!(attrs && attrs.ref)) return false;
	    if (!callback) return false;


	    var vacancySource = "/v1/vacancy/" + attrs.ref;

	    $.ajax({		
		url: vacancySource,
		dataType: 'json',
		cache: false,
		error: function(e){ console.log(e); },
		success: function(e){
		    sapi.parseVacancy(e, callback, attrs);
		}
	    });
	},

	parseVacancy: function(data, callback, attrs){

	    var err, job = {};

	    try {
		if (data.length > 0){
		    for (var o in data){

			var e = data[o].entity;

			job.title = e.job_title;
			job.ref = e.vac_ref;
			job.displaytype = 'display';

			job.description = e.job_dscrpn;
			job.salary = e.salary;
			job.location = e.location;
			job.jobtype = e.duration;
			job.startdate = e.start_dt;

			var posted = e.create_date;
			var dateRegex = /(\d{2})-(\w{3})-(\d{2})/;
			var dateArray = dateRegex.exec(posted);
			job.posted = dateArray[1] + ' ' + dateArray[2] + ', 20' + dateArray[3];
			job.timestamp = Date.parse(job.posted) - 0;
			job.jobtype = '';

		    }
		} else {
		    throw new Error('Vacancy could not be found, sorry');
		}
	    } catch (e) { err = e }

	    if (callback) callback(err,job)
	},
	
	/* triggered from Backbone app */
	performSearch: function(callback){

	    var searchSource = "/v1/vacancy/";
	    var queryParams = {}	    
	    $.address.parameterNames().forEach(function(e,i,v){
		console.log(e,i,v);
		queryParams[e] = $.address.parameter(e);
	    });
	    console.log(queryParams);

	    $.ajax({		
		url: searchSource,
		data: queryParams,
		dataType: 'json',
		cache: false,
		error: function(e){ console.log(e); },
		success: function(e){
		    sapi.parseResults(e, callback);
		}
	    });
	},

	parseResults: function(data,callback){

	    var rangeStart, rangeEnd, totalResults, perPage, totalPages, currentPage, err, data, callback;

	    // no metadata available yet

	    var jobs = []

	    data.forEach(function(o,i,v){

		var job = {}
				
		var e = o.entity;
		job.title = e.job_title;
		job.ref = e.vac_ref;
		job.displaytype = 'display';

		job.description = e.job_dscrpn;
		job.salary = e.salary;
		job.location = e.location;
		job.jobtype = e.duration;
		job.startdate = e.start_dt;

		var posted = e.create_date;
		var dateRegex = /(\d{2})-(\w{3})-(\d{2})/;
		var dateArray = dateRegex.exec(posted);
		job.posted = dateArray[1] + ' ' + dateArray[2] + ', 20' + dateArray[3];
		job.timestamp = Date.parse(job.posted) - 0;

		jobs.push(job);
	    });

	    var res = {
		'meta'    : {
		    start   : rangeStart,
		    end     : rangeEnd,
		    total   : totalResults,
		    page    : currentPage,
		    pages   : totalPages,
		    perPage : perPage
		},
		'data'    : jobs
	    }

	    if (callback) { callback(err, res); }

	},

	monStrToInt: function(str){
	    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	    var a = $.inArray(str, months);
	    return (a > 0) ? a : 0;
	},

	loadSavedSearch: function(){
	    var d = JSON.parse(localStorage.getItem('savedsearches'));	    
	    return d; 
	},

	updateSavedSearch: function(obj){
	    var d = JSON.stringify(obj);
	    localStorage.setItem('savedsearches', d);
	},

	/* triggered from Backbone app */
	refreshFilters: function(data){

	    var salaries = _.map(data, function(d){ return sapi.convertToSalary(d.salary); });
	    var salaryRanges = [10000,20000,30000,40000,50000,60000,70000,80000,90000,Number.POSITIVE_INFINITY]
	    var salaryCounts = _.map(salaryRanges, function(l){
		var r = _.reduce(salaries, function(memo, s){ return (s <= l && s > l - 10000) ? memo + 1 : memo },0);
		return r;
	    }); // note that vacancies without salary values will be excluded from these figures

	    var salaryFilterData = []
	    _.each(salaryRanges, function(s,i){
		
		if (!s) {
		    s = '';
		}
		var label = '£' + s + '+';
		if (s === Number.POSITIVE_INFINITY) { label = '£100000+'; s = 100000} 

		var checked = '';
		var t = 'SALAA' + s.toString().replace(/\d{3}$/,'');
		if ($.address.parameter('search_salary_low') == t){ checked = 'checked'; }
		
		var attrs = {
		    field_name: 'salary',
		    field_id: 'salary_' + s,
		    label: label,
		    value: s,
		    count: salaryCounts[i],
		    checked: checked,
		    disabled: ''//(salaryCounts[i] < 1) ? 'disabled' : ''
		};

		salaryFilterData.push(attrs)
	    });



	    var locations = _.compact(_.reduce(data, function(memo,d) { return memo + d.location + ',' }, '' ).split(','));
	    var uniqueLocations = [];
	    var locationCounts = [];

	    _.each(locations, function(l,i){
		if (_.indexOf(uniqueLocations, l) < 0) { 
		    uniqueLocations.push(l);
		    locationCounts[_.indexOf(uniqueLocations, l)] = 1;		
		} else {
		    locationCounts[_.indexOf(uniqueLocations, l)]++;
		}
	    });

	    var locationFilterData = []
	    _.each(uniqueLocations, function(l,i){

		var checked = '';
		if ($.address.parameter('location_within') == l){ checked = 'checked'; }
		
		var attrs = {
		    field_name: 'location_' + l,
		    field_id: 'location_' + l,
		    label: l,
		    value: l,
		    count: locationCounts[i],

		    checked: checked,
		    disabled: ''
		};

		locationFilterData.push(attrs);
	    });



	    var durations = _.map(data, function(d) { return sapi.convertToJobType(d.duration) } );
	    var durationTypes = ['Any','Permanent','Contract','Temporary','Part-time']
	    var durationCodes = ['E','P','X','T','H']
	    var durationCounts = _.map(durationTypes, function(l){
		var r = _.reduce(durations, function(memo, s){ return (s == l) ? memo + 1 : memo },0);
		return r;
	    });

	    var jobtypeFilterData = []
	    _.each(durationTypes, function(t,i){

		var label = t;

		var checked = '';
		if ($.address.parameter('jobtype') == durationCodes[i]){ checked = 'checked'; }

		var attrs = {
		    field_name: 'duration',
		    field_id: 'duration_' + t,
		    label: label,
		    value: durationCodes[i],
		    count: durationCounts[i],
		    checked: checked,
		    disabled: ''//(salaryCounts[i] < 1) ? 'disabled' : ''
		};

		jobtypeFilterData.push(attrs);
	    });
	    

	    return {
		salaries: salaryFilterData,
		locations: locationFilterData,
		jobtypes: jobtypeFilterData
	    }
	},

	convertToSalary: function(s){
	    if (!s) return;
	    var convertHourlyToAnnual = false;
	    var convertDailyToAnnual = false;
	    if (s.match(/hour/)){ convertHourlyToAnnual = true; }
	    if (s.match(/hour/)){ convertDailyToAnnual = true; }
	    s = s.replace(/K/i,'000').replace(/[^0-9]/g,'').substr(0,5);
	    if (convertHourlyToAnnual) { s = (s * 7.5 * 5 * 52) }
	    if (convertDailyToAnnual) { s = (s * 7.5 * 5 * 52) }
            return s - 0;
	},

	convertToJobType: function(t){
	    if (!t) return;
	    t = t.replace(/\W/g,'');
	    if (t.match(/permanent/i)) return 'Permanent'
	    if (t.match(/contract/i)) return 'Contract'
	    if (t.match(/temp/i)) return 'Temp'
	    if (t.match(/parttime/i)) return 'Part-time'
	    if (t.match(/pt/i)) return 'Part-time'
            return 'Any';
	},


    }

