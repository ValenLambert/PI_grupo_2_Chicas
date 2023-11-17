// creo boton de ver recomendaciones para series 
// 
// LO DEJO COMENTADO PORQUE TENGO QUE CHEQUEAR ALGO 

const urlParamsSeries = new URLSearchParams(window.location.search);
let movieIdSeries = urlParamsSeries.get('idSerie');
console.log('ID de la serie:', movieIdSeries);
let apiKey = '42737f60c529bfe7e9586db8cb132a1c';

let button = document.querySelector(".recoSerie")  
let reco = document.querySelector(".padreValoradas")
let pelis_recomendadasSeries = `https://api.themoviedb.org/3/movie/${movieIdSeries}/recommendations?api_key=${apiKey}&language=en-US&page=1`;



button.addEventListener("click", function(){
    fetch(pelis_recomendadasSeries)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data); 
   
        let peliculas = "";
        for (let i = 0; i < 4; i++) { 
            let dato = data.results[i].title;
            peliculas += `<div class="peliculasvaloradas peliculasRecomendadas">
                <a href="../PI_grupo_2_Chicas/detallePelicula.html?idSerie=${data.results[i].id}&seccion=seriesPopulares">            
                <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="imagen"></img>
                <h3 class="titulospelicula" >${dato}</h3>
                <p class="tituloestreno">Fecha de estreno: ${data.results[i].release_date}</p>
                </a>
                </div>`;
        }
       
        reco.innerHTML = peliculas;
        return data;
    })
    .catch(function (error) {
        console.log(`El error es ${error}`); 
        return error;
    });
   
   });
    



let qs = location.search;
let qsObj = new URLSearchParams (qs);
let idSerie = qsObj.get ("idSerie");
let seccion = qsObj.get("seccion");
let apiUrl = '';

if (seccion === 'seriesPopulares') {
    apiUrl = `https://api.themoviedb.org/3/tv/${idSerie}?api_key=${apiKey}`;
} else if (seccion === 'seriesValoradas') {
    apiUrl = `https://api.themoviedb.org/3/tv/${idSerie}?api_key=${apiKey}`;
}

let cambio = document.querySelector (".detallepelicula_div")
let cambioSegundo = document.querySelector (".Estrenodetalle")

fetch(apiUrl)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data); 
    let detalle= ""
    detalle = `<img class="imagenreyleon" src="https://image.tmdb.org/t/p/w500/${data.poster_path}" class="imagenreyleon"></img>
    <div class="Textos123">
        <h2 class="Texto1">Serie:</h2>
        <h2 class="Texto2">${data.name}</h2>
        <h2 class="Texto3">Sinopsis: ${data.overview}</h2>
        <i id="Arrow" class="fa-solid fa-arrow-left"></i>
    </div>` ;
    cambio.innerHTML = detalle;

    let detalle2 = ""
    cantidad_generos= 0;
    for (let i = 0; i < data.genres.length; i++) {
        cantidad_generos +=1;
    }
    if (cantidad_generos>1) {
        detalle2= `<p class="Estreno">Fecha de estreno: ${data.first_air_date}</p>
        <p>Rating: ${data.vote_average}</p>
        <div class="btns">
            <p>Géneros:</p>
            <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html?idGenero=${data.genres[0].id}&seccion=${data.genres[0].name}&es=Pelicula"> ${data.genres[0].name} </a></li>
            <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html?idGenero=${data.genres[1].id}&seccion=${data.genres[0].name}&es=Pelicula"> ${data.genres[1].name} </a></li>
        </div>`;
    } else if (cantidad_generos=1) {
        detalle2= `<p class="Estreno">Fecha de estreno: ${data.first_air_date}</p>
        <p>Rating: ${data.vote_average}</p>
        <div class="btns">
            <p>Géneros:</p>
            <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html?idGenero=${data.genres[0].id}&seccion=${data.genres[0].name}&es=Pelicula"> ${data.genres[0].name} </a></li>
        </div>`;
    }
    
    cambioSegundo.innerHTML =detalle2;

    return data;

})

.catch(function (error) {
    console.log(`El error es ${error}`); 
    return error;
});