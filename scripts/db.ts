import mysql, { Connection } from "promise-mysql";

const setUp = async (): Promise<void> => {
  const connection: Connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });

  // Create database
  try {
    await connection.query("CREATE DATABASE videoPlayback");
    console.log("videoPlayback database created");
  } catch (error) {
    if (error.code === "ER_DB_CREATE_EXISTS") {
      console.log("Database already exists");
    } else {
      throw error;
    }
  }

  // Create table
  try {
    await connection.query(
      `CREATE TABLE videoPlayback.videos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255)
      )`
    );

    console.log("videos table created");
  } catch (error) {
    if (error.code === "ER_TABLE_EXISTS_ERROR") {
      console.log("Table already exists");
    } else {
      throw error;
    }
  }

  console.log("Database setup complete.");
  process.exit();
};

setUp();
