# Game of Life

I felt like creating Conway's game of life in javascript.

## Dependencies

- NodeJs
- NPM

## Getting Started

Install dependencies with:

```
$ npm install
```

To execute the tests run:

```
$ npm test
```

**Before you can run the application make sure you create a .env file from the
.env.default file.**

To run the application:

```
$ npm start
```

To expirement with different entities update the `config/entity_config.json`
file with the points you want live cells to start at. The following is an
example config setup.

```
{
  entityPoints: [
   { y: 19, 39 },
   { y: 20, 40 },
   { y: 20, 41 },
   { y: 20, 42 },
  ]
}
```
