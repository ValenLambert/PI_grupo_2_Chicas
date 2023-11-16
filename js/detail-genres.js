let titulos_genero =document.querySelector(".titulos_genero");
let peliculas_de_genero= document.querySelector(".Titulos");
let qs = location.search;
let qsObj = new URLSearchParams (qs);
let idSerie = qsObj.get ("idGenero");
let seccion = qsObj.get("seccion");
let apiKey = '42737f60c529bfe7e9586db8cb132a1c';

let padreValoradas = document.querySelector (".padreValoradas");

let pelis_valoradas = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
console.log(pelis_valoradas);

fetch(pelis_valoradas)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data); 
    let peliculas = "";
    total= 0;
    for (let i = 0; i < 20; i++) { 
        if (data.results[i].genre_ids[0] === parseInt(idSerie) || data.results[i].genre_ids[1] === parseInt(idSerie)) {
            total+=1
            titulos_genero.innerHTML= `<a href="./genero.html"> Género ${seccion}</a>`;
            peliculas_de_genero.innerText= `Peliculas de ${seccion}`;   
            if (total<5) {
                let dato = data.results[i].title;
                peliculas += `<div class="peliculasvaloradas">
                    <a href="../PI_grupo_2_Chicas/detallePelicula.html?idPersonaje=${data.results[i].id}&seccion=valoradas">            
                    <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="imagen"></img>
                    <h3 class="titulospelicula" >${data.results[i].title}</h3>
                    <p class="tituloestreno">Fecha de estreno: ${data.results[i].release_date}</p>
                    <a/>
                    </div>`
            }else if (i===0) {
                titulos_genero.innerHTML= `<a href="./genero.html"> ERROR, el genero no existe</a>`;
            } i;
        }
    }
   
    padreValoradas.innerHTML = peliculas;
    return data;
})
.catch(function (error) {
    console.log(`El error es ${error}`); 
    return error;
});
