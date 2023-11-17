let titulos_genero =document.querySelector(".titulos_genero");
let peliculas_de_genero= document.querySelector(".Titulos");
let qs = location.search;
let qsObj = new URLSearchParams (qs);
let idSerie = qsObj.get ("idGenero");
let seccion = qsObj.get("seccion");
let es = qsObj.get("es");
let apiKey = '42737f60c529bfe7e9586db8cb132a1c';
let padreValoradas = document.querySelector (".padreValoradas");
let url = "";
titulos_genero.innerHTML= `<a href="./genero.html"> Género: ${seccion}</a>`;

if (es === 'Pelicula') {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${idSerie}`;
    peliculas_de_genero.innerText= `Peliculas de ${seccion}`; 
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data); 
        let peliculas = "";
        for (let i = 0; i < 4; i++) {  
            peliculas += `<div class="peliculasvaloradas padreValoradas">
                <a href="../PI_grupo_2_Chicas/detallePelicula.html?idPersonaje=${data.results[i].id}&seccion=valoradas&es=Pelicula">            
                <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="imagen"></img>
                <h3 class="titulospelicula" >${data.results[i].title}</h3>
                <p class="tituloestreno">Fecha de estreno: ${data.results[i].release_date}</p>
                <a/>
                </div>`;
            }
            if (peliculas==="") {
                peliculas_de_genero.innerText= `No se encontraron resultados para su busqueda`; 
            }
            padreValoradas.innerHTML = peliculas;
            return data;
        }   
    )

    .catch(function (error) {
        console.log(`El error es ${error}`); 
        return error;
    });
} else if (es === 'Serie') {
    url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${idSerie}`;
    peliculas_de_genero.innerText= `Series de ${seccion}`; 
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data); 
        let peliculas = "";
        for (let i = 0; i < 4; i++) {  
            peliculas +=  `<div class="peliculasvaloradas padreValoradas">
            <a href="../PI_grupo_2_Chicas/detalleSerie.html?idSerie=${data.results[i].id}&seccion=seriesPopulares">            
            <img class="imagen" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="imagen"></img>
            <h3 class="titulospelicula" >${data.results[i].name}</h3>
            <p class="tituloestreno">Fecha de estreno: ${data.results[i].first_air_date}</p>
            <a/>
            </div>`;
            }
            if (peliculas==="") {
                peliculas_de_genero.innerText= `No se encontraron resultados para su busqueda`; 
            }
            padreValoradas.innerHTML = peliculas;
            return data;
        }   
    )

    .catch(function (error) {
        console.log(`El error es ${error}`); 
        return error;
    });
    
};
 

