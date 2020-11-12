## Description

API Endpoint : `http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1` <br />
Using the provided API, find the average cubic weight for all products in the "Air Conditioners" category.

### Environment

- `Node.JS`
- `NPM`

### Dependencies

- `axios`

### devDependencies

- `jest`

## Run demo locally

1. Clone this repo

```
 git clone git@github.com:extasy44/cubicWeight.git
```

2. Change directory

```sh
cd cubicWeight
```

3. Install dependencies

```sh
npm install
```

4. Run the app

```sh
npm run dev
```

or

```sh
node index.js
```

```sh
node index.js 'API_URL' 'Category'
```

This will display the average cubic weight of all products in the "Air Conditioners" category or entered category in the response from the API end point.

5. Testing

```sh
npm test
```
