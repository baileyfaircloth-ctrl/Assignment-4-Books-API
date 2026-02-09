// tests/api.test.js
const request = require('supertest');
const app = require('../server');

describe('Books API', () => {
  let createdBookId;

  test('GET /api/books should return all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/books should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ title: 'New Book', author: 'New Author' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('New Book');
    createdBookId = res.body.id;
  });

  test('GET /api/books/:id should get a book by id', async () => {
    const res = await request(app).get(`/api/books/${createdBookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdBookId);
  });

  test('GET /api/books/:id with invalid id should return 404', async () => {
    const res = await request(app).get('/api/books/99999');
    expect(res.statusCode).toBe(404);
  });

  test('PUT /api/books/:id should update a book', async () => {
    const res = await request(app)
      .put(`/api/books/${createdBookId}`)
      .send({ title: 'Updated Title' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  test('PUT /api/books/:id invalid should return 404', async () => {
    const res = await request(app)
      .put('/api/books/99999')
      .send({ title: 'Does Not Matter' });

    expect(res.statusCode).toBe(404);
  });

  test('DELETE /api/books/:id should delete a book', async () => {
    const res = await request(app).delete(`/api/books/${createdBookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdBookId);
  });

  test('DELETE /api/books/:id invalid should return 404', async () => {
    const res = await request(app).delete('/api/books/99999');
    expect(res.statusCode).toBe(404);
  });
});
