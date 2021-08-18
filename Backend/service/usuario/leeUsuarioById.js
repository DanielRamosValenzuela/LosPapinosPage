const sql = require("mssql");
const dbconfig = require("../../database/dbconfig");

const leeUsuarioById = async (idUsuario) => {
  //para auth
  try {
    const procedureName = `LeeUsuarioByID`;
    // console.log('leeUsuarioById sp', uid );
    return await sql
      .connect(dbconfig)
      .then((pool) => {
        console.log("DB on line LeeUsuarioByID");
        return pool
          .request()
          .input("idUsuario", sql.Int, idUsuario)
          .execute(procedureName);
      })
      .then((result) => {
        const { recordset } = result;
        //console.log('LeeUsuarioById:',recordset)
        return recordset[0];
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    throw new Error("Error al conectar BD");
  }
};
module.exports = leeUsuarioById;
