# Backend-Coastal-Yellow-Cabs

### Register New User

POST to `https://backend-taxi-service.herokuapp.com/api/register`

Takes an object including:
```javascript 
{
	"username": "user123",
	"password": "password",
	"name": "Name",
	"phone": "714-123-1231",
	"email": "email@gmail.com"
}
```

You will be returned the newly created user object and a JWT that contains encoded username.

### Login Admin

Takes an object:
```javascript
{
	"username": "admin's username",
	"password": "admin's password"
}
```

You will be returned an object with a JWT that contains encoded username.

### Login User

POST to `https://backend-taxi-service.herokuapp.com/api/login`

Takes an object:
```javascript
{
	"username": "user123",
	"password": "password"
}
```

You will be returned an object with a JWT that contains encoded username.

### Post a new trip

POST to `https://backend-taxi-service.herokuapp.com/api/trips`

No JWT required

Takes an object: 
```javascript
{
  "distance": 5.5,
  "startAddress": "Back Bay Vet, 4263 Birch St, Newport Beach, CA 92660",
  "endAddress": "Patricks Pub, 2645 Harbor Blvd, Costa Mesa, CA 92626",
  "price": 26.23,
  "name": "Eli Mead",
  "comments": "I am carrying 2 large bags. One contains cats",
  "phone": "909-255-4233",
  "passengers": 1,
  "email": "eliwashere@gmail.com",
  "direction": "oneWay",
  "date": "2020-04-14",
  "time": "10:00",
  "vehicle": "sedan",
  "status": "complete",
  "username": "elimeed"
}
```

You will be returned the newly created trip object including a unique `id` and a `created_at` timestamp:
```javascript
{
  "id": 36,
  "distance": 5.5,
  "startAddress": "Back Bay Vet, 4263 Birch St, Newport Beach, CA 92660",
  "endAddress": "Patricks Pub, 2645 Harbor Blvd, Costa Mesa, CA 92626",
  "price": 26.23,
  "name": "Eli Mead",
  "comments": "I am carrying 2 large bags. One contains cats",
  "phone": "909-255-4233",
  "passengers": 1,
  "email": "eliwashere@gmail.com",
  "direction": "oneWay",
  "date": "2020-04-14",
  "time": "10:00",
  "vehicle": "sedan",
  "status": "complete",
  "username": "elimeed",
  "created_at": "2020-09-05 21:05:14"
}
```

### Update a trip 

PUT to `https://backend-taxi-service.herokuapp.com/api/trips/:id` // where id is trip's `id`

Takes a JWT and an object containing any of the existing trip properties that are to be updated.

example:
```javacript
{
  "vehicle": "van",
  "status": "confirm",
}
```

### Delete a trip 


DELETE to `https://backend-taxi-service.herokuapp.com/api/trips/:id` // where id is trip's `id`

Takes a JWT


### Get trips from database

GET to `https://backend-taxi-service.herokuapp.com/api/trips`

Requires JWT

if JTW contains the admin's encoded credentials, it will return an array of all trip objects.

if JTW contains a user's encoded credentials, it will return an array with only trip objects associated with their username
