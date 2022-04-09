let baseURL = 'https://pokeapi.co/api/v2/pokemon';

// 1. Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.

// Async Await
async function get_pokemon() {
	let res = await axios.get(`${baseURL}/?limit=898`);
	console.log(res.data.results);
}

get_pokemon();

// axios.get(`${baseURL}/?limit=898`).then((response) => {
// 	console.log(response.data);
// 	console.log(response.data.results[0].name);
// 	console.log(response.data.results[0].url);

// 	for (let pokemon of response.data.results) {
// 		console.log(pokemon.name);
// 		console.log(pokemon.url);
// 	}
// });

// 2. Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.

axios
	.get(`${baseURL}/380/`)
	.then((p1) => {
		console.log(p1.data.name);
		return axios.get(`${baseURL}/382/`);
	})
	.then((p2) => {
		console.log(p2.data.name);
		return axios.get(`${baseURL}/383/`);
	})
	.then((p3) => {
		console.log(p3.data.name);
	});

/* 3. Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s species URL (you should see a key of species in the data). Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.

Example: “ducklett: They are better at swimming than flying, and they happily eat their favorite food, peat moss, as they dive underwater.” */

axios
	.get(`${baseURL}/382/`)
	.then((p1) => {
		p1Name = p1.data.name;
		return axios.get(`${baseURL}-species/382/`);
	})
	.then((p1) => {
		console.log(
			`${p1Name.toUpperCase()} --> ${
				p1.data.flavor_text_entries[0].flavor_text
			}`
		);
		return axios.get(`${baseURL}/383/`);
	})
	.then((p2) => {
		p2Name = p2.data.name;
		return axios.get(`${baseURL}-species/383/`);
	})
	.then((p2) => {
		console.log(
			`${p2Name.toUpperCase()} --> ${
				p2.data.flavor_text_entries[0].flavor_text
			}`
		);
		return axios.get(`${baseURL}/384/`);
	})
	.then((p3) => {
		p3Name = p3.data.name;
		return axios.get(`${baseURL}-species/384/`);
	})
	.then((p3) => {
		console.log(
			`${p3Name.toUpperCase()} --> ${
				p3.data.flavor_text_entries[0].flavor_text
			}`
		);
	});

// 4. BONUS Instead of relying on console.log, let’s create a UI for these random pokemon. Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.
