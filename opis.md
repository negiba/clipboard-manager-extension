#Clipboard Manager Extension

__Opis__
 
    Ekstenzija treba da čuva korisničke kopije obeleženog teksta (bilo koja strana na webu) u local storage same
    ekstenzije, kao i da ih prikazuje u popupu. Čuvanje kopije vršimo shortcutom (ctrl+alt+U) ili odabirom opcije
    "Save to Clipboard Manager" nakon desnog klika. Popup se poziva klikom na ikonu ekstenzije ili shortcutom na tastaturi
    (ctrl+shift+Y). Lepljenje kopije na željana mesta možemo izvršiti klikom na kopiju iz popupa.

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
        copyContent.js
      - icons
        clipboard-32.png
        clipboard-48.png
        add.png
        delete.png
        edit.png
        logo.png        
    
__Background__
    
    Background skripte su dugoročne skripte, što znači da "žive" od trenutka instaliranja ektenzije do njenog
    deinstaliranja. Njihov zadatak je da obrađuju zahteve. U našoj ekstenziji ima zadatak da pozove content skriptu
    nakon određeneog događaja (ukoliko se na stranici obeleži tekst a zatim odabere opcija "Save to CBManager" nakon
    desnog klika ili shortcutom ctrl+shift+Y) koja će vratiti obeleženi tekst korisnika. Dobijeni tekst čuva se u 
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
