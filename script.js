const APIKEY = "api_key=0ceafd2fe4063f7a84f9bba079ab77ba";
const base = "https://api.themoviedb.org/3";
const URL = base + "/discover/movie?sort_by=popularity.desc&" + APIKEY;
const imgURL = "https://image.tmdb.org/t/p/w500";
const SEARCHURL = base + "/search/movie?" + APIKEY 
const CATEGORIESURL = URL + '&&with_genres='


const btnCategory = document.querySelectorAll('#btn-category')
const container = document.querySelector(".container");
const form = document.querySelector('form')
const categories = document.getElementById('categories')


const genres = 
    [
        {
        "id": 28,
        "name": "Action"
        },
        {
        "id": 12,
        "name": "Adventure"
        },
        {
        "id": 16,
        "name": "Animation"
        },
        {
        "id": 35,
        "name": "Comedy"
        },
        {
        "id": 80,
        "name": "Crime"
        },
        {
        "id": 99,
        "name": "Documentary"
        },
        {
        "id": 18,
        "name": "Drama"
        },
        {
        "id": 10751,
        "name": "Family"
        },
        {
        "id": 14,
        "name": "Fantasy"
        },
        {
        "id": 36,
        "name": "History"
        },
        {
        "id": 27,
        "name": "Horror"
        },
        {
        "id": 10402,
        "name": "Music"
        },
        {
        "id": 9648,
        "name": "Mystery"
        },
        {
        "id": 10749,
        "name": "Romance"
        },
        {
        "id": 878,
        "name": "Science Fiction"
        },
        {
        "id": 10770,
        "name": "TV Movie"
        },
        {
        "id": 53,
        "name": "Thriller"
        },
        {
        "id": 10752,
        "name": "War"
        },
        {
        "id": 37,
        "name": "Western"
        }
        ]

const selectedGenre = []


function setGenre(){
    genres.forEach(genre =>{
        const genreEl = document.createElement('div')
        genreEl.classList.add('tag')
        genreEl.setAttribute('id', genre.id)
        genreEl.innerHTML = genre.name
        
        genreEl.addEventListener('click', function(e){
            if(selectedGenre == 0){
                selectedGenre.push(genreEl.id)
                // console.log(selectedGenre)
            }else{
                if(selectedGenre.includes(genreEl.id)){
                        selectedGenre.forEach((id, ind) => {
                            if(genreEl.id == id){
                                selectedGenre.splice(ind, 1)
                            }
                        })
                    }
                    selectedGenre.push(genreEl.id)
                    // console.log(selectedGenre)
                }
                
            })   
            categories.append(genreEl)
        })
        highlightBtns()
    }
    

function highlightBtns(){
    const buttons = document.querySelectorAll('.tag')
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e){
            container.innerHTML =''
            const currentBtn = e.target
            if(!currentBtn.classList.contains('active')){
                currentBtn.classList.add('active')
                getMovies(CATEGORIESURL+selectedGenre.join(','))
            }else{
                currentBtn.classList.remove('active')
                if(selectedGenre.includes(currentBtn.id)){
                    selectedGenre.pop()
                    getMovies(CATEGORIESURL+selectedGenre.join(','))
                }
            }

        })
    })
}

function removeHighlight(){
    selectedGenre.length = 0
    const buttons = document.querySelectorAll('.tag')
    buttons.forEach(btn => {
        btn.classList.remove('active')
    })
}

setGenre()

async function getMovies(fetchedUrl) {
  const resp = await fetch(fetchedUrl);
  const data = await resp.json();


//   console.log(data)

  for (let i = 0; i < data.results.length; i++) {
    const {poster_path, original_title, overview, vote_average} = data.results[i]


    container.innerHTML += `
    <div class="movie" id="movie">
                    <div class="rate" >${vote_average}</div>
                    <div class="body-container">
                    <img src="${imgURL + poster_path}" alt="">
                    <div class="overview-container">
                        <h3 id="title">${original_title}</h3>
                        <p id="overview" >${overview}</p>
                    </div>

                        </div>
                    </div>
                `;
  }
  currentPage = data.page;
  nextPage = currentPage + 1;
  prevPage = currentPage - 1;
  totalPages = data.total_pages;

}

getMovies(URL);


form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const searchInput = document.getElementById('search-input')
    const searchTerm = searchInput.value
    const FSEARCHURL = SEARCHURL + searchTerm

    if(searchTerm){
        container.innerHTML = ''
        getMovies(SEARCHURL + `&query=${searchInput.value}`)
        removeHighlight()
    }else{
        return;
    }
})



