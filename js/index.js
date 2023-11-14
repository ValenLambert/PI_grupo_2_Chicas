
let pelis_valoradas = `https://api.themoviedb.org/3/movie/top_rated?api_key=42737f60c529bfe7e9586db8cb132a1c`;

let pelisMasVisto = `https://api.themoviedb.org/3/movie/popular?api_key=42737f60c529bfe7e9586db8cb132a1c`;

let seriesPopulares = `https://api.themoviedb.org/3/tv/popular?api_key=42737f60c529bfe7e9586db8cb132a1c`;


let peliculasValor = document.querySelector (".padreValoradas");
let peliculasVistas = document.querySelector ("#segunda");
let seriesPopu = document.querySelector ("#tercera");
let serValor = document.querySelector ("#cuarta")

 /*Fetch peliculas*/
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
             <a href="../PI_grupo_2_Chicas/detallePelicula.html">
             <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="imagen"></img>
             <h3 class="titulospelicula" >${dato}</h3>
             <p class="tituloestreno">Fecha de estreno: ${data.results[i].release_date}</p>
             <a/>
             </div>`;
     }
    
     peliculasValor.innerHTML = peliculas;
     return data;
 })
 .catch(function (error) {
     console.log(`El error es ${error}`); 
     return error;
 });



 fetch(pelisMasVisto)
 .then(function (response) {
     return response.json();
 })
 .then(function (data) {
     console.log(data); 
     let peliculas2 = "";
     for (let i = 0; i < 4; i++) { 
         let dato2 = data.results[i].title;
         peliculas2 += `<div class="peliculasvaloradas">
             <a href="../PI_grupo_2_Chicas/detallePelicula.html">
             <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="imagen"></img>
             <h3 class="titulospelicula" >${dato2}</h3>
             <p class="tituloestreno">Fecha de estreno: ${data.results[i].release_date}</p>
             <a/>
             </div>`;
     }
    
     peliculasVistas.innerHTML = peliculas2;
     return data;
 })
 .catch(function (error) {
     console.log(`El error es ${error}`); 
     return error;
 });

 /*Fetch Series*/
 fetch(seriesPopulares)
 .then(function (response) {
     return response.json();
 })
 .then(function (data) {
     console.log(data); 
     let peliculas3 = "";
     for (let i = 0; i < 4; i++) { 
         let dato3 = data.results[i].name;
         peliculas3 += `<div class="peliculasvaloradas">
             <a href="../PI_grupo_2_Chicas/detallePelicula.html">
             <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="imagen"></img>
             <h3 class="titulospelicula" >${dato3}</h3>
             <p class="tituloestreno">Fecha de estreno: ${data.results[i].release_date}</p>
             <a/>
             </div>`;
     }
    
     seriesPopu.innerHTML = peliculas3;
     return data;
 })
 .catch(function (error) {
     console.log(`El error es ${error}`); 
     return error;
 });

