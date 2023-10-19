<div class="ZoneDF" style="display:none;">            
    <div class="DonneesFormulaire" >
        <div id="PartieGauche">
            <div class="Boutons">
                <button id="bouton01" class="styleBouton" onclick="clickOngletDF('Gauche01','Gauche02','Gauche03')"><p class="texteBouton">Dépendances</p><p class="texteBouton">Fonctionnelles</p></button>
                <button id="bouton02" class="styleBouton" onclick="clickOngletCouvMin('Gauche01','Gauche02','Gauche03')"><p class="texteBouton">Couverture</p><p class="texteBouton">Minimale</p></button>
                <button id="bouton03" class="styleBouton" onclick="clickOngletRelation('Gauche01','Gauche02','Gauche03')"><p class="texteBouton2">Relations</p></button>
            </div>
            <div class="texteAffichageAttributs"><p id="ZoneTxt0"></p></div>
            <div id=atom></div>
                <div id="Gauche01" style="display:block;">
                    <p class=Reduce id="AffichageDF"></p>
                </div>

                <div id="Gauche02" style="display:none;">
                    <p class=Reduce id="CouvMin1"></p>
                </div>
                <div id="Gauche03" style="display:none;">
                    <p class=Reduce id="Relation1"></p>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="affichageGraphe1" name="affichageGraphe1" onclick="afficherGraphe(affichageGraphe1.checked,'FormulaireCheckBox1')">
                    <label for="affichageGraphe1">Graphe optimisé des dépendances fonctionnelles</label>
                    <div id="FormulaireCheckBox1" ></div>
                </div>
        </div>
        
        <div id="PartieDroiteFormulaire">
                <div id="interact">
                    <div id="PetitTitre">
                        <h4>Ajouter les DF ici : </h4>
                    </div> 
                    <div id="formAddDF">
                       <button title="Actualisation" onclick="enregistrerlesDF()"  ><img src="../../Ressources/Rafraichissement2.png" height =25px width=25px  /></button>
                        <button title="Exporter mes DF" id="myBtn2" onclick="Download()"><img src="../../Ressources/Export2.png" height =20px width=20px  /></button>
                         <label title="Importer mes DF" for="a2" style="cursor:help;">
                            <img title="Importer mes DF" src="../../Ressources/Import2.png" height= 20px width= 20px style="pointer-events: none"/>
                        </label>
                       <input title="Importer mes DF" id='a2' type="file" onchange="Traitement()">
                    </div>
                </div>
                    <div id="alerteRafraichissement"></div>
                        <div id="formulaire">
                             <?php 
                                include("formulaire.html");
                            ?>
                        </div>
                    <pre id="file"></pre>          
                   <p id="confLect"></p>
                    <p id="lecture"></p>
                
            </div>
        </div>
    </div>
</div>