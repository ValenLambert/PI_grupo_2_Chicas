let qs = location.search;
let qsObj = new URLSearchParams (qs);
let nombrePelicula = qsObj.get ("nombrePelicula");
let titulo= document.querySelector (".Titulosbusqueda");
let apiKey = '42737f60c529bfe7e9586db8cb132a1c';
let pelis_valoradas = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${nombrePelicula}`;
console.log(pelis_valoradas);
let peliculasValor = document.querySelector (".padreValoradas");

titulo.innerHTML= `Busqueda: <i class="fa-solid fa-magnifying-glass"> ${nombrePelicula}</i>`

fetch(pelis_valoradas)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data); 
    let peliculas = "";
    for (let i = 0; i < 4; i++) { 
        let dato = data.results[i].title;
        peliculas += `<div class="peliculasvaloradas">
            <a href="../PI_grupo_2_Chicas/detallePelicula.html?idPersonaje=${data.results[i].id}">
            <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="imagen"></img>
            <h3 class="titulospelicula" >${dato}</h3>
            <p class="tituloestreno">Fecha de estreno: ${data.results[i].release_date}</p>
            <a/>
            </div>`;
    }
   
    peliculasValor.innerHTML = peliculas;

})
.catch(function (error) {
    console.log(`El error es ${error}`); 
    return error;
});