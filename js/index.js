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
     var count = 0;
     var vollst_gefunden = false; // zwei nachtraeglich eingefuegt, unnoetig(?)
     // für oercentages:
     var right_ones = 0;
     var index_right_ones = 0;
     var buffer_right_ones = 0;
     var buffer_index = 0;
     var percentage_right = 0;
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
             count = 0;
             if (full[i] == part[0]) { // wenn erstes zeichen gleich...
                 for (j = 1; j < part.length; j++) { //... prüfen ob auch die nachfolgenen zeichen gleich sind wie die gesuchten
                     if (full[i + j] == part[j]) {
                         finish = true;
                         count++;       // zählt hoch auf maximal richtig, gibt dann unten den bool auf true
                     }
                     else {
                         finish = false;
                         break; // nicht gleich -> die schleife abbrechen
                     }
                 };
                 if (finish == true) {
                     positionen[positionen_anzahl] = i; // position im suchstring des ersten buchstaben in array
                     positionen_anzahl++;
                 };
                 if ((count + 1) == part.length) {
                     vollst_gefunden = true; // wenn einmal alle gefunden, passt
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
         if (vollst_gefunden == true) {
             for (i = positionen_anzahl - 1; i >= 0; i--) { // bei der letzten position im array anfangen -> sonst probleme beim zweiten substring -> index aendert sich nach großem einschub
                 text = text.substr(0, positionen[i]) + '<b class="fett">' + part + '</b>' + text.substr(positionen[i] + part.length);
                 console.log(text);
             };
             $('#headline').html(text);
         }
         // ab hier: prozente, wenn keine vollständige übereinstimmung
         else if (finish == false) { // falls gar nichts gefunden
             for (i = 0; i <= search_length; i++) {
                 buffer_right_ones = 0;
                 for (j = 0; j < part.length; j++) { //... prüfen ob auch die  zeichen gleich sind wie die gesuchten
                     if (full[i + j] == part[j]) {
                         buffer_right_ones++;       // wenn gleich, hochzählen, nachher prüfung ob maximalwert der gleichen erreicht #1
                         buffer_index = i;          // anfangsindex, wenn maximal dann nachher dazuzählen #2
                     }
                 };
                 if (buffer_right_ones > right_ones) {  // ad #1
                     right_ones = buffer_right_ones;
                     index_right_ones = buffer_index;   // ad #2
                     percentage_right = right_ones / part.length * 100;
                 };
             };
             text = full;
             text = text.substr(0, index_right_ones) + '<b class="fett">';
             console.log(text);
             for (i = 0; i < part.length; i++) {        // fügt text hinzu, holt genaue position der falschen -> farbanzeige durch class
                 if (part[i] == full[index_right_ones+i]) {
                     text += part[i];
                 } else {
                     var text_span = '<span class="rot_faerben"></span>';
                     text += '<span class="rot_faerben">' + part[i] + '</span>';
                 }
                  console.log(text);
             };
             text += '</b>' + full.substr(index_right_ones, full.length) + '</br>' + percentage_right + " % Überschneidung";
              console.log(text);
             $('#headline').html(text);
         }
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