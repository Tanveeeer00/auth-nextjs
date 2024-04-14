## Next JS

Be careful in naming convention.
use `[id]` for params.

## backend

backend will be in `src/app/api` folder.
file name should be `route.js`

models, helper, dbconif will be in `src/app`

## frontend

frontend will be in `src/app` folder

file name should be `page`

## client and server

use `use client` for frontend. if we want something from frontend e.g window.location, data, etc. By default it's a server component.

## Token Verify mechanism

Application generates two tokens. One send to user on email and one save on database.

1 way to explain.

{then user will on that link and return on application then check user token are same as database if yes then application verified to user.}

2. way to explain.

{ User will get the token and click on this link which redirect to `/api/auth/verify`, then it's server side code that verify if the token is valid or not. If yes then return true else false.}
