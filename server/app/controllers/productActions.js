// Import access to database tables
const client = require("../../database/client");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const [products] = await client.query("SELECT p.id, p.Nom, p.Rayon_id, p.Statut_id, r.Nom as Rayon_Nom, s.Nom as Statut_Nom FROM produit as p INNER JOIN statut as s ON s.id = p.statut_id INNER JOIN rayon as r on r.id = p.Rayon_id");

    // Respond with the items in JSON format
    res.status(200).json(products);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const item = await client.query("SELECT * FROM produit where id = ? ", [
      req.params.id,
    ]);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const item = req.body;

  try {
    // Insert the item into the database
    const insertId = await client.query("INSERT INTO produit(name) VALUES (?)", [
      item.title,
    ]);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  // destroy,
};
