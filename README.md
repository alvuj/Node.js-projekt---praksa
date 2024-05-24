# Node.js-projekt---praksa
Projektni zadatak u sklopu stručne prakse - Mendadžment hotela

# CRUD Aplikacija za Upravljanje Podacima

Ova aplikacija je razvijena kao dio stručne prakse u tvrtki Informatika Fortuno d.o.o. Cilj aplikacije je pružiti funkcionalnosti za upravljanje podacima u bazi koristeći CRUD operacije (Create, Read, Update, Delete) putem API-ja. Aplikacija koristi Node.js, Express, MySQL, i druge tehnologije za razvoj backend sustava. Aplikacija je dizajnirana kako bi simulirala menadžment hotela.

## Tehnologije

- **Node.js**: JavaScript runtime za izgradnju skalabilnih mrežnih aplikacija.
- **Express**: Minimalistički web framework za Node.js.
- **MySQL**: Relacijska baza podataka za pohranu podataka.
- **PHPMyAdmin**: Alat za administraciju MySQL baza podataka.
- **npm**: Node package manager za upravljanje paketima.

## API Endpointi

### Create (Stvaranje)

- **Dodavanje novog apartmana:**
    ```http
    POST /api/dodajApartman
    Body:
    {
      "naziv": "Naziv apartmana",
      "adresa": "Adresa apartmana",
      "id_lok": 1,
      "id_vrst_ap": 2,
      "broj_kreveta": 4
    }
    ```

### Read (Čitanje)

- **Dohvaćanje svih apartmana:**
    ```http
    GET /api/sviApartmani
    ```

- **Dohvaćanje apartmana prema ID-u:**
    ```http
    GET /api/apartman/:id
    ```

### Update (Ažuriranje)

- **Ažuriranje podataka o apartmanu:**
    ```http
    PUT /api/urediApartman/:id
    Body:
    {
      "naziv": "Novi naziv apartmana",
      "adresa": "Nova adresa apartmana",
      "id_lok": 1,
      "id_vrst_ap": 2,
      "broj_kreveta": 4
    }
    ```

### Delete (Brisanje)

- **Brisanje apartmana:**
    ```http
    DELETE /api/izbrisiApartman/:id
    ```


