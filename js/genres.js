let geneross = `https://api.themoviedb.org/3/genre/movie/list?api_key=42737f60c529bfe7e9586db8cb132a1c`;
let generosSeries = `https://api.themoviedb.org/3/genre/tv/list?api_key=42737f60c529bfe7e9586db8cb132a1c`;

// hicimos dos fetch para peliculas, y otros dos para series, con el fin de seguir teniendo la misma cantidad que antes. 
let generoPelis = document.querySelector(".cadaGenero");// 5 generos para peliculas de la derecha, es decir, para el primer div
let generoSegunda = document.querySelector("#segunda"); // 5 generos para peliculas de la izquierda, para el segundo div de peliculas

let generoSeries1 = document.querySelector("#ser"); // 5 generos para series para el primer div,el de la izquierda
let generoSeries2 = document.querySelector("#ser2"); // 5 generos para series para el segundo div, los de la derecha


/* Primer listado de generos para peliculas  */
fetch(geneross)
.then(function (response) {
    return response.json();
    //console.log (response)
})
.then(function (data) {
    console.log(data)
    let generos = ""
    for (let i = 0; i < 5; i++) { 
        let dato = data.genres[i].name;
        generos += `<li class="GeneroPeliculas"> <a href="./detalleGenero.html?idGenero=${data.genres[0].id}&seccion=${data.genres[0].name}"> ${dato} </a></li>`
    }
   
    generoPelis.innerHTML = generos;
    return data;
    
})
.catch(function (error) {
    console.log(`El error es ${error}`); 
     return error;
    
})
/* Segundo listado de generos para peliculas  (hice otro fetch para seguir teniendo la misma cantidad que antes)*/
fetch(geneross)
.then(function (response) {
    return response.json();
    //console.log (response)
})
.then(function (data) {
    console.log(data)
    let gene2 = ""
    for (let i = 5; i < 10; i++) { 
        let dato = data.genres[i].name;
        gene2 += `<li class="GeneroPeliculas"> <a href="./detalleGenero.html"> ${dato} </a></li>`
    }
   
    generoSegunda.innerHTML = gene2;
    return data;
    
})
.catch(function (error) {
    console.log(`El error es ${error}`); 
     return error;
    
})

/* Primer fetch para generos de series */ 
fetch(generosSeries)
.then(function (response) {
    return response.json();
    //console.log (response)
})
.then(function (data) {
    console.log(data)
    let geneSer = ""
    for (let i = 0; i < 5; i++) { 
        let dato = data.genres[i].name;
        geneSer += `<li class="GeneroPeliculas"> <a href="./detalleGenero.html"> ${dato} </a></li>`
    }
   
    generoSeries1.innerHTML = geneSer;
    return data;
    
})
.catch(function (error) {
    console.log(`El error es ${error}`); 
     return error;
    
})


/* Segundo fetch para los otros cinco generos de series */
fetch(generosSeries)
.then(function (response) {
    return response.json();
    //console.log (response)
})
.then(function (data) {
    console.log(data)
    let geneSer2 = ""
    for (let i = 5; i < 10; i++) { 
        let dato = data.genres[i].name;
        geneSer2 += `<li class="GeneroPeliculas"> <a href="./detalleGenero.html"> ${dato} </a></li>`
    }
   
    generoSeries2.innerHTML = geneSer2;
    return data;
    
})
.catch(function (error) {
    console.log(`El error es ${error}`); 
     return error;
    
})



