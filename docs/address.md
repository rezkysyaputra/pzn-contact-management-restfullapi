# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan Toli-Toli",
  "city": "Palu",
  "province": "Sulawesi Tengah",
  "country": "Indonesia",
  "postalCode": "1234"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Toli-Toli",
    "city": "Palu",
    "province": "Sulawesi Tengah",
    "country": "Indonesia",
    "postalCode": "1234"
  }
}
```

Response Body Error:

```json
{
  "errors": "Country is Required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan Toli-Toli",
  "city": "Palu",
  "province": "Sulawesi Tengah",
  "country": "Indonesia",
  "postalCode": "1234"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Toli-Toli",
    "city": "Palu",
    "province": "Sulawesi Tengah",
    "country": "Indonesia",
    "postalCode": "1234"
  }
}
```

Response Body Error:

```json
{
  "errors": "country is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Toli-Toli",
    "city": "Palu",
    "province": "Sulawesi Tengah",
    "country": "Indonesia",
    "postalCode": "1234"
  }
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```

## List Address API

Endpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan Toli-Toli",
      "city": "Palu",
      "province": "Sulawesi Tengah",
      "country": "Indonesia",
      "postalCode": "1234"
    },
    {
      "id": 2,
      "street": "Jalan Budiman",
      "city": "Kendari",
      "province": "Sulawesi Tenggara",
      "country": "Indonesia",
      "postalCode": "4567"
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

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

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
  "errors": "address is not found"
}
```
