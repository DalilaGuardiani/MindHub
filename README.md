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

css/
  style.css
  responsive.css
  memory.css
  sudoku.css
  tictactoe.css
  profile.css

js/
  main.js
  api.js
  auth.js
  leaderboard.js
  memory.js
  sudoku.js
  tictactoe.js

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

---

### Login
File: pages/login.html
Per ora il login è simulato lato frontend.

---

### Register
File: pages/register.html
Per ora la registrazione è simulata lato frontend.

---

### Profile
File: pages/profile.html
La pagina profilo esiste già, ma contiene dati finti.  
Dovrà essere collegata al backend.

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
- popup vittoria
- layout realizzato anche con Bootstrap

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

---

## Cose simulate lato frontend
Per ora login e registrazione usano `localStorage` per simulare l’utente loggato.

Esempio:
```js
localStorage.setItem("mindhubUser", username);
```

Quando un utente risulta loggato:
- spariscono i link Login/Register dalla navbar
- compare username + icona profilo
- cliccando sull’icona si accede alla pagina profilo

Questa parte dovrà poi essere sostituita con autenticazione vera tramite backend.

---

## File JavaScript importanti
### api.js
File: js/api.js
Contiene le funzioni base per chiamare il backend con `fetch`.
Endpoint attualmente previsti:
  - POST /api/auth/login
  - POST /api/auth/register

---

### auth.js
File: js/auth.js
Gestisce:
  - submit del form login
  - submit del form register
  - salvataggio provvisorio dell’utente nel localStorage

---

### leaderboard.js
File: js/leaderboard.js
Per ora contiene dati finti della classifica.
In futuro dovrà essere collegato all’endpoint backend: GET /api/leaderboard

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
    },
    "tictactoe": {
      "wins": 5
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

## Compiti backend
Il backend dovrà gestire:

- registrazione utenti
- login utenti
- autenticazione
- profilo utente
- salvataggio punteggi
- classifica generale
- classifica per gioco
- collegamento a database

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
- GitHub per version control

Il frontend è ancora modificabile graficamente, ma la struttura principale delle pagine è già impostata.
