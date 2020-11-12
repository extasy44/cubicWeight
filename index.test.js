const {
  listProductsByCategory,
  getAverageCubicWeight,
  convertToCubicWeight,
} = require('./');

const url =
  'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1';

sampleProductsData = [
  {
    category: 'Air Conditioners',
    title: 'Window Seal for Portable Air Conditioner Outlets',
    weight: 235,
    size: { width: 26, length: 26, height: 5 },
  },
  {
    category: 'Air Conditioners',
    title: 'Kogan 10,000 BTU Portable Air Conditioner (2.9KW)',
    weight: 26200,
    size: { width: 49.6, length: 38.7, height: 89 },
  },
];

beforeEach(() => {
  jest.spyOn(console, 'error');
  console.error.mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

test('Should returns correct products with the existing category', async () => {
  const result = await listProductsByCategory(url, 'Air Conditioners');
  expect(result.length).toEqual(2);
  expect(result[0].title).toEqual(
    'Window Seal for Portable Air Conditioner Outlets'
  );
});

test('Should returns no product with non-existing category', async () => {
  const result = await listProductsByCategory(url, 'non-existing category');
  expect(result.length).toEqual(0);
});

test('Should throw an error with wrong API URL', async () => {
  const result = listProductsByCategory('http://random.url', 'random category');
  await expect(result).rejects.toThrow();
});

test('Should returns the correct cubic weight', () => {
  expect(convertToCubicWeight(sampleProductsData[0].size)).toEqual(
    0.8450000000000002
  );
});

test('Should returns the correct average cubic weight', () => {
  expect(getAverageCubicWeight(sampleProductsData)).toEqual(21.777160000000002);
});
