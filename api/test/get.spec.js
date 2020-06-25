import chai from 'chai';
import chaiHttp from 'chai-http';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('get', () => {

    context('quando eu tenho tarefas cadastradas', () => {

        before(async () => {
            let tasks = [
                { title: 'Estudar NodejS', owner: 'eu@henrique.io', done: false },
                { title: 'Comprar ceva', owner: 'eu@henrique.io', done: false },
                { title: 'Estudar MongoDB', owner: 'eu@henrique.io', done: true }
            ]

            await tasksModel.insertMany(tasks);
        })

        it('deve retornar uma lista', async () => {
            const res = await request
                .get('/task')
                    expect(res).to.has.status(200);
                    expect(res.body.data).to.be.an('array');
        })

        it('deve filtrar por palavra chave', async () => {
            const res = await request
                .get('/task')
                .query({ title: 'Estudar' })
                    expect(res).to.has.status(200);
                    expect(res.body.data[0].title).to.equal('Estudar NodejS')
                    expect(res.body.data[1].title).to.equal('Estudar MongoDB')
        })
    })

    context('quando busco por id', ()=> {

        it('deve retornar uma única tarefa', async () => {
            let tasks = [
                { title: 'Ler um livro de Javascript', owner: 'eu@henrique.io', done: false },
            ]

            const task = await tasksModel.insertMany(tasks)
                let id = task[0]._id
                
                const res = await request
                    .get('/task/' + id)
                        expect(res).to.has.status(200);
                        expect(res.body.data.title).to.equal(task[0].title);        
        })
    })

    context('quando a tarefa nao existe', ()=> {

        it('deve retornar 404', async () => {
            let id = require('mongoose').Types.ObjectId();
            const res = await request
                .get('/task/' + id)
                    expect(res).to.has.status(404);
                    expect(res.body).to.eql({});            
        })
    })
})