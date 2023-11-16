// creo boton de ver recomendaciones para peliculas 
let button = document.querySelector(".verRecomendaciones")
let pelis_recomendadas = `https://api.themoviedb.org/3/movie/top_rated?api_key=42737f60c529bfe7e9586db8cb132a1c`;
let qs = location.search;
let qsObj = new URLSearchParams (qs);
let idPersonaje = qsObj.get ("idPersonaje");
let seccion = qsObj.get("seccion");
let apiKey = '42737f60c529bfe7e9586db8cb132a1c';
let apiUrl = '';
let recomendadas = document.querySelector(".sugerido");
if (seccion === 'valoradas') {
    apiUrl = `https://api.themoviedb.org/3/movie/${idPersonaje}?api_key=${apiKey}`;
} else if (seccion === 'masVisto') {
    apiUrl = `https://api.themoviedb.org/3/movie/${idPersonaje}?api_key=${apiKey}`;
}

let texto2 = document.querySelector (".Texto2");
let cambio = document.querySelector (".detallepelicula_div");
let cambioSegundo =document.querySelector (".Estrenodetalle");

fetch(apiUrl)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data); 
    let detalle= ""
    detalle = `<img class="imagenreyleon" src="https://image.tmdb.org/t/p/w500/${data.poster_path}" class="imagenreyleon"></img>
    <div class="Textos123">
        <h2 class="Texto1">Pelicula:</h2>
        <h2 class="Texto2">${data.title}</h2>
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
        detalle2 = `<p class="Estreno">Fecha de estreno: ${data.release_date}</p>
        <p>Rating: ${data.vote_average}</p>
        <p>Duración: ${data.runtime} minutos</p>
        <div class="btns">
            <p>Géneros:</p>
            <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html?idGenero=${data.genres[0].id}&seccion=${data.genres[0].name}"> ${data.genres[0].name} </a></li>
            <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html?idGenero=${data.genres[1].id}&seccion=${data.genres[1].name}"> ${data.genres[1].name} </a></li>
        </div>
        <button>Agregar a favoritos</button>`;
    } else if (cantidad_generos=1) {
        detalle2 = `<p class="Estreno">Fecha de estreno: ${data.first_air_date}</p>
        <p>Rating: ${data.vote_average}</p>
        <p>Duración: ${data.runtime} minutos</p>
        <div class="btns">
            <p>Géneros:</p>
            <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html?idGenero=${data.genres[0].id}&seccion=${data.genres[0].name}"> ${data.genres[0].name} </a></li>
        </div>
        <button>Agregar a favoritos</button>`;
    }
    cambioSegundo.innerHTML =detalle2;
    return data;

})

.catch(function (error) {
    console.log(`El error es ${error}`); 
    return error;
});

button.addEventListener("click", function(){
    fetch(pelis_recomendadas)
 .then(function (response) {
     return response.json();
 })
 .then(function (data) {
     console.log(data); 

     let peliculas = "";
     for (let i = 0; i < 4; i++) { 
         let dato = data.results[i].title;
         peliculas += ` 
             <div class="peliculasvaloradas">
             <a href="../PI_grupo_2_Chicas/detallePelicula.html?idPersonaje=${data.results[i].id}&seccion=valoradas">            
             <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="imagen"></img>
             <h3 class="titulospelicula" >${dato}</h3>
             <p class="tituloestreno">Fecha de estreno: ${data.results[i].release_date}</p>
             <a/>
             </div>`;
             
     }
     recomendadas.innerHTML =peliculas;
     return data;
 })
 .catch(function (error) {
     console.log(`El error es ${error}`); 
     return error;
 });

});

