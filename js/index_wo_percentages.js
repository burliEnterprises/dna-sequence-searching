 $("#search-button").click(function (event) {
     event.preventDefault();
     $('form').fadeOut(500);
     $('#checkbox_list').fadeOut(500);
     $('.wrapper').addClass('form-success');
     /**************** top: css stuff, bottom variablen stuff *****/
     var full = document.getElementById('full').value;
     full = full.toUpperCase();
     var part = document.getElementById('part').value;
     part = part.toUpperCase();
     var search_length = full.length - part.length;
     console.log("full len - part len: " + search_length.toString())
     var finish = false;
     var positionen = [];
     var positionen_anzahl = 0;
     /* ************code******************************************/
     if (part.length == 1) { // suche nach zeichen statt zeichenfolge
         for (i = 0; i < search_length; i++) {
             if (full[i] == part[0]) {
                 finish = true;
                 positionen[positionen_anzahl] = i; // die positionen des gesuchten zeichens im string in array 
                 positionen_anzahl++; // index + anzahl-> danach hochgezaehlt 
             }
         };
         var text = full;
         console.log("full sequence: " + text);
         console.log("positionen zu ueberschreiben: " + positionen);
         for (i = positionen_anzahl - 1; i >= 0; i--) { // bei der letzten position im array anfangen -> sonst probleme beim zweiten substring -> index aendert sich nach großem einschub
             text = text.substr(0, positionen[i]) + '<b class="fett">' + part + '</b>' + text.substr(positionen[i] + 1);
             console.log(text);
         };
         $('#headline').html(text);
     }
     else { // suche nach zeichenfolge statt zeichen
                    console.log(search_length);
         for (i = 0; i <= search_length; i++) {
             if (full[i] == part[0]) {     // wenn erstes zeichen gleich...
                 for (j = 1; j < part.length; j++) { //... prüfen ob auch die nachfolgenen zeichen gleich sind wie die gesuchten
                     if (full[i + j] == part[j]) {
                         finish = true;
                     }
                     else {
                         finish = false;
                         break;     // nicht gleich -> die schleife abbrechen
                     }
                 };
                 if (finish == true) {
                     positionen[positionen_anzahl] = i;     // position im suchstring des ersten buchstaben in array
                     positionen_anzahl++;
                 }
             }
             /* mit nur dem ersten ergebnis:
             $('#headline').text(full.toString());
              var xy = $('#headline');
              xy.html(xy.text().replace(part, '<b class="fett">' + part + '</b>'));
              break;
              */
         };
         var text = full;
         console.log("full sequence: " + text);
         console.log("positionen zu ueberschreiben: " + positionen);
         for (i = positionen_anzahl - 1; i >= 0; i--) { // bei der letzten position im array anfangen -> sonst probleme beim zweiten substring -> index aendert sich nach großem einschub
             text = text.substr(0, positionen[i]) + '<b class="fett">' + part + '</b>' + text.substr(positionen[i] + part.length);
             console.log(text);
         };
         $('#headline').html(text);
         if (positionen_anzahl > 0) {       // wenn vorkommen, finish true, sonst unten tzdem ausgabe des fehlercodes
             finish = true;
         };
         
         
     }
     if (finish == false) { // falls gar nichts gefunden
         $('#headline').text("No matching found :(");
     }
 });
 /* ********************* random funktion ********************************/
 function setCharAt(str, index, chr) { // string an position durch anderen buchstaben ersetzen
     if (index > str.length - 1) return str;
     return str.substr(0, index) + chr + str.substr(index + 1);
 };
 $('#random_box').change(function () { // random folge createn
     if ($(this).is(":checked")) {
         var reihe = "ATCCGATATTCCGTCGAACTGATCCTCATC"; // default string
         for (i = 0; i < reihe.length; i++) {
             var ziffer = Math.floor((Math.random() * 4) + 1);
             switch (ziffer) { // random 1-4 erstellen, steht jeweils für char, ersetzt dann default char
             case 1:
                 reihe = setCharAt(reihe, i, 'A');
                 break;
             case 2:
                 reihe = setCharAt(reihe, i, 'C');
                 break;
             case 3:
                 reihe = setCharAt(reihe, i, 'T');
                 break;
             case 4:
                 reihe = setCharAt(reihe, i, 'G');
                 break;
             };
         };
         //alert(reihe);  
         $('#full').attr('value', reihe); // schreiben in input
     };
     //else 'unchecked' event code
 });