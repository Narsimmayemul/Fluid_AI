const request = require('supertest');
const app = require('../index'); // Assuming index.js is in the parent directory

describe('GET /api/products', () => {
  it('should get all products', async () => {
    const res = await request(app)
      .get('/api/products')
      .expect(200);
    expect(res.body).toBeDefined();
    expect(res.body.length).toBeGreaterThanOrEqual(0); 
  });

  it('should handle errors in GET /api/products', async () => {
    const res = await request(app)
      .get('/api/products')
      .expect(500); 
    expect(res.text).toContain('Error From Get Function');
  });
});

describe('GET /api/products/:id', () => {
  it('should get a product by id', async () => {
    const productId = '66704f71989cf436973e8620'; 
    const res = await request(app)
      .get(`/api/products/${productId}`)
      .expect(200);
    expect(res.body).toBeDefined();
    expect(res.body._id).toBe(_id); 
  });

  it('should handle product not found in GET /api/products/:id', async () => {
    const nonExistentId = '66704f71989cf436973e8621';
    const res = await request(app)
      .get(`/api/products/${nonExistentId}`)
      .expect(404);
    expect(res.text).toContain('Product not found');
  });

  it('should handle errors in GET /api/products/:id', async () => {
    const res = await request(app)
      .get('/api/products/invalid_id')
      .expect(500); 
    expect(res.text).toContain('Error From Get By ID Function');
  });
});

describe('POST /api/products/add', () => {
  it('should add a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      price: 99.99,
      type: 'Electronics',
    };
    const res = await request(app)
      .post('/api/products/add')
      .send(newProduct)
      .expect(200);
    expect(res.text).toContain('data posted');
  });

  it('should handle errors in POST /api/products/add', async () => {
    const res = await request(app)
      .post('/api/products/add')
      .send({})
      .expect(500); // Adjust to the appropriate error status code
    expect(res.text).toContain('Error From add Function');
  });
});

describe('PUT /api/products/:id', () => {
  it('should update a product by id', async () => {
    const productId = 'existing_product_id'; // Replace with an actual product ID in your database
    const updatedProduct = {
      name: 'Updated Product Name',
      price: 129.99,
    };
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .send(updatedProduct)
      .expect(200);
    expect(res.text).toContain('Product updated');
  });

  it('should handle product not found in PUT /api/products/:id', async () => {
    const res = await request(app)
      .put('/api/products/non_existent_id')
      .send({})
      .expect(404);
    expect(res.text).toContain('Product not found');
  });

  it('should handle errors in PUT /api/products/:id', async () => {
    const res = await request(app)
      .put('/api/products/invalid_id')
      .send({})
      .expect(500); // Adjust to the appropriate error status code
    expect(res.text).toContain('Error From put Function');
  });
});

describe('DELETE /api/products/:id', () => {
  it('should delete a product by id', async () => {
    const productId = 'existing_product_id'; // Replace with an actual product ID in your database
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .expect(200);
    expect(res.text).toContain('Product deleted');
  });

  it('should handle product not found in DELETE /api/products/:id', async () => {
    const res = await request(app)
      .delete('/api/products/non_existent_id')
      .expect(404);
    expect(res.text).toContain('Product not found');
  });

  it('should handle errors in DELETE /api/products/:id', async () => {
    const res = await request(app)
      .delete('/api/products/invalid_id')
      .expect(500); // Adjust to the appropriate error status code
    expect(res.text).toContain('Error From delete Function');
  });
});
