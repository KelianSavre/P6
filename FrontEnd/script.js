const reponseworks = await fetch("http://localhost:5678/api/works")
const works = await reponseworks.json()

console.log(works)
console.log(window.sessionStorage.getItem("tokenSophieBluel01"))

let userIsLoggedIn
/*Definit si l'utilisateur est connecté ou non en regardant si la valeur du token est differente de null */
if(window.sessionStorage.getItem("tokenSophieBluel01")!= null){
    userIsLoggedIn=true
}else{
    userIsLoggedIn=false
}

console.log(userIsLoggedIn)
/*Declaration des elements pour les boutons filtres et ajout des classes */
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

const modaleSuppressionProjet= document.getElementById("modale_Suppression")
const modaleAjoutProjet=document.getElementById("modale_Ajout")

const boutonsFermetureModale=document.querySelectorAll(".modale_Fermeture")
const stoppeursPropagationModale=document.querySelectorAll(".modale_Stop")

const openModal = function(e){
    e.preventDefault()
    modal = document.querySelector(".modale")
    modal.style.display = "flex"
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", closeModal)
    
    
    for (let n = 0; n < boutonsFermetureModale.length; n++){
        boutonsFermetureModale[n].addEventListener("click", closeModal)
    }
    for(let x = 0; x < stoppeursPropagationModale.length; x++){
        stoppeursPropagationModale[x].addEventListener("click", stopPropagation)
    }

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
        for (let n = 0; n < boutonsFermetureModale.length; n++){
            boutonsFermetureModale[n].removeEventListener("click", closeModal)
        }
        for(let x = 0; x < stoppeursPropagationModale.length; x++){
            stoppeursPropagationModale[x].removeEventListener("click", stopPropagation)
        }

        modal=null
        modaleSuppressionProjet.style.display="flex"
        modaleAjoutProjet.style.display="none"
    }
}

const stopPropagation = function(e){
    e.stopPropagation()
}
/*Affichage des projets dans la modale et du bouton suppression et sa fonctionnalité*/
const affichageEtSuppressionworks = function(works){
    for (let i = 0; i < works.length; i++){
        
        const figureModale = document.createElement("figure")
        const GallerieModale = document.querySelector(".modale_Gallerie")
        const worksModale = document.createElement("img")
        const DivSuppression= document.createElement("div")
        const IconeCorbeille = document.createElement("i")
        IconeCorbeille.classList.add("fa-solid", "fa-trash-can")
        DivSuppression.classList.add("bouton_suppression-modale")
        worksModale.src = works[i].imageUrl
        worksModale.alt = works[i].title
       
        figureModale.appendChild(worksModale)
        DivSuppression.appendChild(IconeCorbeille)
        figureModale.appendChild(DivSuppression)

        GallerieModale.appendChild(figureModale)
        
        DivSuppression.addEventListener("click",async function(event){
            
            event.preventDefault()
            event.stopPropagation()
            const IDSuppression = works[i].id
            console.log(IDSuppression)
            let Token= window.sessionStorage.getItem("tokenSophieBluel01")

            await fetch(`http://localhost:5678/api/works/${IDSuppression}`,{
                method:"DELETE",
                headers:{
                    accept:"*/*",
                    Authorization: `Bearer ${Token}`,
                    
                }
            }).then (function(response){
                if(response.status>=200 && response.status<300){
                    return false
                    
                    
                }else{
                    alert("Echec de la suppression du projet")
                }
            })

        })
        

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
    /*Suppression du token au click sur le logout et rechargement de la page */
    LienLoginLogout.addEventListener("click", function(){
        window.sessionStorage.removeItem("tokenSophieBluel01")
        document.location.href="index.html"
    })
    /*Event Listener pour ouverture modale sur la div*/
    divModificationProjet.addEventListener("click", openModal)

    /*Appel de la fonction d'affichage des element et de suppression des projets dans la modale */
    affichageEtSuppressionworks(works)
    /*Ajout du bouton pour acceder a la seconde modale et fonctionnement */
    const boutonChangementModale = document.createElement("button")
    boutonChangementModale.classList.add("bouton_actif")
    boutonChangementModale.innerText="Ajouter une photo"
    
    
    modaleSuppressionProjet.appendChild(boutonChangementModale)

    boutonChangementModale.addEventListener("click", function(event){
        event.preventDefault()
        event.stopPropagation()
        modaleSuppressionProjet.style.display="none"
        modaleAjoutProjet.style.display="flex"
    })

    const boutonRetourModalePrecedente=document.querySelector(".modale_Retour")
    boutonRetourModalePrecedente.addEventListener("click",function(event){
        event.preventDefault()
        event.stopPropagation()
        modaleSuppressionProjet.style.display="flex"
        modaleAjoutProjet.style.display="none"
    })

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