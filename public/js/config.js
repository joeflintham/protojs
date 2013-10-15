var protojs = {
    searchPathname: "/search.html",
    searchForm: "form#psform",
    advancedSearchForm: "form#advanced_search",
    searchFiltersPanel: 'form#filter_form',
    errorPanel: 'div#error_panel',
    fullVacancyPanel: 'div#full_vacancy',
    vacancyDetailsPanel: 'div#vacancy_details_content',
    searchInfoPanel: 'div#search_info',
    savedSearchToolsPanel: 'div#saved_search_tools',
    searchResultPanel: 'div#search_results',
    savedSearchResultPanel: 'div#saved_results'
}

protojs.searchForms = [protojs.searchForm, protojs.advancedSearchForm, protojs.searchFiltersPanel].join(',');

var templateList = {
    full_vacancy_listing: "/templates/full_vacancy_listing.html",
    radio_search_filters_field: "/templates/radio_search_filters_field.html",
    result_meta: "/templates/result_meta.html",
    saved_search: "/templates/saved_search.html",
    search_filters_field: "/templates/search_filters_field.html",
    vacancy: "/templates/vacancy.html",
    vacancy_details: "/templates/vacancy_details.html"
}

var templates = {}
