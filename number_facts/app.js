let baseURL = 'http://numbersapi.com';
let favNumber = 27;

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

axios.get(`${baseURL}/${favNumber}/?json`).then((response) => {
	console.log(response.data);
	console.log(response.data.number);
	console.log(response.data.text);
});

// $.getJSON(`${baseURL}/${favNumber}/?json`).then((response) => {
// 	console.log(response);
// 	console.log(response.number);
// 	console.log(response.text);
// });

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

let nums = [11, 23, 30];
axios.get(`${baseURL}/${nums}/?json`).then((response) => {
	console.log(response.data);
	console.log(response.data[11]);
	console.log(response.data[23]);
	console.log(response.data[30]);
});

// $.getJSON(`${baseURL}/${nums}/?json`).then((response) => {
// 	console.log(response);
// 	console.log(response[11]);
// 	console.log(response[23]);
// 	console.log(response[30]);
// });

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

Promise.all(
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
	// Array.from() has an optional parameter mapFn, which allows you to execute a map() function on each element of the array being created.
	Array.from({ length: 4 }, () => {
		return axios.get(`${baseURL}/${favNumber}/?json`);
	})
).then((facts) =>
	facts.forEach((response) => $('body').append(`<p>${response.data.text}</p>`))
);
