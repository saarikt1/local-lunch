/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id SERIAL PRIMARY KEY,
      name text NOT NULL, 
      website text,
      latlon point
    );
  `)
}
