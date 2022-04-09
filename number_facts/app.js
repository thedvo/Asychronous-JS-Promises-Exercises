let baseURL = 'http://numbersapi.com';
let favNumber = 27;

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

// Async & Await
async function favNumFact(num) {
	let res = await axios.get(`${baseURL}/${favNumber}/?json`);
	console.log(res.data.text);
}

favNumFact();

// Promises with .then
// axios.get(`${baseURL}/${favNumber}/?json`).then((response) => {
// 	console.log(response.data);
// });

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

// Async & Await
const nums = [11, 23, 30];
async function multipleFacts() {
	let res = await axios.get(`${baseURL}/${nums}/?json`);
	console.log(res.data);
}

multipleFacts();

// Promises with .then
// const nums = [11, 23, 30];
// axios.get(`${baseURL}/${nums}/?json`).then((response) => {
// 	console.log(response.data);
// });

// // 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

// Async & Await
async function fourFacts() {
	let facts = await Promise.all(
		Array.from({ length: 4 }, () => axios.get(`${baseURL}/${favNumber}/?json`))
	);
	facts.forEach((response) => $('body').append(`<p>${response.data.text}</p>`));
}

fourFacts();

// Promises with .then
// Promise.all(
// 	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// 	// Array.from() has an optional parameter mapFn, which allows you to execute a map() function on each element of the array being created.
// 	Array.from({ length: 4 }, () => {
// 		return axios.get(`${baseURL}/${favNumber}/?json`);
// 	})
// ).then((facts) =>
// 	facts.forEach((response) => $('body').append(`<p>${response.data.text}</p>`))
// );
