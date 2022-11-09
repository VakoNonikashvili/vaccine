# Vaccine (Task V3)


## Installation & Usage

1. Clone repository
2. Open root folder of repository
3. Install dependencies with [yarn](https://yarnpkg.com/)
4. Create `.env` file in root folder
5. In `.env` file specify `DB_URL` property (you can also specify `PORT` and `NODE_ENV` but they are optional)
6. You need to seed data before start development server. Run `yarn seed`. When seeding finish you will see message in console.
7. Run `yarn dev` to set up development server
8. Example Url: 
```
http://localhost:8000/vaccine-summary?c=AT&dateFrom=2020-W53&dateTo=2021-W50&range=10&sort=weekStart
```
#### Note: Only sort is optional parameter, all other is required

### Testing
Run `yarn test` for test cases

I am using `mongodb-memory-server` package instead of `Mongo-mock` because it supports aggregations.

### Linting
Run `yarn lint` for eslint

### Building and running for production
1. `yarn build` compiles typescript into javascript in `<rootDir>/build` folder
2. `yarn start` compiles and run production build`


## License

[MIT](https://choosealicense.com/licenses/mit/)