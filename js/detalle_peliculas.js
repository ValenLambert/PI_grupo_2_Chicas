let pelis_valoradas = `https://api.themoviedb.org/3/movie/top_rated?api_key=42737f60c529bfe7e9586db8cb132a1c`;
let texto2 = document.querySelector (".Texto2");
let cambio = document.querySelector (".detallepelicula_div");
let cambio2 =document.querySelector (".Estrenodetalle")

fetch(pelis_valoradas)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data); 
    let detalle= ""
    detalle = `<img class="imagenreyleon" src="https://image.tmdb.org/t/p/w500/${data.results[0].poster_path}" class="imagenreyleon"></img>
    <div class="Textos123">
        <h2 class="Texto1">Pelicula:</h2>
        <h2 class="Texto2">${data.results[0].title}</h2>
        <h2 class="Texto3">Sinopsis: ${data.results[0].overview}</h2>
        <i id="Arrow" class="fa-solid fa-arrow-left"></i>
    </div>` ;
    cambio.innerHTML = detalle;

    let detalle2 = ""
    detalle2= `<p class="Estreno">Fecha de estreno: ${data.results[0].release_date}</p>
    <p>Rating: ${data.results[0].vote_average}</p>
    <p>Duración: ${data.results[0].id} minutos</p>
    <div class="btns">
        <p>Géneros:</p>
        <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html"> ${data.results[0].genere_ids[0]} </a></li>
        <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html"> ${data.results[0].genere_ids[1]} </a></li>
    </div>
    <button>Agregar a favoritos</button>`;
    cambio2.innerHTML =detalle2;

    return data;

})

.catch(function (error) {
    console.log(`El error es ${error}`); 
    return error;
});