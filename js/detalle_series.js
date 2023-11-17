let qs1 = location.search;
let qsObjj = new URLSearchParams (qs1);
let idSerie = qsObjj.get ("idSerie");
let seccion = qsObjj.get("seccion");
let apiKey1 = '42737f60c529bfe7e9586db8cb132a1c';
let recomendadas = document.querySelector(".sugerido");
let apiUrl = `https://api.themoviedb.org/3/tv/${idSerie}?api_key=${apiKey1}`;
  
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
        detalle2 = `<p class="Estreno">Fecha de estreno: ${data.first_air_date}</p>
        <p>Rating: ${data.vote_average}</p>
        <div class="btns">
            <p>Géneros:</p>
            <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html?idGenero=${data.genres[0].id}&seccion=${data.genres[0].name}&es=Serie"> ${data.genres[0].name} </a></li>
            <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html?idGenero=${data.genres[1].id}&seccion=${data.genres[1].name}&es=Serie"> ${data.genres[1].name} </a></li>
        </div>`;
    } else if (cantidad_generos=1) {
        detalle2 = `<p class="Estreno">Fecha de estreno: ${data.first_air_date}</p>
        <p>Rating: ${data.vote_average}</p>
        <div class="btns">
            <p>Géneros:</p>
            <li class="GeneroPeliculasDetalle"> <a href="./detalleGenero.html?idGenero=${data.genres[0].id}&seccion=${data.genres[0].name}&es=Serie"> ${data.genres[0].name} </a></li>
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
let movieId = urlParams.get('idSerie');
console.log('ID de la serie:', movieId);

let button = document.querySelector(".verRecomendaciones") 
let change = document.querySelector(".padreValoradas1")
let divPeliculasRecomendadas = document.querySelector(".peliculasRecomendadas");
let pelis_recomendadas = `https://api.themoviedb.org/3/tv/${movieId}/recommendations?api_key=${apiKey1}&language=en-US&page=1`;


button.addEventListener("click", function(){
    change.style.display="flex";
    fetch(pelis_recomendadas)
    .then(function (response) {
    return response.json();
 })
    .then(function (data) {
        console.log(data); 
        let peliculas = "";
        for (let i = 0; i < 4; i++) { 
            let dato = data.results[i].name;
            peliculas += ` 
            <div class=" padreValoradas peliculasRecomendadas">
            <a href="../PI_grupo_2_Chicas/detallePelicula.html?idPersonaje=${data.results[i].id}&seccion=valoradas&es=Pelicula">            
            <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="imagen"></img>
            <h3 class="titulospelicula" >${dato}</h3>
            <p class="tituloestreno">Fecha de estreno: ${data.results[i].first_air_date}</p>
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
const reviewsUrl = `https://api.themoviedb.org/3/tv/${movieId}/reviews?api_key=${apiKey1}&language=en-US&page=1`;
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


   
    // TRAILERS 

fetch(`https://api.themoviedb.org/3/tv/${idSerie}/videos?api_key=${apiKey1}`)
.then(response => response.json())
.then(data => {
  if (data.results && data.results.length > 0) {
    // aca estoy buscando los resultados para obtener solo los videos de YouTube
    const videosYouTube = data.results.filter(video => video.site.toLowerCase() === 'youtube');
    if (videosYouTube.length > 0) {
      const primerVideo = videosYouTube[0];
      const videoId = primerVideo.key;
      const videoURL = `https://www.youtube.com/embed/${videoId}`;

     
      const videoFrame = document.querySelector('.videoFrame');
      videoFrame.src = videoURL;

      //aca oculto el mensaje de "No hay trailers disponibles" si los hubo
      const mensajeNoTrailers = document.querySelector('.NoTrailers');
      mensajeNoTrailers.style.display = 'none';
    } else {
      // si no hubo trailer, q me oculte el contenedor del video
      const videoFrame = document.querySelector('.videoFrame');
      videoFrame.style.display = 'none';

      // ahora si, q me muestre el mensaje de "No hay trailers disponibles"
      const mensajeNoTrailers = document.querySelector('.NoTrailers');
      mensajeNoTrailers.style.display = 'block';
    }
  } else {
    // sino q me oculte el contenedor del video
    const videoFrame = document.querySelector('.videoFrame');
    videoFrame.style.display = 'none';

    // y q me muestre el el mensaje de "No hay trailers disponibles"
    const mensajeNoTrailers = document.querySelector('.NoTrailers');
    mensajeNoTrailers.style.display = 'block';
  }
})
.catch(error => {
  console.error('Error al obtener videos:', error);
});
