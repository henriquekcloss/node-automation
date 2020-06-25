import chai from 'chai';
import chaiHttp from 'chai-http';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('delete', () => {

    context('Quando eu apago uma tarefa', () => {
        let task = {
            _id: require('mongoose').Types.ObjectId(),
            title: 'Tarefa que vai ser deletada',
            owner: 'eu@henrique.io',
            done: false
        }

        before(async () => {
            await tasksModel.insertMany([task]);
        });

        it('Deve retornar 200', async () => {
            const res = await request
                .delete('/task/' + task._id)
                    expect(res).to.has.status(200);
                    expect(res.body).to.eql({});
                })

            after(async () => {
                const res = await request
                    .get('/task/' + task._id)
                        expect(res).to.has.status(404);
                        expect(res.body).to.eql({});
            })
        })

    context('Quando a tarefa não existe', () => {
        let id = require('mongoose').Types.ObjectId();

        it('Deve retornar 404', async () => {
            const res = await request
                .delete('/task/' + id)
                    expect(res).to.has.status(404);
                    expect(res.body).to.eql({});
        })
    })
})