const request = require('supertest')
const app = require('./app')

describe('Todo API', () => {
    beforeEach(() => {
        tasks = [];
    });

    it('deve adicionar uma nova tarefa', async () => {
        const response = await request(app)
        .post('/tasks')
        .send({title: 'Nova Tarefa'})
        .expect(201);

        expect(response.body.title).toBe('Nova Tarefa');
        expect(response.body).toHaveProperty('id');
    });

    it('deve listar todas as tarefas', async () => {
        tasks = []
        await request(app).post('/tasks').send({ title: 'Tarefa 1' });
        await request(app).post('/tasks').send({ title: 'Tarefa 2' });
        
        const response = await request(app)
          .get('/tasks')
          .expect(200);

        expect(response.body.length).toBe(3);
        expect(response.body[1].title).toBe('Tarefa 1');
        expect(response.body[2].title).toBe('Tarefa 2');
      });

      it('deve remover uma tarefa', async () => {
        const response = 
        await request(app).post('/tasks').send({ title: 'Tarefa para Remover' })

    
        await request(app)
          .delete(`/tasks/${response.body.id}`)
          .expect(204);
        
        const getResponse = await request(app)
          .get('/tasks')
          .expect(200);

    
          console.log('QUANTIDADE', getResponse.body.length)
        expect(getResponse.body.length).toBe(3);
      });
    

})