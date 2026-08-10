const mapNomToValeurI = {};

let cellB4 = null, cellD4 = null;
let cellB8 = null, cellD8 = null;
let cellC10 = null, cellC12 = null;
let cellB12 = null, cellD12 = null;
let cellB14 = null, cellC14 = null, cellD14 = null;
let cellC16 = null;
let cellB18 = null, cellD18 = null;
let cellC22 = null;

let inputB14 = null, inputC14 = null, inputD14 = null;
let selectB4 = null, selectD4 = null;

function mettreAJourCouleursCellules() {
    const cellulesCalcul = [cellB8, cellD8, cellB12, cellD12, cellC10, cellC12, cellC16, cellB18, cellD18, cellC22];
    cellulesCalcul.forEach(cell => {
        if (!cell) return;
        if (cell.children.length > 0) return;
        if (cell.innerText.trim() === "") {
            cell.style.backgroundColor = "#2e7d32";
            cell.style.color = "#ffffff";
        } else {
            cell.style.backgroundColor = "#ffffff";
            cell.style.color = "#000000";
        }
    });
}

function remiseAZero() {
    if (selectB4) selectB4.selectedIndex = 0;
    if (selectD4) selectD4.selectedIndex = 0;
            
    if (inputB14) inputB14.value = "0";
    if (inputC14) inputC14.value = "0";
    if (inputD14) inputD14.value = "0";

    if (cellB8) cellB8.innerText = "";
    if (cellD8) cellD8.innerText = "";
    if (cellB12) cellB12.innerText = "";
    if (cellD12) cellD12.innerText = "";

    if (cellC10) cellC10.innerText = "";

    if (cellC16) cellC16.innerText = "";
    if (cellB18) cellB18.innerText = "0";
    if (cellD18) cellD18.innerText = "0";
    if (cellC22) cellC22.innerText = "";

    mettreAJourCouleursCellules();
}

function creerMenuDeroulant(cellule, listeNoms, selectId) {
    if (!cellule) return null;
    const valActuelle = cellule.innerText.trim();
    let select = document.createElement('select');
    select.style.width = "100%";
    select.style.padding = "5px";
    select.style.fontWeight = "bold";
    select.style.backgroundColor = "#ffff99";
    if (selectId) select.id = selectId;
                            
    listeNoms.forEach(nom => {
        let option = document.createElement('option');
        option.value = nom;
        option.text = nom;
        if (nom === valActuelle) option.selected = true;
        select.appendChild(option);
    });
                                                    
    cellule.innerHTML = '';
    cellule.appendChild(select);
    cellule.style.backgroundColor = "#2e7d32";
    return select;
}
            
function creerChampSaisie(cellule, inputId, valeurParDefaut = "0") {
    if (!cellule) return null;
    let valActuelle = cellule.innerText.trim();
    if (valActuelle === "" || valActuelle === "NaN") {
        valActuelle = valeurParDefaut;
    }
                    
    let input = document.createElement('input');
    input.type = "text";
    input.value = parseInt(valActuelle, 10) || valeurParDefaut;
    input.style.width = "90%";
    input.style.padding = "5px";
    input.style.textAlign = "center";
    input.style.fontWeight = "bold";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "4px";
    input.style.backgroundColor = "#ffff99";
    if (inputId) input.id = inputId;
                                        
    input.addEventListener('focus', function() { this.select(); });
    input.addEventListener('blur', function() {
        if (this.value.trim() === "" || isNaN(parseInt(this.value, 10))) {
            this.value = "0";
        } else {
            this.value = parseInt(this.value, 10).toString();
        }
    });
                                    
    cellule.innerHTML = '';
    cellule.appendChild(input);
    cellule.style.backgroundColor = "#2e7d32";
    return input;
}
            
document.addEventListener("DOMContentLoaded", function() {
    const table = document.querySelector('.excel-table');
    if (!table) return;
        
    const rows = table.querySelectorAll('tbody tr');
    let listeNoms = ["-- Sélectionner un nom --"];
            
    rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 8) {
            const nom = cells[6].innerText.trim();
            let valeurI = cells[8].innerText.trim();
            
            if (valeurI !== "" && !isNaN(parseFloat(valeurI))) {
                valeurI = parseInt(parseFloat(valeurI), 10).toString();
                cells[8].innerText = valeurI;
            }
                                                             
            if (nom !== "" && !nom.startsWith("--") && nom !== "NOM" && nom !== "LIAISON") {
                if (!listeNoms.includes(nom)) listeNoms.push(nom);
                mapNomToValeurI[nom] = valeurI;
            }
        }
    });

    if (rows.length >= 21) {
        cellB4  = rows[3].querySelectorAll('td')[1];  
        cellD4  = rows[3].querySelectorAll('td')[3];  

        cellB8  = rows[6].querySelectorAll('td')[1];  
        cellD8  = rows[6].querySelectorAll('td')[3];  

        cellC10 = rows[8].querySelectorAll('td')[2];  
        cellC12 = rows[10].querySelectorAll('td')[2]; 

        cellB12 = rows[10].querySelectorAll('td')[1]; 
        cellD12 = rows[10].querySelectorAll('td')[3]; 

        cellB14 = rows[12].querySelectorAll('td')[1]; 
        cellC14 = rows[12].querySelectorAll('td')[2]; 
        cellD14 = rows[12].querySelectorAll('td')[3]; 

        cellC16 = rows[14].querySelectorAll('td')[2]; 

        cellB18 = rows[16].querySelectorAll('td')[1]; 
        cellD18 = rows[16].querySelectorAll('td')[3]; 

        cellC22 = rows[20].querySelectorAll('td')[2]; 
    }

    selectB4 = creerMenuDeroulant(cellB4, listeNoms, "select_B4");
    selectD4 = creerMenuDeroulant(cellD4, listeNoms, "select_D4");

    inputB14 = creerChampSaisie(cellB14, "input_B14", "0");
    inputC14 = creerChampSaisie(cellC14, "input_C14", "0");
    inputD14 = creerChampSaisie(cellD14, "input_D14", "0");

    const calculerC10 = function() {
        if (!cellC10) return;
        const valB8 = cellB8 ? cellB8.innerText.trim() : "";
        const valD8 = cellD8 ? cellD8.innerText.trim() : "";
                                                
        if (valB8 === "" && valD8 === "") {
            cellC10.innerText = "";
        } else if (valB8 !== "" && valD8 !== "" && valB8 === valD8) {
            cellC10.innerText = "PARTIE EN 30 REPRISES";
        } else {
            cellC10.innerText = "PARTIE PAR CATEGORIE";
        }
    };
                                                                        
    const calculerC16 = function() {
        if (!cellC16) return;
        const valB8 = cellB8 ? cellB8.innerText.trim() : "";
        const valD8 = cellD8 ? cellD8.innerText.trim() : "";
                                                
        if (valB8 !== "" && valD8 !== "" && valB8 !== valD8) {
            cellC16.innerText = "ECART AVEC LA CATEGORIE";
        } else {
            cellC16.innerText = "";
        }
    };
                                                                        
    const calculerB18 = function() {
        if (!cellB18) return 0;
        const valB14 = parseInt(inputB14 ? inputB14.value : 0, 10) || 0;
        const valB8  = parseInt(cellB8 ? cellB8.innerText : 0, 10) || 0;
        const resultat = valB14 - valB8;
        cellB18.innerText = isNaN(resultat) ? "0" : resultat.toString();
        return resultat;
    };
                                                                                                
    const calculerD18 = function() {
        if (!cellD18) return 0;
        const valD14 = parseInt(inputD14 ? inputD14.value : 0, 10) || 0;
        const valD8  = parseInt(cellD8 ? cellD8.innerText : 0, 10) || 0;
        const resultat = valD14 - valD8;
        cellD18.innerText = isNaN(resultat) ? "0" : resultat.toString();
        return resultat;
    };
                                                                                                
    const calculerC22 = function() {
        if (!cellC22) return;
        const valB8  = parseInt(cellB8 ? cellB8.innerText : 0, 10) || 0;
        const valD8  = parseInt(cellD8 ? cellD8.innerText : 0, 10) || 0;
        const valC14 = parseInt(inputC14 ? inputC14.value : 0, 10) || 0;

        // Si les joueurs ne sont pas sélectionnés ou si C14 est égal à 0, C22 reste vide
        if ((valB8 === 0 && valD8 === 0) || valC14 === 0) {
            cellC22.innerText = "";
            return;
        }
                                
        const valB14 = parseInt(inputB14 ? inputB14.value : 0, 10) || 0;
        const valD14 = parseInt(inputD14 ? inputD14.value : 0, 10) || 0;
                                
        const valB18 = parseInt(cellB18 ? cellB18.innerText : 0, 10) || 0;
        const valD18 = parseInt(cellD18 ? cellD18.innerText : 0, 10) || 0;
                    
        const nomB12 = cellB12 ? cellB12.innerText.trim() : "";
        const nomD12 = cellD12 ? cellD12.innerText.trim() : "";
                    
        let resultat = "";
        
        if (valB8 === valD8 && valC14 === 30) {
            if (valB14 > valD14) {
                resultat = nomB12;
            } else if (valD14 > valB14) {
                resultat = nomD12;
            } else {
                resultat = "EGALITE";
            }
        } else {
            if (valB18 > valD18) {
                resultat = nomB12;
            } else if (valD18 > valB18) {
                resultat = nomD12;
            } else {
                resultat = "EGALITE";
            }
        }
                                                                                                                                                                                                        [...]
        cellC22.innerText = resultat;
    };
                
    window.recalculerToutGlobal = function() {
        calculerC10();
        calculerC16();
        calculerB18();
        calculerD18();
        calculerC22();
        mettreAJourCouleursCellules();
    };
                                                                                                 
    if (inputB14) inputB14.addEventListener('input', window.recalculerToutGlobal);
    if (inputC14) inputC14.addEventListener('input', window.recalculerToutGlobal);
    if (inputD14) inputD14.addEventListener('input', window.recalculerToutGlobal);
                            
    if (selectB4) {
        const majB4 = function() {
            const choisi = selectB4.value;
            const estValide = (choisi && !choisi.startsWith("--"));
                                                         
            if (cellB8) cellB8.innerText = estValide && mapNomToValeurI[choisi] !== undefined ? mapNomToValeurI[choisi] : "";
            if (cellB12) cellB12.innerText = estValide ? choisi : "";
            window.recalculerToutGlobal();
        };
        selectB4.addEventListener('change', majB4);
        majB4();
    }
                                                                                                                                                                                
    if (selectD4) {
        const majD4 = function() {
            const choisi = selectD4.value;
            const estValide = (choisi && !choisi.startsWith("--"));
                                                         
            if (cellD8) cellD8.innerText = estValide && mapNomToValeurI[choisi] !== undefined ? mapNomToValeurI[choisi] : "";
            if (cellD12) cellD12.innerText = estValide ? choisi : "";
            window.recalculerToutGlobal();
        };
        selectD4.addEventListener('change', majD4);
        majD4();
    }
});
