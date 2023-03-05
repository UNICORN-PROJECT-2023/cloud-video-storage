# Client 

Cload video storage je projekt, který poskytuje API rozhraní pro správu uživatelských účtů a videí.

Backend API
Všechny endpointy API jsou umístěny v prefixu /user. Zde jsou uvedeny všechny aktuální endpointy:

GET /user/me: Vrátí informace o přihlášeném uživateli.
PUT /user/me: Aktualizuje informace o přihlášeném uživateli.
POST /user/login: Přihlásí uživatele na základě poskytnutých informací o přihlašování.
POST /user/register: Registruje nového uživatele.
Pro vytvoření nových endpointů, vytvořte nové controllery a servicy.

Všechny cesty jsou dokumentovány v Swaggeru, který je dostupný na adrese localhost:3000/api.

UX Client
Návrh cest v projektu Toaleťák je k dispozici v nástroji FigJam, kde lze nalézt cesty vedoucí od Loginu až k jednotlivým funkcím.

Spuštění projektu
Před spuštěním projektu je nutné nainstalovat Docker a poté nainstalovat npm jak pro serverovou část, tak pro klientskou část odděleně. Po instalaci spusťte server pomocí příkazu npm run start:dev ve složce server. Swagger zobrazí seznam všech cest a při přidání nových controllerů se seznam aktualizuje.

V souboru main.module.ts je nutné přidat všechny controllery do controllers a servicy, například pro videa, do providers.

Toto je základní README pro projekt Toaleťák. Pokud budete mít jakékoliv další dotazy nebo potřebujete další informace, neváhejte mě kontaktovat.