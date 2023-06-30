const div = document.querySelector(".display-section");

// fetch movies by search
async function fetchData(searchData) {
  const url = `https://www.omdbapi.com/?s=${searchData}&apikey=c3634210`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error occurred while fetching data");
    }
    const data = await response.json();

    if (data.Response === "True") {
      showAllMovies(data.Search);
    } else {
      throw new Error(data.Error || "Movie not found");
    }
  } catch (error) {
    console.error(error);
    if (error.message === "Movie not found") {
      div.innerHTML =
        "<p>No movies found. Please try a different search term.</p>";
    } else {
      alert("An error occurred. Please try again later.");
    }
  }
}

// for search input
function getSearch() {
  let searchData = document.querySelector("input").value.trim();
  if (searchData != "") {
    fetchData(searchData);
  } else {
    alert("Please enter a movie name");
  }
}

// Showing movies
function showAllMovies(movies) {
  div.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let child = `<div class="movie-box">
                  <figure class="movie-img">
                    <img src="${movies[i].Poster}" alt="${movies[i].Title} poster" />
                  </figure>
                  <div class="movie-info">
                    <h1>${movies[i].Title}</h1>
                    <p>${movies[i].Year}</p>
                  </div>
                </div>`;
    let newDiv = document.createElement("div");
    newDiv.innerHTML = child;
    div.appendChild(newDiv);
  }
}
