import { pool } from "../db/postgresConnection.mjs";

const userModel = {
  createUser: async (newUser) => {
    const { username, password, email, registered_on } = newUser;

    //Sending query to db
    const result = await pool.query(
      "INSERT INTO users (username, password, email, registered_on) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, password, email, registered_on]);

      return result.rows[0];
  },
};

export default userModel;