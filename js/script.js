const titreProbleme = document.getElementById('probleme-titre');
const problemeCategorie = document.getElementById('categorie-choix');
const proprieteCategorie = document.getElementById('propriete-choix');
const problemeDescription = document.getElementById('probleme-description');
const ajoutBtn = document.getElementById('ajout-btn');
const cardList = document.getElementById('cards');
const formulaire = document.getElementById('formulaire');
const formMessage = document.getElementById('form-message');
const demandeTotal = document.getElementById('nombre-demande');
let index = 0;

function cardIndexing(){
    return index++;
}

const demandeCard = {
    id: demandeList.length,
    probleme: titreProbleme.value,
    categorie: problemeCategorie.value,
    propriete: proprieteCategorie.value,
    description: problemeDescription.value
}
demandeList.push(demandeCard)
    

function demandeLength(){
    const total = cardList.children.length;
    if (total == 1 || total == 0)
        demandeTotal.textContent = total + " demande";
    else
        demandeTotal.textContent = total + " demandes";
}  

function createElement(balise, className, contenue){
    let element = document.createElement(balise);
    if (className)
        element.className = className;
    if (contenue)
        element.textContent = contenue;
    return element;
}

 

function addCards(demande){
    const card = createElement("div", "bg-white p-3 rounded-xl pt-4");
    const cardHeader = createElement("div", "flex justify-between");
    let cssDesign;
    let icon;
    if (problemeCategorie.value === "Réseau"){
        cssDesign = "bg-[#EAF0F9] text-[#587397] text-3xl w-9 h-9 rounded-xl flex justify-center items-center";
        icon = "⌁";
    }
    else if (problemeCategorie.value === "Logiciel"){
        cssDesign = "bg-[#F1EAF9] text-[#587397] text-xl w-9 h-9 rounded-xl flex justify-center items-center";
        icon = "▣";
    }
    else {
        cssDesign = "bg-[#E9F5F1] text-[#587397] text-xl w-9 h-9 rounded-xl flex justify-center items-center";
        icon = "⌨";
    }
    const cardIcon = createElement("p", cssDesign, icon);
    const cardIndex = createElement("p", "", "HD-" + String(cardIndexing()).padStart(3, "0"));
    cardHeader.append(cardIcon, cardIndex);
    const cardMainSection = createElement("div")
    const cardProblemTitle = createElement("h3", "text-xl mt-4", titreProbleme.value);
    const cardProblemDescription = createElement("p", "text-[#8792A1] mb-6", problemeDescription.value);
    let proprieteColor;
    if (proprieteCategorie.value === "Haute")
        proprieteColor = "text-[#BA6444] bg-[#FFF0E8]"
    else if (proprieteCategorie.value ===    "Normale")
        proprieteColor = "text-[#A67A2B] bg-[#FFF5DF]"
    else 
        proprieteColor = "text-[#388867] bg-[#E8F6EE]"
    const cardProprieteCategorie = createElement("div", "grid grid-cols-2 mt-3.5 mb-3.5");
    const cardCategorie = createElement("p", "flex justify-center items-center text-[#64748B] bg-[#F0F3F7] w-fit p-3 rounded-2xl", problemeCategorie.value);
    const cardPropriete = createElement("p", proprieteColor + " flex justify-center items-center w-fit p-3 rounded-2xl", proprieteCategorie.value);
    cardProprieteCategorie.append(cardCategorie, cardPropriete);
    const lineSeperator = createElement("div", "w-full h-0.5 border-2 border-[#EDF0F3]");
    const cardBtns = createElement("div", "flex justify-end gap-6 mt-4 mb-2")
    const cardModifier = createElement("button", "text-[#617084] bg-transparent font-bold", "✎ Modifier");
    cardModifier.addEventListener('click', function(){
        const scrollToForm = document.getElementById('formulaire');
        scrollToForm.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        const newTitre = document.getElementById('probleme-titre');
        const newCategorie = document.getElementById('categorie-choix');
        const newPropriete = document.getElementById('propriete-choix');
        const newDescription = document.getElementById('probleme-description');
        const ajoutBtn = document.getElementById('ajout-btn');

        ajoutBtn.textContent = "Modifier la demande";

        if (newTitre.value)
            cardProblemTitle.textContent = newTitre.textContent;
        if (newCategorie.value)
            cardCategorie.textContent = newCategorie.textContent;
        if (newPropriete.value)
            cardPropriete.textContent = newPropriete.textContent;
        if (newDescription.value)
            cardProblemDescription.textContent = newDescription.textContent;
        return;
    })
    const cardDeleter = createElement("button", "text-[#CC626A] bg-transparent font-bold", "♜ Supprimer");
    cardDeleter.addEventListener('click', function(){
        if (confirm("Voulez-vous vraiment supprimer cette demande ?")){
            card.remove();
            demandeLength();
        }
    })
    cardBtns.append(cardModifier, cardDeleter);
    cardMainSection.append(cardProblemTitle);
    cardMainSection.append(cardProblemDescription);
    cardMainSection.append(cardProprieteCategorie);
    cardMainSection.append(lineSeperator);
    cardMainSection.append(cardBtns);

    card.append(cardHeader, cardMainSection);
    demandeCard.id = cardIndexing()
    console.log(demandeCard.id);
    return (card);    
}

formulaire.addEventListener('submit', function(event){
    event.preventDefault();
    if (!titreProbleme.value.trim() || !problemeDescription.value.trim() || !problemeCategorie.value || !proprieteCategorie.value){
        formMessage.className = "text-[#CC626A] font-bold md:col-span-2";
        formMessage.textContent = "Tous les champs sont obligatoires.";
        return;
    }
    cardList.append(addCards());
    demandeLength();
    formMessage.className = "text-[#388867] font-bold md:col-span-2";
    formMessage.textContent = "Demande ajoutée avec succès.";
    formulaire.reset();
})

demandeLength();