# PokeDexLite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Deployed

https://soft-mandazi-29615d.netlify.app/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## About app


this app, is a technical test of a software development company, it consists of creating a simulation of a CRUD (create, read, update, delete), consuming data from an api.

## API pokemon

pokéApi is used, see the documentation [PokeApi](https://pokeapi.co/docs/v2)

## Features

When entering the app, you must have a username and password, otherwise you will not be able to navigate the app.

for that, you can enter any email with a password, since it is a simulation, for authentication there is no connection with apis.
for example try: challenge@poke.com and pass: 123456789.

On the home screen, all the pkemons will be shown, when scrolling, more pokemons will be displayed. Which can be edited, deleted and see more details of each one.
for that it was implemented [ngxInfiniteScroll](https://www.npmjs.com/package/ngx-infinite-scroll).
To create a pokemon, a form must be filled out. To access the form, just click on the corresponding button from home screen.

in the detail of the pokemons it also shows its evolutions if it has. Skills, weight and height are also displayed
