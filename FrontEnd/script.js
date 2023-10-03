const reponseworks = await fetch("http://localhost:5678/api/works")
const works = await reponseworks.json()

console.log(works)
let userIsLoggedIn = false

function affichageworks(works){
    for (let i = 0; i < works.length; i++){
        
        const figurePhoto = document.createElement("figure")
        const titrePhoto = document.createElement("figcaption")
        const worksPhoto = document.createElement("img")
        worksPhoto.src = works[i].imageUrl
        worksPhoto.alt = works[i].title
        titrePhoto.innerText = works[i].title
        figurePhoto.appendChild(worksPhoto)
        figurePhoto.appendChild(titrePhoto)

        const galleryPhoto = document.querySelector(".gallery")
        galleryPhoto.appendChild(figurePhoto)

    }
}

affichageworks(works)
const filtresPhoto = document.querySelector(".filtres")

const boutonFiltresTous = document.createElement("button")
boutonFiltresTous.classList.add("filtres_Tous", "bouton_inactif")
boutonFiltresTous.innerText = "Tous"

const boutonFiltresObjets = document.createElement("button")
boutonFiltresObjets.classList.add("filtres_Objets", "bouton_inactif")
boutonFiltresObjets.innerText = "Objets"

const boutonFiltresAppartements = document.createElement("button")
boutonFiltresAppartements.classList.add("filtres_Appartements", "bouton_inactif")
boutonFiltresAppartements.innerText = "Appartements"

const boutonFiltresHotel = document.createElement("button")
boutonFiltresHotel.classList.add("filtres_Hotel", "bouton_inactif")
boutonFiltresHotel.innerText = "Hôtel & restaurants"


if (userIsLoggedIn === true){
    filtresPhoto.innerHTML = ""
}else{
    filtresPhoto.appendChild(boutonFiltresTous)
    filtresPhoto.appendChild(boutonFiltresObjets)
    filtresPhoto.appendChild(boutonFiltresAppartements)
    filtresPhoto.appendChild(boutonFiltresHotel)
}

boutonFiltresTous.addEventListener("click", function(){
    boutonFiltresTous.classList.add("bouton_actif")
    boutonFiltresAppartements.classList.remove("bouton_actif")
    boutonFiltresObjets.classList.remove("bouton_actif")
    boutonFiltresHotel.classList.remove("bouton_actif")
    document.querySelector(".gallery").innerHTML=""
    affichageworks(works)

})

boutonFiltresObjets.addEventListener("click", function(){
    boutonFiltresObjets.classList.add("bouton_actif")
    boutonFiltresAppartements.classList.remove("bouton_actif")
    boutonFiltresTous.classList.remove("bouton_actif")
    boutonFiltresHotel.classList.remove("bouton_actif")
    
    const worksObjets = works.filter(function (works){
        return works.categoryId === 1
    })
    
    document.querySelector(".gallery").innerHTML=""
    affichageworks(worksObjets)

})

boutonFiltresAppartements.addEventListener("click", function(){
    boutonFiltresAppartements.classList.add("bouton_actif")
    boutonFiltresObjets.classList.remove("bouton_actif")
    boutonFiltresTous.classList.remove("bouton_actif")
    boutonFiltresHotel.classList.remove("bouton_actif")
    
    const worksAppartements = works.filter(function (works){
        return works.categoryId === 2
    })
    
    document.querySelector(".gallery").innerHTML=""
    affichageworks(worksAppartements)

})

boutonFiltresHotel.addEventListener("click", function(){
    boutonFiltresHotel.classList.add("bouton_actif")
    boutonFiltresAppartements.classList.remove("bouton_actif")
    boutonFiltresTous.classList.remove("bouton_actif")
    boutonFiltresObjets.classList.remove("bouton_actif")
    
    const worksHotel = works.filter(function (works){
        return works.categoryId === 3
    })
    
    document.querySelector(".gallery").innerHTML=""
    affichageworks(worksHotel)

})