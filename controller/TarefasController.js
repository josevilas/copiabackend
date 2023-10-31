const conn = require("../db/conn");

const read = (request, response) => {
  conn("persons")
    .select()
    .then((persons) => {
      response.json(persons);
    });
};

const create = (request, response) => {
  const { nome, numero, email, endereco, dataDeNascimento } = request.body;

  
 
  if (!nome) {
    return response.status(400).json({
      error: "Nome da tarefa não fornecido",
    });
  }

  conn("persons")
    .insert({ nome, numero, email, endereco, dataDeNascimento })
    .then((tarefa) => {
      response.json(tarefa);
    })
    .catch((error) => {
      response.status(500).json({
        error: "Erro ao inserir nome já cadsatrado no banco de dados",
      });
    });
};

const update = (request, response) => {
  const { nome, numero, email, endereco, dataDeNascimento } = request.body;
  const id = Number(request.params.id);

  if (!nome) {
    return response.status(400).json({
      error: "Nome da tarefa não fornecido",
    });
  }
  conn("persons")
    .update({ nome: nome, numero: numero, email: email, endereco: endereco, dataDeNascimento: dataDeNascimento  })
    .where({ id: id })
    .then((_) => {
      response.status(200).json({ msg: "Tarefa atualizada com sucesso!" });
    })
    .catch((error) => {
      response.status(500).json({
        error: "Erro ao inserir a tarefa no banco de dados",
      });
    }); 
};

const readById = (request, response) => {
  const id = Number(request.params.id);
  conn("persons")
    .first()
    .where({ id: id })
    .then((persons) => {
      response.status(200).json(persons);
    })
    .catch((error) => {
      response.status(500).json({
        error: "Erro ao buscar a tarefa no banco de dados!",
      });
    });
};

const del = (request, response) => {
    const id = Number(request.params.id);
    conn("persons")
      .del()
      .where({ id: id })
      .then((_) => {
        response.status(200).json({ msg: "A tarefa foi excluida!" });
      })
      .catch((error) => {
        response.status(500).json({
          error: "Erro ao excluir a tarefa no banco de dados!",
        });
      });
  }

module.exports = { read, create, update, readById, del };
