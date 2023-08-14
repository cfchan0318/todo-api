const sql = require('mssql');
const dbconfig = require('../utils/dbconfig')

const getTodos = async (req, res) => {
    try {
        const pool = await sql.connect(dbconfig);
        let res = await pool.query(`SELECT * FROM todo`);
        return res.recordset;
    } catch (err) {
        console.log(err)
    }
}

const getTodoById = async (toddoId) => {
    try {
        const pool = await sql.connect(dbconfig);
        let res = await pool.query(`SELECT * FROM todo WHERE Id = ${toddoId}`);
        return res.recordset;
    } catch (err) {
        console.log(err)
    }
}

const updateTodoById = async (todo)=>{
    const pool = await sql.connect(dbconfig);
    const query = `UPDATE todo_app.dbo.todo
                SET title= @title, 
                description=@desc, 
                iscomplete=@iscomplete, 
                WHERE id=@id;
                `
    const ps = new sql.PreparedStatement(pool);
    ps.input('title', sql.VarChar());
    ps.input('desc', sql.VarChar());
    ps.input('iscomplete', sql.Bit);
    ps.input('id', sql.Int);

    await ps.prepare(query);
    await ps.execute({

    });
    await ps.unprepare();

}

module.exports = {getTodos,getTodoById}