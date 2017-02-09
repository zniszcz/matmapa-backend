# Opis funkcjonalny

Aplikacja w przyszłości ma być RESTowym serwerem umożliwiającym grupie edytorów współtworzenie grafu zależności tematów w serwisie elearningowym. Z tej aplikacji obecnie będą korzystać jedynie twórcy serwisu (1 - 5 użytkowników). Aplikacja składa się z 3 modułów:

## 1. Moduł użytkowników
Niezalogowany użytkownik nie może korzystać z aplikacji. Przetrzymujemy email użytkownika, nick, hasło oraz jego unikalny identyfikator.

1. **Unikalny identyfikator** - *(int)*
2. **Email** - *(String)*
3. **Nick** - *(String)*
4. **Hasło** - *(String)*

## 2. Moduł tematów
Temat odzwierciedla jedno zagadnienie w kursie. Tematy mogą posiadać podtematy (conajmniej 10 poziomów zagnieżdżenia, w przyszłości możemy potrzebować więcej). Użytkownicy mogą dodawać, usuwać oraz edytować tematy. Temat posiada (pogrubione pola są obowiązkowe):

 1. **Unikalny identyfikator** - *(int)*
 2.  ID Parenta - *(int)*
 3. **Autora** - *(int)* ID Usera
 4. Treść -  *(String)* max 1500 znaków
 5. **Datę utworzenia** -  *(Timestamp)*
 6. Historię modyfikacji - *(Array)* Tablica obiektów historii modyfikacji
     1. **Autor wersji** - *(int)*
     2. **Treść nodea** - *(String)*
     3. **Data modyfikacji** - *(Timestamp)*

## 3. Moduł zależności
Tematy posiadają zależności między sobą. Każdy temat może mieć wiele zależności, ale zależności są unikalne(może występować tylko jedna zależność z tematu X do tematu Y). Zależności opisują który temat jest wymagany do zrozumienia kolejnego. Zależności występują pomiędzy tematami każdego poziomu zagnieżdżenia. Zależność posiada (pogrubione pola są obowiązkowe):

1. **Początkowy temat** - *(int)*
2. **Końcowy temat** - *(int)*
3. **Datę utworzenia** - *(Timestamp)*
4. **Autora** - *(int)* ID użytkownika

# Routing

## 1. Endpoint `node` służy do pobierania szczegółów, skrótu zagnieżdżonych w nim tematów i powiązanych z nim zależności.

### 1. GET `node`
Zwraca kolekcję tematów nie posiadających parenta.

**Sample response**
```JSON
{
    "status": "success",
    "children" [
        {
            "id": 0,
            "name": "Przykładowy komentarz"
        },
        {
            "id": 1,
            "name": "Inny przykładowy komentarz"
        }
    ]
}
```
### 2. POST `node`
Tworzy model tematu.

**Sample request:**
``` JSON
{
    "parent_id": 2,
    "name": "Przykładowa nazwa tematu",
    "content": "Przykładowa treść tematu"
}
```
**Sample response:**
``` JSON
{
    "status": "success",
    "node": {
        "id": 0,
        "parent_id": 2,
        "name": "Przykładowa nazwa tematu",
        "content": "Przykładowa treść tematu",
        "Author": {
            "id": 0,
            "email": "aaa@aaa.com",
            "nick": "zniszcz"
        },
        "created_at": "Sun, 01 Jan 2017 14:23:23 +0000"
    },
    "children": []
}
```
### 3. GET `node/:id`
Zwraca model tematu o danym id.

**Sample response:**
``` JSON
{
    "status": "success",
    "node": {
        "id": 0,
        "name": "Przykładowa nazwa tematu",
        "content": "Przykładowa treść tematu",
        "Author": {
            "id": 0,
            "email": "aaa@aaa.com",
            "nick": "zniszcz"
        },
        "created_at": "Sun, 01 Jan 2017 14:23:23 +0000"
    },
    "edges": {
        "pre": [
            1,
            4
        ],
        "post" [
            2
        ]
    },
    "children": [
        {
            "id": 5,
            "name": "Przykładowy zagnieżdżony node"
        }
    ]
}
```
### 4. POST `node/:id`
Edytuje lub usuwa model tematu o podanym id.

**Sample request:**
``` JSON
{
    "action": "edit",
    "title": "Przykładowy zmieniony tytuł",
    "content": "Przykładowa zmieniona treść tematu"
}
```
**Sample response:**
``` JSON
{
    "status": "success",
    "node": {
        "id": 0,
        "name": "Przykładowy zmieniony tytuł",
        "content": "Przykładowa zmieniona treść tematu",
        "Author": {
            "id": 0,
            "email": "aaa@aaa.com",
            "nick": "zniszcz"
        },
        "created_at": "Sun, 01 Jan 2017 14:23:23 +0000",
        "edit_history": [
            {
                "Author": {
                    "id": 0,
                    "email": "aaa@aaa.com",
                    "nick": "zniszcz"
                },
                "date": "Sun, 01 Jan 2017 14:23:23 +0000",
                "content": "Przykładowa nazwa tematu",
                "name": "Przykładowa treść tematu"
            }
        ]
    }
}
```

## 2. Endpoint `nodes` służy do pobierania listy tematów.

### 1. GET `nodes`
Zwraca listę wszystkich nodeów.

**Parametry**:

| Parametr | Wartości |Znaczenie|
|----------|----------|---------|
|`q`       |*(String)*|Zwraca jedynie tematy zawierające w nazwie frazę podaną w parametrze|
|`limit`   |*(int)*   |Ustawia limit paginacji (domyślnie 50)|
|`p`       |*(int)*   |Zwraca odpowiedzi z danej strony (domyślnie 0)|

**Sample response:**
``` JSON
{
    "status": "success",
    "nodes": [
        {
            "id": 0,
            "name": "Przykładowy zmieniony tytuł",
            "content": "Przykładowa zmieniona treść tematu",
        },
        {
            "id": 1,
            "name": "Przykładowy inny tytuł",
            "content": "Przykładowa inna treść tematu",
        },
        {
            "id": 2,
            "name": "Przykładowy totalnie inny tytuł"
        },
    ]
}
```

## 3. Endpoint `edge`
Służy do modyfikacji zależności.

### 1. POST `edge/add`
Dodaje zależność

**Sample request:**
``` JSON
{
    "pre": 0,
    "post": 2
}
```
**Sample response:**
``` JSON
{
    "status": "success",
    "edge": {
        "pre": 0,
        "post": 2,
        "Author": {
            "id": 0,
            "email": "aaa@aaa.com",
            "nick": "zniszcz"
        },
        "created_at": "Sun, 01 Jan 2017 14:23:23 +0000"
    }
}
```

### 2. POST `edge/delete`
Usuwa zależność
``` JSON
{
    "pre": 0,
    "post": 2
}
```
**Sample response:**
``` JSON
{
    "status": "success",
    "edge": {
        "pre": 0,
        "post": 2
    }
}
```

# Obsługa błędów

Każda odpowiedź z serwera zawiera pole `status`. Jeżeli operacja przebiegła poprawnie pole status ma wartość `'success'`. W przeciwnym wypadku pole `status` ma wartość `'error'` i oprócz statusu zwracane jest jedynie pole `message` z treścią błędu.

# Runetime
Aplikacja powinna używać kontenerów dockerowych i posiadać plik `helper.sh` który udostępnia następujące komendy:

| Komenda                 | Działanie                              |
|-------------------------|----------------------------------------|
|`matmapa-backend setup`  | Pobiera i uruchamia wymagane kontenery |
|`matmapa-backend use`    | Ustawia obecną wersję node z `.nvmrc`  |
|`matmapa-backend install`| Instaluje zależności                   |
|`matmapa-backend run`    | Uruchamia projekt                      |
|`matmapa-backend sync `  | Restartuje API                         |

Aplikacja powinna móc być uruchomiona w trybie developerskim (za pomocą parametru `--env=dev`). W trybie developerskim serwer akceptuje zapytania z każdej domeny(`Access-Control-Allow-Origin: *`).
