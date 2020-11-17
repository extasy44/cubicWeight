const {
  listProductsByCategory,
  getAverageCubicWeight,
  convertToCubicWeight,
  categoryProducts,
} = require('./');

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

describe('fetchData', () => {
  test('fetches successfully data from an API', async () => {
    const result = await listProductsByCategory('/api/products/1', 'Batteries');
    await expect(categoryProducts.length).toBe(5);
  });

  test('fetches erroneously data from an API', async () => {
    await expect(
      listProductsByCategory('/api/productss/1', 'Air Conditioners')
    ).rejects.toThrow();
  });
});

test('Should returns the correct cubic weight', () => {
  expect(convertToCubicWeight(sampleProductsData[0].size)).toEqual(
    0.8450000000000002
  );
});

test('Should returns the correct average cubic weight', () => {
  expect(getAverageCubicWeight(sampleProductsData)).toEqual(21.777160000000002);
});
