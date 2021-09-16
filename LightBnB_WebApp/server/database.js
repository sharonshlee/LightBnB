const properties = require("./json/properties.json");
//const users = require("./json/users.json");

const { Pool } = require("pg");

const pool = new Pool({
  user: "sharonlee",
  host: "localhost",
  database: "lightbnb",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const queryString = `SELECT * FROM users WHERE email = $1`;
  return pool
    .query(queryString, [email])
    .then((result) => {
      if (!result.rows) {
        return null; //user does not exist
      }
      return result.rows[0]; //return user that has that email address, one row
    })
    .catch((err) => {
      console.log("Error Login!", err);
      err.message;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
// const getUserWithId = function (id) {
//   return Promise.resolve(users[id]);
// };
const getUserWithId = function (id) {
  const queryString = `SELECT * FROM users WHERE id = $1`;
  return pool
    .query(queryString, [id])
    .then((result) => {
      //if id does not exist return empty rows
      if (!result.rows) {
        return null;
      }
      return result.rows[0]; // return user with that id, one row
    })
    .catch((err) => {
      err.message;
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [user.name, user.email, user.password];
  return pool
    .query(queryString, values)
    .then((result) => result.rows) //return * users
    .catch((err) => {
      err.message;
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const queryString = `SELECT * 
                      FROM reservations
                      JOIN properties ON property_id = properties.id
                      WHERE guest_id = $1 
                      LIMIT $2`;
  const values = [guest_id, limit];
  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    }) //return * reservations
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1=1 
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += ` AND city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += ` AND owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += ` AND cost_per_night/100 >= $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += ` AND cost_per_night/100 <= $${queryParams.length}`;
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += ` AND rating >= $${queryParams.length}`;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
// const propertyId = Object.keys(properties).length + 1;
// property.id = propertyId;
// properties[propertyId] = property;
// return Promise.resolve(property);
const addProperty = function (property) {
  // Property input object
  // {
  //   owner_id: int,
  //   title: string,
  //   description: string,
  //   thumbnail_photo_url: string,
  //   cover_photo_url: string,
  //   cost_per_night: string,
  //   street: string,
  //   city: string,
  //   province: string,
  //   post_code: string,
  //   country: string,
  //   parking_spaces: int,
  //   number_of_bathrooms: int,
  //   number_of_bedrooms: int
  // }
  const queryString = `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, 
                                             street, city, province, post_code, country, 
                                             parking_spaces, number_of_bathrooms, number_of_bedrooms) 
                                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
                                     RETURNING *`;
  const values = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
  ];
  return pool
    .query(queryString, values)
    .then((result) => result.rows) //return * properties
    .catch((err) => {
      err.message;
    });
};
exports.addProperty = addProperty;
