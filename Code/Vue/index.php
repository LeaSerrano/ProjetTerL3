<!DOCTYPE html>
<html lang="fr">
    <head>
    
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="image/x-icon" href="../../Ressources/EDF3.png">
        <link rel="stylesheet" href="index.css">
        <script src="index.js"></script>
        <script src="../Controleur/algoFermetureAttribut.js"></script>
        <script src="../Controleur/algoCouvertureMinimale.js"></script>
        <script src="../Controleur/algoSynthese.js"></script>
        <script src="../Controleur/FN2.js"></script>
        <script src="../Controleur/FN3.js"></script>
        <script src="../Controleur/Chase.js"></script>
        <script src="../Controleur/Graphe.js"></script>
        <script src="../Library/lodash.js"></script>
        <script src="https://d3js.org/d3.v4.min.js"></script>

        <title>Enquêtes sur Dépendances Fonctionnelles</title>

        <div class="header">
                <img id="logo" src="../../Ressources/EDF3.png" width= 100px height=90px></img>
                <h1>Enquêtes sur Dépendances Fonctionnelles</h1><!--<h6> un outil à but éducatif pour les grands et les petits</h6>-->
                <img id="logo2" src="https://i0.wp.com/ingenieurs-ecologues.com/wp-content/uploads/2020/11/logos-UMontpellier-FdS.png?resize=250%2C120&is-pending-load=1" width= 180px height=90px ></img>
        </div> 

    </head>

    <body>

        <?php 
            include("menu.html");
        ?> 

        <?php 
            include("accueil.html");
        ?> 

        <?php 
            include("zoneDF.php");
        ?> 

        <?php 
            include("couvertureMinimale.html");
        ?> 
        
        <?php 
            include("fermetureAttributs.html");
        ?>

        <?php 
            include("algorithmeSynthese.html");
        ?>

        <?php 
            include("formesNormales.html");
        ?>

        <?php 
            include("algorithmeChase.html");
        ?>

        <?php 
            include("aPropos.html");
        ?>

        <script src="fonctionMenu.js"></script>
        <script src="fonctionOnglets.js"></script>

        <!--<footer><h6><a href='https://www.freepik.com/vectors/online-background'>Online background vector created by rawpixel.com - www.freepik.com</a></h6></footer>-->

    </body>
</html>
