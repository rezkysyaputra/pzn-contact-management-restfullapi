# User Api Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "rezky",
  "password": "rahasia",
  "name": "Muh Rezky Syaputra"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "rezky",
    "name": "Muh Rezky Syaputra"
  }
}
```

Response Body Error :

```json
{
  "errors": "username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "rezky",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Muh Rezky Syaputra Lagi", // OPTIONAL
  "password": "new rahasia" // OPTIONAL
}
```

Response Body Success :

```json
{
  "data": {
    "username": "rezky",
    "name": "Muh Rezky Syaputra Lagi"
  }
}
```

Response Body Error :

```json
{
  "errors": "name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success :

```json
{
  "username": "rezky",
  "name": "Muh Rezky Syaputra"
}
```

Response Body Error :

```json
{
  "errors": "unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
