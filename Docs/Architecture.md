# Architettura Tecnica e Filosofia di NARVIS

NARVIS (Narrative Architecture & Reality Visualization Intelligent Suite) è concepito non come un semplice editor di testi, ma come un **IDE per la narrativa**. Questa scelta riflette la complessità della scrittura moderna, dove la coerenza tra trama, cronologia e mondo costruito richiede una gestione dei dati non lineare.

## 1. Il Paradigma del "Triplo Stato"
L'architettura poggia sulla sincronizzazione costante di tre database interconnessi:
*   **Stato Strutturale (Storyline):** Un grafo di nodi e archi che rappresenta la logica causale e i legami semantici.
*   **Stato Temporale (Super Timeline):** Una sequenza lineare con "Fisica Ripple" che gestisce il tempo fisico del mondo.
*   **Stato Testuale (Editor):** Il documento DOM che ospita la parola scritta e le annotazioni ancorate.

## 2. Il Motore Super Link (∞)
Il cuore dell'innovazione di NARVIS è il legame fisico tra astrazione visiva e contenuto:
*   **UUID Mapping:** Ogni entità (Capitolo, Scena) possiede un identificativo univoco persistente iniettato nel testo tramite l'attributo `data-chapter-id`.
*   **Topological Reordering:** Spostare un nodo nel grafo innesca un algoritmo di riordinamento dei nodi DOM nell'editor. Se la catena logica del grafo si spezza, il sistema disattiva il Super Link per proteggere l'integrità del testo.

## 3. Import Engine: "Heuristic Reflow"
L'importazione di manoscritti esistenti (PDF, DOCX, TXT) non è un semplice copia-incolla, ma una ricostruzione strutturale guidata:
*   **Geometric PDF Grouping:** Analisi delle coordinate Y dei frammenti di testo per raggruppare geometricamente le linee, ignorando intestazioni e numeri di pagina, risolvendo il problema dell'incolonnamento.
*   **Deep Heuristic Detection:** Algoritmi di punteggio identificano i capitoli basandosi su keyword (es. "Capitolo 1"), intestazioni visuali (bold/dimensione) e rilevamento di righe orfane.
*   **Semantic TOC Alignment:** Utilizzo dell'Indice (TOC) come "mappa della verità" per validare i capitoli trovati nel corpo del testo.

## 4. Storyboard Studio: "Regia Virtuale"
Automazione della pre-visualizzazione cinematografica tramite IA multimodale:
*   **Shot List Generation:** Gemini 3 Pro analizza il testo per identificare "beats" visivi, assegnando automaticamente parametri tecnici: *Shot Type* (es. Primo Piano), *Camera Move* (es. Pan), *Mood* e *Lighting*.
*   **Visual DNA Consistency:** Iniezione automatica dello stile estetico e dei profili fisici dei personaggi nelle generazioni d'immagine per garantire coerenza visiva.
*   **Esportazione Cinematico:** Generazione di documenti PDF pronti per la produzione con inquadrature, prompt e parametri tecnici affiancati al testo.

## 5. Storyline vs Super Timeline: La "Fisica Narrativa"
Questi pannelli gestiscono due concetti diversi di "successione":
*   **Storyline (Causalità/Grafo):** Gestisce il "perché". I collegamenti definiscono la sequenza logica, i flashback e le ramificazioni. È lo scheletro intellettuale dell'opera.
*   **Super Timeline (Cronologia/Fisica):** Gestisce il "quando". Implementa la **Fisica Ripple**: se una clip viene allungata o spostata, il sistema calcola lo spostamento di tutti gli eventi successivi sulla traccia principale per preservare i distacchi temporali definiti.
*   **BFS Multi-Root Propagation:** Il passaggio da Grafo a Timeline avviene tramite un algoritmo Breadth-First Search che identifica i nodi "radice" e propaga le durate lungo i nessi temporali.

## 6. Orchestrazione GeminiService: Istruzione Multi-Livello
L'IA di NARVIS è istruita tramite un sistema di prompt stratificati per massimizzare la precisione:
*   **Livello 0 (Persona):** Definisce l'IA come un "Senior Narrative Architect" tecnico e asciutto.
*   **Livello 1 (Project Manifesto):** Ogni richiesta include un manifesto dinamico che contiene Genere, POV, Riepilogo dei capitoli e Note del Nexus, fornendo un "Ground Truth" costante.
*   **Livello 2 (Task Specific):** Utilizzo di modelli *Flash* per bassa latenza (trascrizioni, check euristici) e modelli *Pro* per analisi di coerenza complessa (Continuity Matrix).

## 7. World Builder: GIS Narrativo & Sketch-to-Art
Il World Builder è un GIS (Geographic Information System) narrativo:
*   **OSM Integration:** Integrazione con OpenStreetMap per importare geografie reali del mondo.
*   **Pixel-to-Meter Calibration:** Calibrazione automatica della scala per permettere all'AI di stimare tempi di percorrenza realistici per i personaggi.
*   **Tldraw Sketch Engine:** Gli schizzi vettoriali fatti a mano vengono trasformati da Gemini 2.5 Flash Image in concept art 2K mantenendo la composizione originale.

## 8. Continuity Matrix & Surgical Surgery
Per eliminare i "buchi di trama", NARVIS implementa un audit ricorsivo:
*   **Recursive State Tracking:** L'AI analizza il Capitolo N ricevendo come contesto lo stato consolidato (Inventario, Posizione, Status) del Capitolo N-1.
*   **Surgical Patching:** Quando viene rilevata una contraddizione, il sistema propone una "patch" chirurgica che sostituisce solo il frammento errato mantenendo lo stile dell'autore.

## 9. Persistenza Cloud: "Asset Detaching" e Drive API
Strategia di salvataggio frazionata per massimizzare le prestazioni:
*   **JSON Manifest:** Il file principale contiene solo la struttura logica e il testo (KB).
*   **Asset Detaching:** Immagini e audio vengono salvati come file indipendenti su Drive.
*   **drive:// Protocol:** Nel database del progetto, le risorse pesanti sono referenziate tramite ID univoci, evitando la saturazione della RAM.
*   **Rescue System (IndexedDB):** Un mirror locale salva ogni modifica ogni 2 secondi per il ripristino istantaneo in caso di crash.