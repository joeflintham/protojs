define(

    // this module's name
    "v2/Models/SavedVacancy",

    // its dependencies
    ["v2/Models/Vacancy"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (Vacancy) {

	var SavedVacancy = Vacancy.extend({
	});

	return SavedVacancy
    }
)
