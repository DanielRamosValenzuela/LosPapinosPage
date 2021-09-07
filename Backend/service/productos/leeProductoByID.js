const sql = require("mssql");
const dbconfig = require("../../database/dbconfig");

const leeProductoByID = async (_id) => {
  try {
    const procedureName = `leeProductoByID`;
    // console.log("lee leeProductoByID sp", _id);
    return await sql
      .connect(dbconfig)
      .then((pool) => {
        console.log("DB on line leeProductoByID");
        return pool
          .request()
          .input("_id", sql.VarChar, _id)
          .execute(procedureName);
      })
      .then((result) => {
        const { recordset } = result;
        //console.log(recordset);
        return recordset;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    throw new Error("Error al conectar BD");
  }
};
module.exports = leeProductoByID;
