var templateList = {
    no_results: "/templates/no_results.html",
    full_vacancy_listing: "/templates/full_vacancy_listing.html",
    radio_search_filters_field: "/templates/radio_search_filters_field.html",
    result_meta: "/templates/result_meta.html",
    saved_search: "/templates/saved_search.html",
    search_filters_field: "/templates/search_filters_field.html",
    vacancy: "/templates/vacancy.html",
    vacancy_details: "/templates/vacancy_details.html"
}

var templates = {}
$(document).ready(function(){
    for (a in templateList){
	$.ajax({
            url: templateList[a],
            method: 'GET',
            async: true,
	    reference: a,
            success: function(d, s, x ) {
                templates[this.reference] = d;
            }
	});
    }
});
