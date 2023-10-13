const reponseworks = await fetch("http://localhost:5678/api/works")
const works = await reponseworks.json()

console.log(works)
console.log(window.sessionStorage.getItem("token"))

let userIsLoggedIn

if(window.sessionStorage.getItem("tokenSophieBluel01")!= null){
    userIsLoggedIn=true
}else{
    userIsLoggedIn=false
}

console.log(userIsLoggedIn)
/*Declaration des elements pour les boutons filtres */
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

/*Fonction affichage des images sur la page principale */

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

/*Fonctions de gestion de la modale*/
let modal = null

const openModal = function(e){
    e.preventDefault()
    modal = document.querySelector(".modale_Suppression")
    modal.style.display = "flex"
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", closeModal)
    document.querySelector(".modale_Fermeture").addEventListener("click", closeModal)
    document.querySelector(".modale_Stop").addEventListener("click", stopPropagation)
}

const closeModal = function(e){
    if (modal === null){
        return
    }else{
        e.preventDefault()
        modal.style.display="none"
        modal.setAttribute("aria-hidden", "true")
        modal.removeAttribute("aria-modal")
        modal.removeEventListener("click", closeModal)
        document.querySelector(".modale_Fermeture").removeEventListener("click", closeModal)
        document.querySelector(".modale_Stop").removeEventListener("click", stopPropagation)
        modal=null
    }
}

const stopPropagation = function(e){
    e.stopPropagation()
}

const affichageEtSuppressionworks = function(works){
    for (let i = 0; i < works.length; i++){
        const GallerieModale = document.querySelector(".modale_Gallerie")
        const worksPhoto = document.createElement("img")
        worksPhoto.src = works[i].imageUrl
        worksPhoto.alt = works[i].title
        
        GallerieModale.appendChild(worksPhoto)
        

        

    }
}

/*Declaration des elements utilises pour le mode edition */
const divHeader = document.getElementById("header_div")
const divProjets = document.querySelector(".Projets")
const iconeEdition = document.createElement("i")
const iconeEdition2 = document.createElement("i")
const texteHeader = document.createElement("p")
const divModificationProjet = document.createElement("div")
const texteProjets = document.createElement("p")
const LienLoginLogout=document.getElementById("Login_Logout")

/*Gestion de l'affichage selon si l'utilisateur est connecte ou non */
if (userIsLoggedIn === true){
    filtresPhoto.innerHTML = ""

    divHeader.classList.remove("display_none")
    divHeader.classList.add("header-edition")
    iconeEdition.classList.add("fa-regular", "fa-pen-to-square")
    iconeEdition2.classList.add("fa-regular", "fa-pen-to-square")
    texteHeader.innerText="Mode édition"
    texteProjets.innerText="modifier"

    divHeader.appendChild(iconeEdition)
    divHeader.appendChild(texteHeader)

    divProjets.appendChild(divModificationProjet)
    divModificationProjet.appendChild(iconeEdition2)
    divModificationProjet.appendChild(texteProjets)

    LienLoginLogout.href=""
    LienLoginLogout.innerText="logout"
    
    LienLoginLogout.addEventListener("click", function(){
        window.sessionStorage.removeItem("tokenSophieBluel01")
        document.location.href="index.html"
    })
    /*Event Listener pour ouverture modale*/
    divModificationProjet.addEventListener("click", openModal)

    affichageEtSuppressionworks(works)
}else{
    filtresPhoto.appendChild(boutonFiltresTous)
    filtresPhoto.appendChild(boutonFiltresObjets)
    filtresPhoto.appendChild(boutonFiltresAppartements)
    filtresPhoto.appendChild(boutonFiltresHotel)
}

/*Fonctionnalite des boutons filtres */

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