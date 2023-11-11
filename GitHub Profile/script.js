const PROFILE_URL = "https://api.github.com/users/";

const main = document.querySelector('#main');

const profile = async (user) => {
	const res = await fetch(PROFILE_URL + user);
	const data = await res.json()

	if (data.message == "Not Found") {

		console.log('not 202');

		main.innerHTML = `
		<div id="card">
		<div id="noUser">
		<img src="https://user-images.githubusercontent.com/13457963/70033753-60c25f80-15b0-11ea-9a47-70999235d222.png" alt="user not found">
		</div>

		<div id="home">
		<a href="index.html"> <button>Home</button></a>
		</div>

		</div>
		`
	}

	else {
		const card = `
    <div id="card">

    <div id="avtar">
      <img  src='${data.avatar_url}' alt="profile">
    </div>

    <form id="search" onsubmit="return searchUser()">
    <input type="text" placeholder="search" spellcheck = "false" />
    </form>


    <div id="basic-info">
      <h2>${data.name}</h2>
      <p>${data.login}</p>
      <p> ${data.bio}
      </p>
    </div>

    <ul id="info">
      <li>${data.followers} <strong>Followers</strong></li>
      <li>${data.following} <strong>Following</strong></li>
      <li>${data.public_repos} <strong>Repos</strong></li>
    </ul>

    <div id="repos">
    </div>
  </div>
    `
		main.innerHTML = card;
		repos(user)
	}
}

const repos = async (user) => {
	const res = await fetch(PROFILE_URL + user + '/repos')
	const data = await res.json();
	const repos = document.querySelector("#repos")

	// 10 repos name and url
	for (let i = 0; i < 10; i++) {

		const repo_name = data[i].name;
		const repo_url = data[i].html_url;

		// console.log(repo_name)

		const element = document.createElement('a')
		element.href = repo_url;
		element.classList.add("repo");
		element.target = "_blank"
		element.innerHTML = repo_name
		repos.appendChild(element)
	}

}

// initial call
profile('Raj-venom')



// const user = document.querySelector('#search input');

// user.addEventListener('keyup', function (event) {

//   if (event.key === "Enter") {
//     console.log(user.value)

//     profile(user.value)

//   }
// })

const searchUser = () => {
	const searchBox = document.querySelector('#search input');

	if (searchBox.value != "") {
		// console.log('value is vsl')

		profile(searchBox.value)
		console.log(searchBox.value)
	} else {
		console.log("no value")
	}

	return false


}
