# MindHub

MindHub è una piattaforma web di giochi interattivi pensata per allenare memoria, logica e attenzione attraverso mini-giochi.

Il progetto è diviso in frontend e backend.  
Al momento questa repository contiene principalmente la parte frontend.

---

## Stato attuale del frontend

Sono già presenti:
  - Home page
  - Login
  - Register
  - Profile
  - Memory
  - Sudoku
  - Tic Tac Toe
  - Leaderboard provvisoria
  - Stile grafico cyber/neon
  - Layout responsive di base
  - Sistema provvisorio di login con localStorage
  - Sistema provvisorio di salvataggio punteggi in localStorage
  - Struttura pronta per collegamento al backend

---

## Struttura del progetto

```txt
index.html

pages/
  login.html
  register.html
  profile.html

games/
  memory.html
  sudoku.html
  tictactoe.html
  snake.html

css/
  style.css
  responsive.css
  memory.css
  sudoku.css
  tictactoe.css
  snake.css
  profile.css

js/
  main.js
  api.js
  auth.js
  scores.js
  leaderboard.js
  memory.js
  sudoku.js
  tictactoe.js
  snake.js

assets/
  logo.png
  icons/
  memory/
```

---

## Pagine principali

### Home page

File: index.html
Contiene:
  - navbar
  - hero section
  - sezione giochi
  - leaderboard
  - about
  - footer

Nella navbar, se l'utente non è loggato vengono mostrati:
```txt
Login | Register
```
Se invece l'utente risulta loggato tramite localStorage, vengono nascosti Login/Register
```txt
username + icona profilo
```
Cliccando sull'icona profilo si accede alla pagina Profile

---

### Login
File: pages/login.html
Per ora il login è simulato lato frontend.

Il file auth.js gestisce il submit del form e salva temporaneamente l'utente nel localStorage

---

### Register
File: pages/register.html
Per ora la registrazione è simulata lato frontend.
Il nome utente scelto viene salvato nel localStorage e mostrato nella navbar.

---

### Profile
File:

```txt
pages/profile.html
js/profile.js
css/profile.css
```

La pagina profilo esiste già.

Attualmente mostra:

  - username dell’utente loggato
  - email non disponibile, in attesa del backend
  - punti totali provvisori
  - statistiche provvisorie dei giochi
  - pulsante Home
  - pulsante Logout

La pagina profilo è protetta lato frontend: se non c’è un utente salvato nel localStorage, l’utente viene rimandato alla pagina login.

Il logout rimuove l’utente dal localStorage
---

## Giochi presenti
### Memory
File: 
  - games/memory.html
  - js/memory.js
  - css/memory.css
Il gioco è funzionante con:
- 6 coppie di carte
- immagini SVG
- contatore mosse
- contatore coppie trovate
- animazione flip
- messaggio di vittoria
- reset partita
- salvataggio punteggio in localStorage

- salvataggio punteggio in localStorage

Il punteggio del Memory viene calcolato in base alle mosse:

```txt
punteggio = 1000 - mosse * 10
```

con punteggio minimo pari a 100.
---

### Sudoku
File:
  - games/sudoku.html
  - js/sudoku.js
  - css/sudoku.css
Il gioco è funzionante con:
- griglia 9x9
- più schemi Sudoku scelti casualmente
- reset della stessa griglia
- controllo errori
- celle errate evidenziate
- timer
- popup vittoria
- salvataggio punteggio in localStorage
- layout realizzato anche con Bootstrap

Il timer parte quando si apre la pagina del Sudoku.

Il punteggio del Sudoku viene calcolato in base al tempo:

```txt
punteggio = 1000 - secondi impiegati
```

con punteggio minimo pari a 100.
---

### Tic Tac Toe
File:
  - games/tictactoe.html
  - js/tictactoe.js
  - css/tictactoe.css
Il gioco è funzionante con:
- modalità Player vs Player
- modalità Player vs CPU
- popup iniziale per scelta modalità
- popup finale per vittoria o pareggio
- reset partita
- salvataggio punteggio in localStorage

Sistema punti attuale:

```txt
Vittoria Player vs Player: +300
Vittoria Player vs CPU: +500
Sconfitta contro CPU: -100
Pareggio: 0
```
---

### Snake

File:

```txt
games/snake.html
js/snake.js
css/snake.css
```

Il gioco è funzionante con:

- movimento con frecce della tastiera
- movimento con WASD
- controlli touch/freccette su schermo
- punteggio
- best score salvato in localStorage
- cibo generato casualmente
- game over in caso di collisione con bordi o corpo
- popup Game Over
- nuova partita
- salvataggio punteggio in localStorage

Il punteggio salvato è lo score finale della partita.

---

### Coming Soon

Nella sezione giochi è presente anche una card "Coming Soon" per indicare che in futuro potranno essere aggiunti nuovi giochi.

---

## Sistema login provvisorio

Per ora login e registrazione usano localStorage per simulare l’utente loggato.

Esempio:

```js
localStorage.setItem("mindhubUser", username);
```

Quando un utente risulta loggato:

- spariscono i link Login/Register dalla navbar
- compare username + icona profilo
- cliccando sull’icona si accede alla pagina profilo

Questa parte dovrà poi essere sostituita con autenticazione vera tramite backend.

Quando il backend sarà pronto, il login dovrà restituire lo username reale dell’utente.

Esempio risposta desiderata:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "nome",
    "email": "nome@email.com"
  }
}
```

---

## Sistema punteggi provvisorio

Il file:

```txt
js/scores.js
```

gestisce provvisoriamente il salvataggio dei punteggi nel localStorage.

Ogni punteggio salvato ha questa struttura:

```js
{
  username: "nome",
  game: "Snake",
  score: 120,
  date: "2026-05-20T..."
}
```
Funzioni principali:

```js
getScores()
saveScore(game, score)
getBestScore(game)
```

Questa parte dovrà poi essere sostituita con chiamate al backend.


---

## File JavaScript importanti
### api.js
File: js/api.js
Contiene le funzioni base per chiamare il backend con `fetch`.
Endpoint attualmente previsti:
  - POST /api/auth/login
  - POST /api/auth/register

URL base previsto:

```js
const API_URL = "http://localhost:3000/api";
```
---

### auth.js
File: js/auth.js
Gestisce:
  - submit del form login
  - submit del form register
  - salvataggio provvisorio dell’utente nel localStorage
  - redirect alla home dopo login/register

---

### main.js

File:

```txt
js/main.js
```

Gestisce:

- scroll verso la sezione giochi
- cambio della navbar in base allo stato login/logout

---

### leaderboard.js
File: js/leaderboard.js
Per ora contiene dati finti della classifica.
In futuro dovrà essere collegato all’endpoint backend: GET /api/leaderboard

---

### profile.js

File:

```txt
js/profile.js
```

Gestisce:

- protezione provvisoria della pagina profilo
- visualizzazione username
- logout

---

### scores.js

File:

```txt
js/scores.js
```

Gestisce provvisoriamente:

- recupero punteggi
- salvataggio punteggi
- best score per gioco

---

## API backend da creare
### Registrazione utente: POST /api/auth/register
Body richiesto:
{
  "username": "nomeutente",
  "email": "email@example.com",
  "password": "password"
}

Risposta desiderata:
{
  "success": true,
  "message": "Registrazione completata",
  "user": {
    "id": 1,
    "username": "nomeutente",
    "email": "email@example.com"
  }
}

---

### Login utente: POST /api/auth/login
Body richiesto:
{
  "email": "email@example.com",
  "password": "password"
}
Risposta desiderata:
{
  "success": true,
  "message": "Login effettuato",
  "user": {
    "id": 1,
    "username": "nomeutente",
    "email": "email@example.com"
  }
}

---

### Profilo utente: GET /api/users/:id
Risposta desiderata:
{
  "id": 1,
  "username": "nomeutente",
  "email": "email@example.com",
  "totalPoints": 2450,
  "stats": {
    "memory": {
      "bestScore": 2450
    },
    "sudoku": {
      "completed": 3
      "bestScore":850
    },
    "tictactoe": {
      "wins": 5
    }, 
    "snake":{
      "bestScore": 120
    }
  }
}

---

### Leaderboard generale: GET /api/leaderboard
Risposta desiderata:
[
  {
    "username": "PlayerOne",
    "game": "Memory",
    "score": 2450
  },
  {
    "username": "CyberMind",
    "game": "Sudoku",
    "score": 1980
  }
]

---

### Leaderboard per gioco

Endpoint opzionale ma utile:

```txt
GET /api/leaderboard/:game
```

Esempio:
```txt
GET /api/leaderboard/snake
```

Risposta desiderata:

```json
[
  {
    "username": "Dalila",
    "game": "Snake",
    "score": 120
  }
]
```

---

### Salvataggio punteggio: POST /api/scores
Body richiesto:
{
  "userId": 1,
  "game": "Memory",
  "score": 2450
}

Risposta desiderata:
{
  "success": true,
  "message": "Punteggio salvato"
}

---

### Punteggi di un utente

Endpoint opzionale ma utile:

```txt
GET /api/users/:id/scores
```

Risposta desiderata:
```json
[
  {
    "game": "Memory",
    "score": 850,
    "date": "2026-05-20T..."
  },
  {
    "game": "Snake",
    "score": 120,
    "date": "2026-05-20T..."
  }
]
```
---

## Compiti backend
Il backend dovrà gestire:

- registrazione utenti
- login utenti
- autenticazione
- profilo utente
- salvataggio punteggi
- classifica generale
- classifica per gioco
- recupero statistiche utente
- collegamento a database

---

## Dati principali da salvare nel database

### Users

Campi consigliati:

```txt
id
username
email
passwordHash
createdAt
```
### Scores

Campi consigliati:

```txt
id
userId
game
score
createdAt
```
Relazione:

```txt
un utente può avere molti punteggi
```
---

## Note per il backend

Il frontend è già predisposto per usare `fetch`.

Per ora l’URL base nel file `js/api.js` è:

```js
const API_URL = "http://localhost:3000/api";
```

Quindi il backend può essere avviato su:
```txt
http://localhost:3000
```

Il backend dovrà poi sostituire:

- login simulato con localStorage
- dati finti del profilo
- leaderboard finta
- punteggi salvati localmente

---

## Note generali

Il progetto usa:

- HTML
- CSS
- JavaScript
- Bootstrap in alcune parti, soprattutto Sudoku
- GitHub per version control

Il frontend è ancora modificabile graficamente, ma la struttura principale delle pagine e dei giochi è già impostata.
