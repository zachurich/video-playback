import mysql from "promise-mysql";

const options = {
  host: "localhost",
  user: "root",
  database: "videoPlayback",
  password: "",
};

const connect = async () => {
  const connection = await mysql.createConnection(options);
  return connection;
};

const pool = async () => {
  const pool = await mysql.createPool(options);
  const connection = await pool.getConnection();
  return connection;
};

export default {
  pool,
  connect,
};
