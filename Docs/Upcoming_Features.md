# NARVIS: Roadmap delle Funzionalità Future

Questo documento delinea i prossimi passi evolutivi per trasformare NARVIS in un IDE narrativo di livello professionale.

---

## 1. Ingegneria Strutturale

### 1.1 Atomic Branching (Modalità Multiverso)
*   **Concetto:** Capacità di creare "rami" o "fork" nel grafo Storyline.
*   **Comportamento:** Gli autori potranno testare direzioni narrative alternative (es. "Cosa succede se il protagonista muore qui?") senza alterare il ramo principale (canone).
*   **Tecnico:** Implementazione di una struttura database ramificata dove i nodi appartengono a diverse timeline condividendo gli stessi ID globali di personaggi e luoghi.

### 1.2 Navigatore Strutturale Sidebar
*   **Concetto:** Un pannello dedicato per l'assemblaggio testuale rapido.
*   **Comportamento:** Una lista verticale drag-and-drop dei titoli dei capitoli che permette il riordinamento fisico del manoscritto senza lasciare la vista Editor, complementare alla vista spaziale dello Storyline.

---

## 2. Intelligenza Multimodale & Integrazione Sensoriale

### 2.1 Pre-visualizzazione Video (Integrazione Veo 3.1)
*   **Concetto:** Trasformare lo Storyboard in un "Copione Vivente".
*   **Comportamento:** Un trigger per generare clip cinematografiche di 5 secondi usando modelli Veo basati sulla shot list dello storyboard, i movimenti di macchina e il contesto del testo.

### 2.2 DNA Visivo Narrativo
*   **Concetto:** Coerenza estetica assoluta in tutto il progetto.
*   **Comportamento:** Gli utenti caricano 3-5 immagini di riferimento (moodboard) che vengono analizzate da Gemini per estrarre un "Descrittore di Stile Visivo". Questo DNA viene iniettato in ogni successiva generazione di immagini o video.

### 2.3 Mappatura Automatica Voice ID
*   **Concetto:** Orchestrazione intelligente del Text-to-Speech (TTS).
*   **Comportamento:** Un legame rigido tra ID Personaggio e Voice ID di ElevenLabs. Quando l'AI rileva un personaggio specifico che parla nell'editor, seleziona automaticamente la sua voce unica per la lettura della scena.

---

## 3. Intelligenza Real-time (Il Sentinella Silenzioso)

### 3.1 Audit di Continuità in Background (Sentinel v4.0)
*   **Concetto:** Rilevamento di paradossi in tempo reale.
*   **Comportamento:** Un Web Worker a bassa priorità scansiona continuamente il paragrafo attuale. Avvisa l'utente tramite un'icona nel margine se rileva una contraddizione istantanea (es. "Hai scritto che è mezzanotte, ma la scena precedente è finita a mezzogiorno senza salti temporali").

### 3.2 Sincronizzazione Profonda Bidirezionale Grafo-Testo
*   **Concetto:** Popolamento automatico dello Storyline dall'Editor.
*   **Comportamento:** Se l'autore scrive di un nuovo personaggio o luogo direttamente nel testo, il sistema lo rileva e crea un "Nodo Proposto" nel cimitero dello Storyline, pronto per essere trascinato sulla lavagna.

---

## 4. Strumenti di Produzione Professionale

### 4.1 Motore di Sceneggiatura Avanzato
*   **Concetto:** Funzionalità standard per la produzione cinematografica.
*   **Comportamento:** Supporto per il **Dialogo Doppio** (due personaggi che parlano contemporaneamente), numerazione automatica delle scene e gestione delle "Pagine A" di produzione.
*   **Esportazione:** Filtri di esportazione professionali per `.fdx` (Final Draft) ed `.epub` (pronto per Amazon KDP).

### 4.2 Hotspot GIS Interattivi
*   **Concetto:** Collegamento diretto tra World Builder e Manoscritto.
*   **Comportamento:** Capacità di creare "Hotspot" sulla mappa che fungono da collegamenti ipertestuali. Cliccare su una città nella mappa scorre istantaneamente l'editor al capitolo ambientato in quel luogo.

---

## 5. Infrastruttura e Resilienza

### 5.1 Sincronizzazione Incrementale su Drive
*   **Concetto:** Salvataggio cloud ad alte prestazioni.
*   **Comportamento:** Passaggio dal salvataggio dell'intero JSON ad aggiornamenti basati su "Diff". Solo i capitoli o i nodi modificati vengono sincronizzati, riducendo drasticamente latenza e uso dati per progetti oltre le 100.000 parole.

### 5.2 UI di Risoluzione Conflitti Offline
*   **Concetto:** Editing robusto "Local-First".
*   **Comportamento:** Una dashboard avanzata che appare alla riconnessione, mostrando un "diff" visivo tra lo specchio locale (IndexedDB) e la versione Cloud, permettendo all'utente di scegliere quali versioni dei capitoli mantenere.