require('dotenv/config');
const express = require('express');
const pg = require('pg');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.get('/api/login', (req, res) => {
  const sql = `
      SELECT
             "userId",
             "fullName"
        FROM "users";
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/available', (req, res) => {
  const sql = `
      SELECT
             "photoUrl",
             "fullName",
             "time",
             "description",
             "availabilityId"
        FROM "availabilities"
        JOIN "users" USING ("userId")
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/notifications', (req, res) => {
  const sql = `
      SELECT
             "photoUrl",
             "fullName",
             "title",
             "time",
             "plans"."location",
             "description",
             "planId"
        FROM "plans"
        JOIN "users" USING ("userId")
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/available', (req, res) => {
  const { time, description } = req.body;
  const userId = 1;
  if (!time || !description) {
    res.status(400).json({
      error: 'time (number) and description (string) are required fields'
    });
    return;
  }
  const sql = `
    INSERT INTO availabilities("time", "description", "userId")
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const params = [time, description, userId];
  db.query(sql, params)
    .then(result => {
      const [status] = result.rows;
      res.status(201).json(status);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/sendRequest', (req, res) => {
  const { title, time, location, description } = req.body;
  const userId = 1;
  if (!title || !time || !location || !description) {
    res.status(400).json({
      error: 'time, title, location, and description are required fields'
    });
    return;
  }
  const sql = `
    INSERT INTO plans("title", "time", "location", "description", "userId")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const params = [title, time, location, description, userId];
  db.query(sql, params)
    .then(result => {
      const [status] = result.rows;
      res.status(201).json(status);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
