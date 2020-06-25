import chai from 'chai';
import chaiHttp from 'chai-http';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('post', () => {

    context('quando eu cadastro uma tarefa', () => {
        let task = { title: 'Estudar Mongoose', owner: 'eu@henrique.io', done: false }

        it('entao deve retornar 200', async () => {
            const res = await request
                .post('/task')
                .send(task)
                    expect(res).to.has.status(200)
                    expect(res.body.data.title).to.be.an('string')
                    expect(res.body.data.owner).to.be.an('string')
                    expect(res.body.data.done).to.be.an('boolean')
        })
    })

    context('quando nao informo o titulo', () => {
        let task = { title: '', owner: 'eu@henrique.io', done: false }

        it('entao deve retornar 400', async () => {
            const res = await request
                .post('/task')
                .send(task)
                    expect(res).to.has.status(400)
        })
    })

    context('quando nao informo o dono', () => {
        let task = { title: 'Nova tarefa', owner: '', done: false }

        it('entao deve retornar 400', async () => {
            const res = await request
                .post('/task')
                .send(task)
                    expect(res).to.has.status(400)
                    expect(res.body.errors.owner.message).to.eql('Oops! Owner is required.')
        })
    })

    context('quando a tarefa já existe', () => {

        let task = { title: 'Planejar viagem para a China', owner: 'eu@henrique.io', done: false }

        before(async () => {
            const res = await request
                .post('/task')
                .send(task)
                    expect(res).to.has.status(200)
        })

        it('deve retornar 409', async () => {
            const res = await request
                .post('/task')
                .send(task)
                    expect(res).to.has.status(409)
                    expect(res.body.errmsg).to.include('duplicate key')
        })
    })
})