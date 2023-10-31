exports.up = function (knex) {
    return knex.schema.createTable('persons', (t) => {
      t.increments();
      t.string('nome', 100).notNull().unique();
      t.string('numero', 19).notNull();
      t.string('email',30 ).notNull();
      t.string('endereco',30 ).notNull(); 
      t.string('dataDeNascimento',30 ).notNull();

      
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('persons');
  };