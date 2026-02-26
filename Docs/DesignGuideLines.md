# N.A.R.V.I.S. Design System 🎨

Questo documento definisce le linee guida di design formali per la costruzione dell'ecosistema N.A.R.V.I.S., incluso il futuro sito web promozionale o landing page. Lo stile generale è focalizzato su un'interfaccia **Neumorfica (Soft UI)** pulita, accogliente ma professionale, con accenti vivaci.

---

## 1. Filosofia Visiva (Neumorphism)
Il progetto utilizza il Neumorfismo per creare un'esperienza tattile. Gli elementi non hanno bordi netti tradizionali, ma sembrano estrusi (sollevati) dalla superficie di base o incavati (scavati) in essa, attraverso un uso sapiente di doppie ombre (chiare in alto a sinistra, scure in basso a destra).

- **Superfici Sollevate (`shadow-neu-out`)**: Usate per card, bottoni, pannelli e contenitori principali.
- **Superfici Incavate (`shadow-neu-in`)**: Usate per input di testo, aree di drop, immagini incassate e bottoni premuti (stato `active`).

---

## 2. Palette Colori

La palette ruota attorno a scale di grigi morbidi ed un colore di accento (Viola/Purple). Il sistema supporta un tema Chiaro (Default), un tema Intermedio (Dim) e un Tema Scuro.

### Colori di Base (Tema Chiaro / Default)
*I colori di base formano lo sfondo e la struttura.*
- **Base `(--neu-base)`**: `#E0E5EC` (Grigio chiarissimo con una punta di blu, colore di sfondo principale)
- **Base Dark `(--neu-base-dark)`**: `#D1D9E6` (Grigio leggermente più scuro, usato per scrollbar e contrasti minimi)

### Tipografia
*I colori per il testo garantiscono leggibilità senza essere puramente neri.*
- **Text `(--neu-text)`**: `#4A5568` (Grigio ardesia scuro - Testi principali)
- **Text Light `(--neu-text-light)`**: `#A0AEC0` (Grigio ardesia medio - Testi secondari, label, placeholder)

### Accenti e Stati
- **Accent `(--neu-accent)`**: `#8B5CF6` (Viola vibrante - Call to action, link, focus)
- **Accent Hover `(--neu-accent-hover)`**: `#7C3AED` (Viola più scuro per gli stati hover)
- **Danger**: `#EF4444` (Rosso - Avvisi, cancellazioni)
- **Success**: `#10B981` (Verde smeraldo - Salvataggi, conferme)
- **Warning/Highlight**: `#FBBF24` (Giallo ambra - Usato per evidenziare inconsistenze testuali o focus momentanei)

### Tema Scuro (Dark Mode)
- **Base**: `#2D3748`
- **Base Dark**: `#1A202C`
- **Text**: `#F7FAFC`
- **Text Light**: `#A0AEC0`
- **Accent**: `#A78BFA`

---

## 3. Ombre Neumorfiche (Tailwind Config)
Da inserire nella configurazione globale Tailwind (o come variabili CSS).

- `shadow-neu-out`: `9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)`
- `shadow-neu-out-sm`: `5px 5px 10px rgba(163,177,198,0.5), -5px -5px 10px rgba(255,255,255, 0.5)`
- `shadow-neu-in`: `inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8)`
- `shadow-neu-in-sm`: `inset 3px 3px 6px 0 rgba(163,177,198, 0.7), inset -3px -3px 6px 0 rgba(255,255,255, 0.8)`

> *Nota per il Dark Mode: nel tema scuro le ombre bianche sono quasi totalmente trasparenti (`rgba(255, 255, 255, 0.05)`) mentre le ombre scure usano nero netto (`rgba(0, 0, 0, 0.6)`).*

---

## 4. Tipografia Font

1. **Font UI Principale: `Nunito`** (Sans-serif)
   - Utilizzato per quasi tutta l'interfaccia utente.
   - Pesi utilizzati: `400` (Normale), `600` (SemiBold), `700` (Bold), `800` (ExtraBold).
   - Stile comune: Arrotondato, amichevole, eccellente leggibilità.

2. **Font Editor/Screenplay: `Courier Prime`** (Monospace)
   - Utilizzato **esclusivamente** per contesti di sceneggiatura, editor testuale narrativo o per dare un "vibe" da macchina da scrivere/codice.

---

## 5. Pattern UI Comuni (Componenti)

Qui di seguito l'HTML/Tailwind tipico per replicare i componenti di Narvis.

### Layout e Arrotondamenti
- Si utilizzano curve molto morbide e ampie: `rounded-[30px]`, `rounded-[40px]`, `rounded-xl`, `rounded-2xl`, `rounded-full`.
- Spaziatura: abbondante, molto uso di Flexbox e gap generosi (es. `gap-5`, `p-8`).

### 5.1 Pannelli e Card (Superfici Esterne)
Containers principali e Modali per il layout. Spesso accompagnati da un bordo lieve se semitrasparenti o per evidenziare il limite.
```html
<div class="bg-neu-base p-8 rounded-[30px] shadow-neu-out border border-white/20">
    <!-- Contenuto -->
</div>
```

### 5.2 Bottoni (Call to Action)
I bottoni non premono mai il colore di base, usano il testo per differenziarsi, e al click si instrosano (`active:shadow-neu-in`).

**Bottone Primario:**
```html
<button class="px-8 py-2 rounded-xl font-bold text-neu-accent shadow-neu-out hover:shadow-neu-in active:shadow-neu-in transition-all text-xs">
    Salva Modifiche
</button>
```

**Bottone Secondario / Annulla:**
```html
<button class="px-6 py-2 rounded-xl font-bold text-neu-text transition-all shadow-neu-out hover:text-neu-accent active:shadow-neu-in text-xs">
    Annulla
</button>
```

**Bottoni Circolari (Icone):**
```html
<button class="w-10 h-10 rounded-full bg-neu-base shadow-neu-out flex items-center justify-center hover:text-neu-accent transition-all text-lg font-bold active:shadow-neu-in">
    +
</button>
```

### 5.3 Input Form e Textarea
Le aree dove l'utente digita sono sempre incavate (`shadow-neu-in`) per invitare l'inserimento.

**Contenitore Tipico:**
```html
<div>
    <label class="text-[10px] font-bold text-neu-text-light ml-2 uppercase tracking-wide">Nome Personaggio</label>
    <input type="text" class="w-full bg-neu-base shadow-neu-in rounded-xl px-3 py-2 outline-none text-neu-text mt-1 font-bold text-sm" placeholder="Inserisci il nome..." />
</div>
```
*(Nota il label: molto piccolo `text-[10px]`, maiuscolo `uppercase`, spaziato `tracking-wide`, grigio medio).*

### 5.4 Overlay / Glassmorphism
Per i modali e gli sfondi viene usato un leggero blur.
```html
<div class="absolute inset-0 bg-neu-base/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <!-- Modale al centro -->
</div>
```

---

## 6. Accessori ed Effetti

- **Effetti di Pulse / Highlight:** per guidare l'occhio dell'utente su elementi di intelligenza artificiale o incongruenze si usano sfondi trasparenti (spesso giallo o viola) con `box-shadow` luminescenti e animazioni `@keyframes`.
- **Bordi Animati ("AI Typing"):** usati per indicare azione semantica.
  ```css
  .ai-typing {
    border-bottom: 2px solid var(--neu-accent);
    background-color: rgba(139, 92, 246, 0.1);
    animation: pulse-border 1s infinite;
  }
  ```
- **Scrollbar Personalizzata:** nascosta e arrotondata, stile pillola, con riempimento trasparente per far risaltare il `neu-base-dark`.

---

## Utilizzo per il Sito Web Promozionale

Quando svilupperai il sito vetrina di Narvis:
1. Usa **sfondi chiari di grande impatto** (`#E0E5EC`).
2. Applica le ombre Neumorfiche su macro-sezioni (es. cards che spiegano le feature).
3. Utilizza **grafiche vettoriali morbide** o screenshot arrotondati e adagiati sulle "scavature" del div (`shadow-neu-in`).
4. Punta su typography **Nunito** molto grossa (ExtraBold) per gli Hook (headers) accostata al viola acceso (`#8B5CF6`) per le call-to-action primarie (es. "Accedi alla Beta").
5. Per trasmettere l'aspetto innovativo della "Storytelling A.I.", **integra piccoli frammenti con font Monospace** (Courier Prime) magari simulando la digitazione della sceneggiatura.
