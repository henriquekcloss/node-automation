import chai from 'chai';
import chaiHttp from 'chai-http';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('put', () => {

    context('Quando eu altero uma tarefa', () => {
        let task = {
            _id: require('mongoose').Types.ObjectId(),
            title: 'Comprar Fandangos',
            owner: 'eu@henrique.io',
            done: false
        }

        before(async () => {
            await tasksModel.insertMany([task])
        })

        it('Então deve retornar 200', async () => {
            task.title = 'Comprar vinho';
            task.done = true;

            const res = await request
                .put('/task/' + task._id)
                .send(task)
                    expect(res).to.has.status(200);
                    expect(res.body).to.eql({});
        })

        it('E deve retornar os dados atualizados', async () => {
            const res = await request
                .get('/task/' + task._id)
                    expect(res).to.has.status(200);
                    expect(res.body.data.title).to.equal(task.title);
                    expect(res.body.data.done).to.equal(task.done);
        })
    })
})