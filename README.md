# Movie App

Applicazione web sviluppata con React e TypeScript per consultare un elenco di film e visualizzarne le informazioni dettagliate utilizzando le API di The Movie Database (TMDB).

Il progetto è stato realizzato nell'ambito della prova pratica del modulo Frontend React di base.

## Tecnologie utilizzate

- React
- TypeScript
- Vite
- React Router DOM
- CSS
- The Movie Database (TMDB) API

## Funzionalità

L'applicazione è composta da due pagine.

### Pagina elenco

- Recupero dei film tramite API TMDB.
- Ricerca preimpostata: "The Lord of the Rings".
- Visualizzazione dei risultati della prima pagina, fino a un massimo di 20 film.
- Visualizzazione di poster, titolo, data di uscita, valutazione e trama.
- Accesso alla pagina di dettaglio tramite il pulsante "Dettaglio" del primo risultato.

### Pagina dettaglio

- Recupero dei dati del film attraverso il suo ID.
- Visualizzazione delle informazioni principali: titolo, poster, tagline, data di uscita, durata, valutazione, generi, trama e informazioni sulla produzione.
- Gestione degli stati di caricamento e degli eventuali errori.

## Struttura del progetto

```text
src/
├── components/
│   ├── Header.tsx
│   ├── MovieCard.tsx
│   ├── Poster.tsx
│   └── Shell.tsx
├── pages/
│   ├── MovieListPage.tsx
│   └── MovieDetailPage.tsx
├── types/
│   ├── movie.ts
│   └── movieDetail.ts
├── index.css
└── main.tsx

traccia/
└── prototipo/
```

## Installazione e avvio

Per eseguire il progetto in locale:

1. Clonare il repository.
2. Aprire la cartella del progetto nel terminale.
3. Installare le dipendenze:

```bash
npm install
```

4. Creare un file `.env.local` nella cartella principale e inserire la propria chiave API TMDB:

```env
VITE_TMDB_API_KEY=INSERISCI_LA_TUA_API_KEY
```

5. Avviare il server di sviluppo:

```bash
npm run dev
```

Vite mostrerà nel terminale l'indirizzo locale al quale sarà possibile visualizzare l'applicazione.

## Routing

La navigazione è gestita tramite React Router DOM.

Le route previste sono:

- `/` – Pagina elenco dei film.
- `/movies/:id` – Pagina dettaglio del film identificato dal relativo ID.

Entrambe le pagine condividono il componente `Shell`, che contiene l'header e la struttura comune dell'applicazione.

## API

I dati dei film provengono da [The Movie Database](https://www.themoviedb.org/).

La chiave API viene letta tramite una variabile d'ambiente e deve essere configurata localmente nel file `.env.local`.

Il file `.env.local` non deve essere caricato nel repository.
