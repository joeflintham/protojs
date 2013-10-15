define(

    // this module's name
    "v2/Models/Vacancy",

    // its dependencies
    [],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function () {

	var Vacancy = Backbone.Model.extend({
	    
	    /* idAttribute allows us to tell Backbone to use a specific attribute as its id */
	    idAttribute: 'vac_ref',

	    url: function(){
		return '/v1/vacancy/' + this.get('vac_ref')
	    },

	    parse: function(data){
		/* intercept the data from the server before it is used to populate the model */ 
		return this.parseObj(data);
	    },

	    parseObj: function(data){

		var job = {}
		var o = data.entity

		for (var k in o){
		    job[k] = o[k]
		}

		job.displaytype = 'display'; // linage, semi, display and sponsored are not implemented */
		job.jobtype = this.convertToJobType(job.jobtype);
		
		var create_date = job.create_date;
		var dateRegex = /(\d{2})-(\w{3})-(\d{2})/;
		var dateArray = dateRegex.exec(create_date);
		job.posted = dateArray[1] + ' ' + this.sc(dateArray[2]) + ', 20' + dateArray[3];
		job.timestamp = Date.parse(job.posted) - 0;
		var now = new Date();
		var one_day =  (1000 * 60 * 60 * 24);
		var posted = new Date(job.posted);
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

		job.ago = ago;
		job.href = '#';

		return job;
	    },

	    sc: function(s){
		s = s.toString().toLowerCase()
		return s.charAt(0).toUpperCase() + s.slice(1)
	    },

	    convertToJobType: function(t){
		if (!t) return 'Not Specified';
		t = t.replace(/\W/g,'');
		if (t.match(/perm[anent]/i)) return 'Permanent'
		if (t.match(/contract/i)) return 'Contract'
		if (t.match(/temp/i)) return 'Temp'
		if (t.match(/[parttime|pt]/i)) return 'Part-time'
		return 'Any';
	    }
	    
	});

	return Vacancy
    }
)
