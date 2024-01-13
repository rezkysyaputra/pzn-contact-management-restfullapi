# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "firstName": "Rezky",
  "lastName": "Syaputra",
  "email": "rezky@gmail.com",
  "phone": "121345435"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Rezky",
    "lastName": "Syaputra",
    "email": "rezky@gmail.com",
    "phone": "121345435"
  }
}
```

Response Body Error:

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "firstName": "Rezky",
  "lastName": "Syaputra",
  "email": "rezky@gmail.com",
  "phone": "121345435"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Rezky",
    "lastName": "Syaputra",
    "email": "rezky@gmail.com",
    "phone": "121345435"
  }
}
```

Response Body Error:

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Rezky",
    "lastName": "Syaputra",
    "email": "rezky@gmail.com",
    "phone": "121345435"
  }
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query params :

- name : Search by firstName or lastName, using Like, optional
- email : Search by email using Like, optional
- phone : Search by phone using Like, optional
- page : Number of page, default 1
- size : Size per page, default 10

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "firstName": "Rezky",
      "lastName": "Syaputra",
      "email": "rezky@gmail.com",
      "phone": "121345435"
    },
    {
      "id": 2,
      "firstName": "budi",
      "lastName": "Syaputra",
      "email": "budi@gmail.com",
      "phone": "121345435"
    }
  ],
  "paging": {
    "page": 1,
    "totalPage": 3,
    "totalItem": 30
  }
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": "OKE"
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```
