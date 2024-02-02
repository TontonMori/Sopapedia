//Fond d'écran aléatoire parmis une liste
function imgset() {
    var randomImage = new Array();
		randomImage[0] = "res/bg/en-pop-gallery1.jpg";
		randomImage[1] = "res/bg/en-pop-gallery2.jpg";
		randomImage[2] = "res/bg/en-pop-gallery3.jpg";
		randomImage[3] = "res/bg/en-pop-gallery4.jpg";
		randomImage[4] = "res/bg/en-pop-gallery5.jpg";
		randomImage[5] = "res/bg/en-pop-gallery6.jpg";
		randomImage[6] = "res/bg/en-pop-gallery7.jpg";
		randomImage[7] = "res/bg/en-pop-gallery8.jpg";
		randomImage[8] = "res/bg/en-pop-gallery9.jpg";
		randomImage[9] = "res/bg/en-pop-gallery10.jpg";
		randomImage[10] = "res/bg/en-pop-gallery11.jpg";
		randomImage[11] = "res/bg/en-pop-gallery12.jpg";
		randomImage[12] = "res/bg/en-pop-gallery13.jpg";
		randomImage[13] = "res/bg/en-pop-gallery14.jpg";
    var number = Math.floor(Math.random() * randomImage.length);
    return randomImage[number];
}

//Génération de la barre de navigation
document.addEventListener("DOMContentLoaded", function () {
    var navbar = document.createElement("div");
    navbar.classList.add("navbar");

    var menuButton = document.createElement("a");
        menuButton.href = "javascript:void(0);";
        menuButton.style.fontSize = "15px";
        menuButton.classList.add("icon");
        menuButton.innerHTML = "&#9776;";
        menuButton.onclick = responsiveNavbar;
        navbar.appendChild(menuButton);

    var links = [
        { text: "Accueil", href: "index.html" },
        { text: "Moripedia", href: "moripedia.html" },
        { text: "Discord", href: "https://discord.gg/KPNFdQcfbe" },
    ];

    for (var i = 0; i < links.length; i++) {
        var link = document.createElement("a");
        link.textContent = links[i].text;
        link.href = links[i].href;
        navbar.appendChild(link);
    }

    var dropdowns = [
        {
            text: "Serviteurs ▼",
            items: [
				{ text: "La création d'une équipe", href: "equipe.html" },
				{ text: "Les rôles", href: "roles.html" },
				{ text: "Équipement et artefacts", href: "equipement.html" },
				{ text: "Potentiels", href: "potentiels.html" },
				{ text: "Combos et marques", href: "combo.html" },
				{ text: "Transcendance, éveil et lien", href: "transcendance.html" },
            ]
        },

        {
            text: "Modes de jeu ▼",
            items: [
				{ text: "Terrain d'exploration", href: "exploration.html" },
				{ text: "Donjon d'évènement", href: "event.html" },
				{ text: "Guerre de guildes", href: "guildes.html" },
				{ text: "Invasion de boss", href: "invasion.html" },
				{ text: "Fleuve corrompu", href: "fleuve.html" },
				{ text: "Abaddon et tour du tourment", href: "tour.html" },
				{ text: "Terrain de purification", href: "purification.html" },
				{ text: "Raid mondial et raid de guilde", href: "raid.html" },
				{ text: "Raid de groupe", href: "groupe.html" },
				{ text: "Donjons d'équipement", href: "donjon.html" },
				{ text: "Donjons d'éveil", href: "hall.html" },
				{ text: "JcJ Infini, combat mondial", href: "jcj.html" },
				{ text: "Donjons secrets", href: "sd.html" },
            ]
        },

		{
            text: "Meta ▼",
            items: [
                { text: "Bien débuter", href: "debutant.html" },
				{ text: "Buffs et debuffs", href: "mods.html" },
				{ text: "Combinaisons et fusions", href: "fusion.html" },
				{ text: "Effet de collection", href: "ce.html" },
				{ text: "Ressources et farm", href: "ressources.html" },
				{ text: "Confection", href: "confection.html" },
				{ text: "Boutique", href: "boutique.html" },
            ]
        },
    ];

    for (var i = 0; i < dropdowns.length; i++) {
        var dropdownContainer = document.createElement("div");
        dropdownContainer.classList.add("dropdown");

        var dropdownButton = document.createElement("button");
        dropdownButton.classList.add("dropbtn");
        dropdownButton.textContent = dropdowns[i].text;

        var dropdownContent = document.createElement("div");
        dropdownContent.classList.add("dropdown-content");

        for (var j = 0; j < dropdowns[i].items.length; j++) {
            var itemLink = document.createElement("a");
            itemLink.textContent = dropdowns[i].items[j].text;
            itemLink.href = dropdowns[i].items[j].href;
            dropdownContent.appendChild(itemLink);
        }

        dropdownContainer.appendChild(dropdownButton);
        dropdownContainer.appendChild(dropdownContent);
        navbar.appendChild(dropdownContainer);
    }

    var supportLink = document.createElement("a");
    supportLink.textContent = "Support";
    supportLink.href = "https://customer.withhive.com/com2usholdings/faq/game/577";
    navbar.appendChild(supportLink);

    var navbarContainer = document.getElementById("navbar");
    navbarContainer.appendChild(navbar);
});

function responsiveNavbar() {
    var x = document.getElementById("navbar");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
}

//Ouverture d'une galerie d'images
function openModal(img) {
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");
  modal.style.display = "block";
  modalImg.src = img.src;
}

//Fermeture d'une galerie d'images
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}