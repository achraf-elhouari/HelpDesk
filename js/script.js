const titreProbleme = document.getElementById('probleme-titre');
const selectCategorie = document.getElementById('categorie-choix');
const selectPropriete = document.getElementById('propriete-choix');
const problemeDescription = document.getElementById('probleme-description');
const ajoutBtn = document.getElementById('ajout-btn');
const cardList = document.getElementById('cards');
const formulaire = document.getElementById('formulaire');
const formMessage = document.getElementById('form-message');
const demandeTotal = document.getElementById('nombre-demande');
let modificationEnCours = false;

let demandList = [
    { id: 1, titre: "Connexion Wi-Fi instable", categorie: "Réseau", propriete: "Haute", description: "Le réseau se déconnecte régulièrement." },
    { id: 2, titre: "Installation d’un logiciel", categorie: "Logiciel", propriete: "Normale", description: "Installation d’un logiciel de bureautique." },
    { id: 3, titre: "Clavier défectueux", categorie: "Matériel", propriete: "Basse", description: "Certaines touches ne fonctionnent plus." }
];

function cardIndexing(){
    return demandList.length + 1;
}

function demandeLength(){
    const total = cardList.children.length;
    if (total == 1 || total == 0)
        demandeTotal.textContent = total + " demande";
    else
        demandeTotal.textContent = total + " demandes";
}  

function addElement(balise, className, content){
    let element = document.createElement(balise);
    if (className)
        element.className = className;
    if (content)
        element.textContent = content;
    return element;
}

function indexNumber(id){
    if (id < 10)
        return "HD-00" + id;
    if (id < 100)
        return "HD-0" + id;
    return "HD-" + id;
}

function deleteCard(id){
    const placeholderList = [];
    for (let i = 0; i < demandList.length; i++){
        if (id != demandList[i].id)
            placeholderList.push(demandList[i]);
    }
    demandList = placeholderList;
}

function updateIndexing(id){
    for (let i = 0; i < demandList.length; i++ ){
        if (demandList[i].id > id)
            demandList[i].id -= 1;
    }
}

function createCard(demande){
    const card = addElement("div", "bg-white p-3 rounded-xl pt-4");
    const cardHeader = addElement("div", "flex justify-between");
    let cssDesign;
    let icon;
    if (demande.categorie === "Réseau"){
        cssDesign = "bg-[#EAF0F9] text-[#587397] text-3xl w-9 h-9 rounded-xl flex justify-center items-center";
        icon = "⌁";
    }
    else if (demande.categorie === "Logiciel"){
        cssDesign = "bg-[#F1EAF9] text-[#587397] text-xl w-9 h-9 rounded-xl flex justify-center items-center";
        icon = "▣";
    }
    else {
        cssDesign = "bg-[#E9F5F1] text-[#587397] text-xl w-9 h-9 rounded-xl flex justify-center items-center";
        icon = "⌨";
    }
    const cardIcon = addElement("p", cssDesign, icon);
    const cardIndex = addElement("p", "", indexNumber(demande.id));
    cardHeader.append(cardIcon, cardIndex);
    card.append(cardHeader);
        const cardMainSection = addElement("div");
    const cardProblemTitle = addElement("h3", "text-xl mt-4", demande.titre);
    const cardProblemDescription = addElement("p", "text-[#8792A1] mb-6", demande.description);
    let proprieteColor;
    if (demande.propriete === "Haute")
        proprieteColor = "text-[#BA6444] bg-[#FFF0E8]";
    else if (demande.propriete === "Normale")
        proprieteColor = "text-[#A67A2B] bg-[#FFF5DF]";
    else
        proprieteColor = "text-[#388867] bg-[#E8F6EE]";
    const cardProprieteCategorie = addElement("div", "grid grid-cols-2 mt-3.5 mb-3.5");
    const cardCategorie = addElement("p", "flex justify-center items-center text-[#64748B] bg-[#F0F3F7] w-fit p-3 rounded-2xl", demande.categorie);
    const cardPropriete = addElement("p", proprieteColor + " flex justify-center items-center w-fit p-3 rounded-2xl", demande.propriete);
    cardProprieteCategorie.append(cardCategorie, cardPropriete);
    const lineSeperator = addElement("div", "w-full h-0.5 border-2 border-[#EDF0F3]");
    const cardBtns = addElement("div", "flex justify-end gap-6 mt-4 mb-2");
    const cardModifier = addElement("button", "text-[#617084] bg-transparent font-bold", "✎ Modifier");
    const cardDeleter = addElement("button", "text-[#CC626A] bg-transparent font-bold", "♜ Supprimer");

    cardModifier.addEventListener('click', function(){
        cardModifier.addEventListener('click', function(){
        titreProbleme.value = demande.titre;
        problemeDescription.value = demande.description;
        selectCategorie.value = demande.categorie;
        selectPropriete.value = demande.propriete;
        modificationEnCours = true;
        ajoutBtn.textContent = "✎ Enregistrer les modifications";
        formulaire.scrollIntoView({ behavior: 'smooth', block: 'start' });
        titreProbleme.focus();
    });
    });
    cardDeleter.addEventListener('click', function(){
        if (confirm("Voulez-vous vraiment supprimer cette demande ?")){
            deleteCard(demande.id);
            updateIndexing(demande.id)
            showCards();
        }
    });

    cardBtns.append(cardModifier, cardDeleter);
    cardMainSection.append(cardProblemTitle, cardProblemDescription, cardProprieteCategorie, lineSeperator, cardBtns);
    card.append(cardMainSection);

    
    return card;
}

function quitterModification(){
    modificationEnCours = false;
    ajoutBtn.textContent = "＋  Ajouter la demande";
    formulaire.reset();
}

function showCards(){
    cardList.textContent = "";
    for (let i = 0; i < demandList.length; i++)
        cardList.append(createCard(demandList[i]));
    demandeLength();
}


formulaire.addEventListener('submit', function(event){
    event.preventDefault();
    if (!titreProbleme.value.trim() || !problemeDescription.value.trim() || !selectCategorie.value || !selectPropriete.value){
        formMessage.className = "text-[red] font-bold md:col-span-2";
        formMessage.textContent = "Tous les champs sont obligatoires.";
        return;
    }
    if (modificationEnCours !== null){
        modificationEnCours.titre = titreProbleme.value.trim();
        modificationEnCours.description = problemeDescription.value.trim();
        modificationEnCours.categorie = selectCategorie.value;
        modificationEnCours.propriete = selectPropriete.value;
        formMessage.textContent = "Demande modifiée avec succès.";
    }
    else {
        const demande = {
            id: cardIndexing(),
            titre: titreProbleme.value.trim(),
            categorie: selectCategorie.value,
            propriete: selectPropriete.value,
            description: problemeDescription.value.trim()
        };
        demandList.push(demande);
        formMessage.textContent = "Demande ajoutée avec succès.";
    }
    showCards();
    formMessage.className = "text-[green] font-bold md:col-span-2";
    quitterModification();
});

showCards();
