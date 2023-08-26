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

const createTodo = async (todo)=>{
    const pool = await sql.connect(dbconfig);
    const query = `INSERT INTO todo_app.dbo.todo
                    (title, description, iscomplete)
                    VALUES(@title, @description, @iscomplete);
                    `
    const ps = new sql.PreparedStatement(pool);
    ps.input('title', sql.VarChar(4000));
    ps.input('description', sql.VarChar(4000));
    ps.input('iscomplete', sql.Bit);
    ps.input('id', sql.Int);

    await ps.prepare(query);
    await ps.execute({
        'title': todo.title,
        'description': todo.description,
        'iscomplete': todo.iscomplete,
        'id': todo.id
    });
    await ps.unprepare();

    return;

}

const updateTodoById = async (todo)=>{
    const pool = await sql.connect(dbconfig);
    const query = `UPDATE todo_app.dbo.todo
                SET title= @title, 
                description=@description, 
                iscomplete=@iscomplete
                WHERE id=@id;
                `
    const ps = new sql.PreparedStatement(pool);
    ps.input('title', sql.VarChar(4000));
    ps.input('description', sql.VarChar(4000));
    ps.input('iscomplete', sql.Bit);
    ps.input('id', sql.Int);

    await ps.prepare(query);
    await ps.execute({
        'title': todo.title,
        'description': todo.description,
        'iscomplete': todo.iscomplete,
        'id': todo.id
    });
    await ps.unprepare();

    return;

}

module.exports = {createTodo,getTodos,getTodoById,updateTodoById}