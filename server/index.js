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

app.get('/api/reqStatus', (req, res) => {
  const sql = `
      SELECT
             "requestId",
             "status"
        FROM "requests";
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

app.get('/api/approvedPlans', (req, res) => {
  const sql = `
      SELECT
             "requestId",
             "status",
             "title",
             "time",
             "plans"."location",
             "description",
             "planId",
             "photoUrl",
             "fullName"
        FROM "requests"
        JOIN "plans" USING ("planId")
        JOIN "users" USING ("userId")
       WHERE "status" = 'Approved'
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

app.get('/api/updatePlans/:planId', (req, res) => {
  const planId = parseInt(req.params.planId, 10);
  if (!planId) {
    res.status(400).json({
      error: 'testing'
    });
    return;
  }
  const sql = `
      SELECT
             "title",
             "time",
             "plans"."location",
             "description",
             "photoUrl",
             "fullName",
             "planId"
        FROM "requests"
        JOIN "plans" USING ("planId")
        JOIN "users" USING ("userId")
       WHERE "planId" = $1
  `;
  const params = [planId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/updateProfile/:userId', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (!userId) {
    res.status(400).json({
      error: 'testing'
    });
    return;
  }
  const sql = `
      SELECT
             "userId",
             "location",
             "fullName",
             "aboutMe",
             "photoUrl"
        FROM "users"
       WHERE "userId" = $1
 `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/pendingPlans', (req, res) => {
  const sql = `
      SELECT
             "requestId",
             "status",
             "title",
             "time",
             "plans"."location",
             "planId",
             "photoUrl",
             "fullName"
        FROM "requests"
        JOIN "plans" USING ("planId")
        JOIN "users" USING ("userId")
       WHERE "status" = 'Denied'
          OR "status" = 'pending';
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
  const userId = 2;
  const sql = `
      SELECT
             "status",
             "photoUrl",
             "fullName",
             "title",
             "time",
             "plans"."location",
             "description",
             "planId",
             "requestId"
        FROM "requests"
        JOIN "plans" USING ("planId")
        JOIN "users" ON "users"."userId"="requests"."toUserId"
       WHERE "users"."userId" = $1
         AND "status" = 'pending';
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const requests = result.rows;
      res.json(requests);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/profile', (req, res) => {
  const userId = 1;
  const sql = `
      SELECT
             "photoUrl",
             "fullName",
             "location",
             "userId",
             "aboutMe"
        FROM "users"
        WHERE "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
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
      const fromUserId = userId;
      const planId = result.rows[0].planId;
      const { toUserId } = req.body;
      if (!toUserId || !planId || !fromUserId) {
        res.status(400).json({
          error: 'toUserId and planId are required'
        });
        return;
      }
      const requestSql = `
      INSERT INTO requests("toUserId", "planId", "fromUserId")
      VALUES ($1, $2, $3)
      RETURNING *
    `;
      const requestParams = [toUserId, planId, fromUserId];
      db.query(requestSql, requestParams)
        .then(newRequest => {
          const [dataToSendToClient] = newRequest.rows;
          res.status(201).json(dataToSendToClient);
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.put('/api/approvedPlans/:planId', (req, res) => {
  const { title, time, location, description } = req.body;
  const planId = parseInt(req.params.planId);

  if (!Number.isInteger(planId) || planId <= 0) {
    res.status(400).json({ error: '"planId" must be a positive integer' });
    return;
  }
  if (!title) {
    res.status(400).json({ error: 'Must have a title' });
    return;
  } else if (!time) {
    res.status(400).json({ error: 'Must have a time' });
    return;
  } else if (!location) {
    res.status(400).json({ error: 'Must have a location' });
    return;
  } else if (!description) {
    res.status(400).json({ error: 'Must have a descripton' });
    return;
  }

  const sql = `
    UPDATE "plans"
       SET "title" = $1,
           "time" = $2,
           "location" = $3,
           "description" = $4
     WHERE "planId" = $5
 RETURNING *;
  `;

  const params = [title, time, location, description, planId];

  db.query(sql, params)
    .then(data => {
      const [updatePlan] = data.rows;
      if (!updatePlan) {
        res.status(404).json({ error: `Cannot find plan with "planId" ${planId}` });
      }

      res.json(updatePlan);
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('Insert plan error:', err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.put('/api/profile/:userId', (req, res) => {
  const { aboutMe, location } = req.body;
  const userId = parseInt(req.params.userId);

  if (!Number.isInteger(userId) || userId <= 0) {
    res.status(400).json({ error: '"userId" must be a positive integer' });
    return;
  }
  if (!aboutMe) {
    res.status(400).json({ error: 'Must have a title' });
    return;
  } else if (!location) {
    res.status(400).json({ error: 'Must have a location' });
    return;
  }

  const sql = `
    UPDATE "users"
       SET "aboutMe" = $1,
           "location" = $2
     WHERE "userId" = $3
 RETURNING *;
  `;

  const params = [aboutMe, location, userId];

  db.query(sql, params)
    .then(data => {
      const [updateProfile] = data.rows;
      if (!updateProfile) {
        res.status(404).json({ error: `Cannot find plan with "userId" ${userId}` });
      }

      res.json(updateProfile);
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('Insert plan error:', err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.patch('/api/reqStatus/:requestId', (req, res) => {
  const { status } = req.body;
  const requestId = parseInt(req.params.requestId, 10);
  if (!Number.isInteger(requestId)) {
    res.status(400).json({
      error: 'requestId must be a positive integer'
    });
    return;
  }
  if (!status) {
    res.status(400).json({
      error: 'status is a required field'
    });
    return;
  }
  const sql = `
    update "requests"
       set "status" = $1
     where "requestId" = $2
     returning *
  `;
  const params = [status, requestId];
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

app.delete('/api/deleteReq/:requestId', (req, res) => {
  const requestId = req.params.requestId;
  const sql = `
      DELETE FROM "requests"
            WHERE "requestId" = $1
        RETURNING *;
  `;
  const params = [requestId];
  db.query(sql, params)
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

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
