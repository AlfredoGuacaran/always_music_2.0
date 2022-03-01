import pg from 'pg';
const { Client, Pool } = pg;

const configPool = {
  user: 'postgres',
  host: 'localhost',
  password: '1234',
  database: 'escuela',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(configPool);

// query para nuevo estudiante
export async function newStudent(nombre, rut, curso, nivel) {
  pool.connect(async (errorConex, client, release) => {
    if (errorConex)
      return console.log(
        `Ha ocurrido un error COD ${errorConex.code}: `,
        errorConex.message
      );
    try {
      const SqlQuery = {
        name: 'fetch-user',
        text: 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *;',
        values: [nombre, rut, curso, nivel],
      };
      await client.query(SqlQuery);
      console.log(`Estudiante ${nombre} agregado con éxito`);
    } catch (error) {
      console.log(`Hubo un error ${error.code}:
        ${error.message},
        Revise los datos ingresados`);
    }
    release();
    pool.end();
  });
}

// query para consultar estudiante por rut
export async function searchStudent(rut) {
  pool.connect(async (errorConex, client, release) => {
    if (errorConex)
      return console.log(
        `Ha ocurrido un error COD ${errorConex.code}: `,
        errorConex.message
      );
    try {
      const SqlQuery = {
        name: 'fetch-user',
        text: 'SELECT * FROM estudiantes WHERE rut = $1',
        values: [rut],
      };
      const res = await client.query(SqlQuery);
      console.log(res.rows[0] ? res.rows[0] : 'Rut no existe');
    } catch (error) {
      console.log(`Hubo un error ${error.code}:
        ${error.message},
        Revise los datos ingresados`);
    }
    release();
    pool.end();
  });
}

// query para consultar estudiante por rut
export async function consulta() {
  pool.connect(async (errorConex, client, release) => {
    if (errorConex)
      return console.log(
        `Ha ocurrido un error COD ${errorConex.code}: `,
        errorConex.message
      );
    try {
      const SqlQuery = {
        name: 'fetch-user',
        rowMode: 'array',
        text: 'SELECT * FROM estudiantes',
      };
      const res = await client.query(SqlQuery);
      console.log('Registro actual de estudiantes:', res.rows);
    } catch (error) {
      console.log(`Hubo un error ${error.code}:
        ${error.message},
        Revise los datos ingresados`);
    }
    release();
    pool.end();
  });
}

// query para editar estudiante
export async function editar(nombre, rut, curso, nivel) {
  pool.connect(async (errorConex, client, release) => {
    if (errorConex)
      return console.log(
        `Ha ocurrido un error COD ${errorConex.code}: `,
        errorConex.message
      );

    try {
      const SqlQuery = {
        name: 'fetch-user',
        text: 'UPDATE estudiantes SET nombre = $1 , curso = $3 , nivel = $4  WHERE rut = $2  RETURNING *;',
        values: [nombre, rut, curso, nivel],
      };

      const res = await client.query(SqlQuery);
      if (!res.rowCount)
        console.log(`Error!!! el rut ${rut} no se encuentra registrado`);
      console.log(`Estudiante ${nombre} editado con éxito`);
    } catch (error) {
      console.log(`Hubo un error ${error.code}:
        ${error.message},
        Revise los datos ingresados`);
    }
    release();
    pool.end();
  });
}

// query para consultar estudiante por rut
export async function eliminar(rut) {
  pool.connect(async (errorConex, client, release) => {
    if (errorConex)
      return console.log(
        `Ha ocurrido un error COD ${errorConex.code}: `,
        errorConex.message
      );
    try {
      const SqlQuery = {
        name: 'fetch-user',
        text: 'DELETE FROM estudiantes WHERE rut = $1',
        values: [rut],
      };
      const res = await client.query(SqlQuery);
      console.log(
        res.rowCount
          ? `Estudiante con Rut: ${rut} eliminado con éxito`
          : `Error!!! el rut ${rut} no se encuentra registrado`
      );
    } catch (error) {
      console.log(`Hubo un error ${error.code}:
        ${error.message},
        Revise los datos ingresados`);
    }
    release();
    pool.end();
  });
}
