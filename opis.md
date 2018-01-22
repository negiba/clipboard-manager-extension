#Clipboard Manager Extension

__Opis__
 
    Ekstenzija treba da čuva korisničke kopije obeleženog teksta (bilo koja strana na webu) u local storage same
    ekstenzije, kao i da ih prikazuje u popupu. Čuvanje kopije vršimo shortcutom (ctrl+alt+Z) ili odabirom opcije
    "Save to CBManager" nakon desnog klika. Popup se poziva klikom na ikonu ekstenzije ili shortcutom na tastaturi
    (ctrl+shift+Z). Maksimalno treba da prikaže 10 kopija po strani. Lepljenje kopije na željana mesta možemo izvršiti
    na poziv određenog shortcutu na tastaturi (ctrl+1, ctrl+2 itd) ili klikom na kopiju iz popupa.

__Struktura__

    Struktura i način rada ekstenzije (šta je potrebno od fajlova, dozvole, slike, itd) napisana je u fajlu
    "manifest.json". "Manifest.json je fajl koji je osnova ekstenzije, služi da poveže foldere i fajlove potrebne za
    rad ektstenzije, kao i da uračuna potrebne dozvole. Kada napišemo početnu strukturu ekstenzije, možemo krenuti sa
    kreiranjem opisane strukture. Za "Clipboard Manager" potrebno je da imamo sledeću strukturu:
    - root folder
      manifest.json
      - background
        background.js
      - popup
        popup.html
        popup.css
        popup.js
      - content
        content.js
      - icons
        clipboard-32.png
        clipboard-48.png        
    
__Background__
    
    Background skripte su dugoročne skripte, što znači da "žive" od trenutka instaliranja ektenzije do njenog
    deinstaliranja. Njihov zadatak je da obrađuju zahteve. U našoj ekstenziji ima zadatak da pozove content skriptu
    nakon određeneog događaja (ukoliko se na stranici obeleži tekst a zatim odabere opcija "Save to CBManager" nakon
    desnog klika ili shortcutom ctrl+shift+Z) koja će vratiti obeleženi tekst korisnika. Dobijeni tekst čuva se u 
    local storage. 

__Content__
    
    Content skripte služe za manipulaciju sa trenutnom stranicom. U našem slučaju, content skripta je pozvana nakon
    tačno određenih događaja, a nakon toga radi dalju obradu. Ukoliko je pozvana od strane background skripte, vratiće
    joj selektovan tekst (kopija) korisnika. Ukoliko je pozvala popup skripta, u tom slučaju ima zadatak da prosleđeni
    tekst nalepi na željeno mesto.
        
__Popup__

    Popup je prozor koji se prikazuje/ne prikazuje klikom na ikonu ekstenzije ili shortcutom. Sadrži html, css i
    potrebne skript fajlove. Html fajl je stranica u kojoj ćemo prikazivati sadržaj iz storage ekstenzije, kao i
    dodatne opcije za kreiranje, uređivanje, brisanje. Css fajl sadrži potrebne stilove, dok skripte sadrže svu
    potrebnu funkcionalnost popupa. Skripte u našem slučaju komuniciraju i sa content i sa background skriptom. Od
    background skripte dobijamo sadržaj storage, a takođe i vraćamo joj novi sadržaj ukoliko ima izmena (kreiranje,
    brisanje, uređivanje). Komunikacija sa content skriptom je jednosmerna, što znači da joj popup skripta šalje
    izabranu opciju iz sadržaja (text) koji content skripta dalje obrađuje.
        
__Metode__
    
* Background

        waitForUserToSaveSelectedText
        callContentScript
        getTextFromContentScript
        saveToLocalStorage
        getFromLocalStorage

* Content
        
        getUserSelectedText
        sendTextToBackgroundScript
        getTextFromPopupScript
        pasteText
        
* Popup
        
        getStorageFromBackgroundScript
        transformStorageToListOfItems
        showListOfItems
        editItem
        deleteItem
        createItem        
        packItemsForSaving
        sendPackedItemsToBackground
        sendSelectedCopyToContentScript
        
__TODO__

* Popup

        - prepraviti metodu transformStorageToListOfItems da vrati niz tekstova dobijenih iz storage
        - uraditi metodu showListOfItems koja prikazuje u popupu niz iz metode transformStorageToListOfItems
        - uraditi metodu editItem koja treba da omogući korisniku da menja izabrani tekst iz popupa
        - uraditi metodu deleteItem koja treba da omogući korisniku da obriše izabrani tekst iz popupa
        - uraditi metodu createItem koja treba da omogući korisniku da kreira kopiju sa željenim tekstom
        - uraditi metodu packItemsForSaving koja treba da spakuje sve kopije u potreban format
        - uraditi metodu sendPackedItemsToBackground koja treba da spakovane kopije pošalje background skripti na čuvanje
        - uraditi metodu sendSelectedCopyToContentScript koja treba da pošalje tekst koji korisnik želi da nalepi

* Content

        - uraditi metodu getTextFromPopupScript koja treba da izvuče tekst koji je izabran od strane korisnika u prozoru popupa
        - uraditi metodu pasteText koja treba da nalepi izvučeni tekst na željeno mesto
        
* Background

        - prepraviti metodu saveToLocalStorage ili napisati dodatnu metodu koja bi prihvatala spakovan niz koji je
        dobijen iz popup skripte a zatim sačuvala u local storage