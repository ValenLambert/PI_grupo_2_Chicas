
let qs1 = location.search;
let qsObjj = new URLSearchParams (qs1);
let idPersonaje = qsObjj.get ("idPersonaje");
let seccion = qsObjj.get("seccion");
let apiKey1 = '42737f60c529bfe7e9586db8cb132a1c';
let apiUrl = '';
let recomendadas = document.querySelector(".sugerido");
if (seccion === 'valoradas') {
    apiUrl = `https://api.themoviedb.org/3/movie/${idPersonaje}?api_key=${apiKey1}`;
} else if (seccion === 'masVisto') {
    apiUrl = `https://api.themoviedb.org/3/movie/${idPersonaje}?api_key=${apiKey1}`;
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
            <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html?idGenero=${data.genres[0].id}&seccion=${data.genres[0].name}&es=Pelicula"> ${data.genres[0].name} </a></li>
            <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html?idGenero=${data.genres[1].id}&seccion=${data.genres[1].name}&es=Pelicula"> ${data.genres[1].name} </a></li>
        </div>`;
    } else if (cantidad_generos=1) {
        detalle2 = `<p class="Estreno">Fecha de estreno: ${data.first_air_date}</p>
        <p>Rating: ${data.vote_average}</p>
        <p>Duración: ${data.runtime} minutos</p>
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

// creo boton de ver recomendaciones para peliculas 
const urlParams = new URLSearchParams(window.location.search);
let movieId = urlParams.get('idPersonaje');
console.log('ID de la película:', movieId);

let button = document.querySelector(".verRecomendaciones") 
let change = document.querySelector(".padreValoradas1")
let divPeliculasRecomendadas = document.querySelector(".peliculasRecomendadas");
let pelis_recomendadas = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey1}&language=en-US&page=1`;


button.addEventListener("click", function(){
    change.style.display="flex";
    fetch(pelis_recomendadas)
    .then(function (response) {
    console.log(response)
    return response.json();
 })
    .then(function (data) {
        console.log(data); 
        let peliculas = "";
        for (let i = 0; i < 4; i++) { 
            let dato = data.results[i].title;
            peliculas += ` 
            <div class=" padreValoradas peliculasRecomendadas">
            <a href="../PI_grupo_2_Chicas/detallePelicula.html?idPersonaje=${data.results[i].id}&seccion=valoradas&es=Pelicula">            
            <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="imagen"></img>
            <h3 class="titulospelicula" >${dato}</h3>
            <p class="tituloestreno">Fecha de estreno: ${data.results[i].release_date}</p>
            </a>
            </div>`;
                
     }
     change.innerHTML =peliculas;
     return data;
 })
 .catch(function (error) {
     console.log(`El error es ${error}`); 
     return error;
 });

});

// BOTON DE REVIEWS 
const reviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey1}&language=en-US&page=1`;
const comentarios = document.querySelector(".comentarios"); 

const comentariosAdicionalesContainer = document.querySelector(".comentariosAdicionales");
const leerMasComentariosButton = document.querySelector(".leerMasComentarios");

let comentariosIniciales = 1;

fetch(reviewsUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        if (data.results && data.results.length > 0) {
    
            let comentariosHTML = "<h2>Comentarios de Usuarios</h2>";
            const primerComentario = data.results[0];
            comentariosHTML += `
                <div class="comentario">
                    <p><strong>Autor:</strong> ${primerComentario.author}</p>
                    <p><strong>Comentario:</strong> ${primerComentario.content}</p>
                </div>`;

            comentarios.innerHTML = comentariosHTML;

            if (data.results.length > 1) {
                leerMasComentariosButton.style.display = 'block';

                // Configura el evento de clic para cargar más comentarios
                leerMasComentariosButton.addEventListener('click', function () {
                    // Construye el HTML para mostrar comentarios adicionales
                    let comentariosAdicionalesHTML = '';
                    for (let i = 1; i < data.results.length; i++) {
                        const review = data.results[i];
                        comentariosAdicionalesHTML += `
                            <div class="comentario">
                                <p><strong>Autor:</strong> ${review.author}</p>
                                <p><strong>Comentario:</strong> ${review.content}</p>
                            </div>`;
                    }
                    // Agrega el HTML al contenedor de comentarios adicionales
                    comentariosAdicionalesContainer.innerHTML = comentariosAdicionalesHTML;
                });
            }
        } else {
            comentarios.innerHTML = '<p>No hay comentarios disponibles.</p>';
        }
        return data;
    })
    .catch(error => {
        console.error(`Error al obtener comentarios: ${error}`);
    });

/*Boton favoritos extra*/
const btn = document.querySelector(".btn");
let peliculasEnFavorito = []; 

btn.addEventListener("click", function(e){
    if (btn.innerText === "Agregar a favoritos") {
        btn.style.backgroundColor = "#102032";
        btn.innerText = "Sacar de favoritos";
        peliculasEnFavorito.push(idPersonaje);
    } else {
        btn.style.backgroundColor = "white";
        btn.style.color = "black";
        btn.innerText = "Agregar a favoritos";
        peliculasEnFavorito = peliculasEnFavorito.filter(id => id !== idPersonaje);
    }
})

let favoritas = document.querySelector("#favoritas");
console.log(peliculasEnFavorito);

for (let i = 0; i < peliculasEnFavorito.length; i++) {
    urlFav = `https://api.themoviedb.org/3/movie/${peliculasEnFavorito[i]}?api_key=${apiKey1}`;
    fetch(urlFav)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data); 
        let peliculasFavs = "";
        for (let i = 0; i < 4; i++) { 
            let dato = data.results.title;
            peliculasFavs += `<div class="peliculasvaloradas">
                <a href="../PI_grupo_2_Chicas/detallePelicula.html?idPersonaje=${data.results.id}&seccion=valoradas">            
                <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data.results.poster_path}" class="imagen"></img>
                <h3 class="titulospelicula" >${dato}</h3>
                <p class="tituloestreno">Fecha de estreno: ${data.results.release_date}</p>
                <a/>
                </div>`;
        }
        favoritas.innerHTML = peliculasFavs;
        return data;
    })
    .catch(function (error) {
        console.log(`El error es ${error}`); 
        return error;
    });
    
}



