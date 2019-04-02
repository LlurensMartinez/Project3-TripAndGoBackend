

# Project 3
## Description
Es una App para crear viajes y compartirlos con mas usuarios de la aplicacion. Los creadores del viaje pueden editarlo, y eliminarlo. Los usuarios pueden añadirse al viaje creado.
 
## User Stories
- **404** -  Como un usuario yo quiero ver un bonita pagina 404, cuando yo voy a una pagina que no existe yo se que ha sido mi error
- **500** - Como un usuario yo quiero ver un mensaje de error cuando el error es por parte del servidor
- **homepage** -  Como un usuario yo quiero ser capaz de acceder a la homepage, por lo tanto y veo de que trata la app y realizar login y signup
- **sign up** - Como usuario yo quiero hacer signup en la app para poder buscar viajes que me interesen o crear los mios propios. tambien puedo ir a la pagina de Login
- **login** - Como usuario yo quiero ser capaz de logearme el la app.
- **logout** - Como usuario yo quiero ser capaz de hacer logout de la app por lo tanto yo estoy seguro que no se va a poder acceder a mi cuenta.
- **profile** - Como usuario quiero  de ver mi perfil.
- **edit-profile** - Como usuario quiero ser capaz de editar mi perfil.
-  **Crear viajes** - Como usuario quiero ser capaz de crear un viaje para que los demas usuarios pudan unirse a él.
-  **Visualizar viajes** - Como usuario quiero ser capaz de visualizar todos los viajes que estan disponibles para poder unirme a uno de ellos.
-  **Editar viajes** - Como usuario creador del viaje quiero ser capaz de poder editarlo.
-  **Eliminar viajes** - Como usuario quiero ser capaz de eliminar los viajes creados.
-  **Visualizar detalles** - Como usuario quiero ser capaz de visualizar los detalles de los viajes.
-  **Darse de alta** - Como usuario quiero ser capaz de darme de alta de los viajes si hay plazas disponibles.
-  **Darse de baja** - Como usuario quiero ser capaz de darme de baja de los viajes.
-  **Busqueda** - Como usuario quiero ser capaz de realizar una busqueda con diferentes filtros.



## Backlog

Perfil del usuario:
- Subir imagen de perfil del usuario
- valorar a los demas usuarios.
- Recibir comentarios de los demas usuarios.
-  **Añadir como favoritos** - Como usuario quiero se capaz de añadir un viaje como favoritos.
-  **Confirmar asistencia** - Confirmar alta por parte del creador

Geo Location:
- Añadir geocalizacion del viaje.

  
# Client

## Routes
| Path | Component | Permissions | Behavior | 
|------|--------|--| -------|
| `/` | HomePageComponent| publico | solo copia promocional|
| `/signup` | SignupPageComponent| anon solo| signup form, link a login, navegar al homepage despúes del signup|
| `/login` | LoginPageComponent | anon solo |login form, link a signup, navegar al homepage despúes del login |
| `/search` | TripsListPageComponent| solo usuario | mostrar todos los viajes, links los detalles, buscar viajes por nombre
| `/favorite-trips` | TripsListFavsPageComponent| solo usuario | mostrar todos los viajes guardados, links los detalles
| `/trips/new` | TripCreatePageComponent | user solo | aparece formulario para crear un viaje, 
| `/trips/:id` | TripDetailPageComponent  | user | ver los detalles, si eres el creador - boton para eliminar y otro para editar. si no eres el creador te puedes unir al viaje.
| `/trips/:id/edit` | TripEditPageComponent  | user | para que el creador pueda editar sus propios viajes. 
| `/mytrips` | MyTripsListPageComponent| solo usuario | mostrar todos los viajes creados y a los que se ha unido el usuario, links a los detalles
| `/profile/me` | ProfilePageComponent | solo el usuario | mis detalles.
| `/profile/:id` | ProfilePageComponent | solo usuarios autenticados| mostrar el perfil del usuario
| `/profile/me/edit` | ProfilePageComponent | solo el usuario | modificar datos del perfil.
| `**` | NotFoundPageComponent | public | 




## Components

- Trips Card component
- Search component
- Create Form

## Page comonents
- ....

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Trip Service
  - trip.list()
  - trip.create(data)
  - trip.delete(id)
  - trip.edit(id,data)
  - trip.detail(id)

  - BACKLOG
  - search(terms)
  - addFavorite(id)
  - removeFavorite(id)   

- Profile Service
  - getProfile(id)
  - editProfile(data)
- BACKLOG

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
favorites - [ObjectID<trip>]
image - String
```

Trip model

```
owner - ObjectID<User> // required
name - String // required
title - String // required
description - String // required
image - String // required
ageRange - Enum
date - Date // required
participants - [ObjectID<user>]
numbersPersons - number
```

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - username
    - email
    - password
    - age
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - passdword matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204
- GET /trips
- POST /trips
  - body:
    owner 
    name 
    title 
    description 
    image 
    ageRange 
    date 
  - validation
    - fields not empty
  - create trip
  - 200 with trip object
- GET /trips/:id
- PUT /trips/:id
- DELETE /trips/:id

- GET /profile/:id
- PUT /profile
  - body: 
    -image
    -username
    -password
    -phonenumber
  - updates user in session

## Baklog
- GET /trips?terms=foo
  - use search criteria if terms provided
  - 200 with array of trips

- POST /favorite
  - body:
    - TripId
  - validation
    - id is valid (404)
    - id exists (404)
  - add to favorites if not there yet
  - updates user in session
- DELETE /user/favorite/:tripId
  - validation
    - id is valid (404)
    - id exists (404)
  - body: (empty - the user is already stored in the session)
  - remove from favorites
  - updates user in session


  

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)