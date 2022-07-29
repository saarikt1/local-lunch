/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id SERIAL PRIMARY KEY,
      name text NOT NULL, 
      subtitle text,
      website text,
      latlon point
    );
  `)
}
