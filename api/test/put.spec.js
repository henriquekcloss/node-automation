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

        before((done) => {
            tasksModel.insertMany([task])
            done();
        })

        it('Então deve retornar 200', (done) => {
            task.title = 'Comprar vinho';
            task.done = true;

            request
                .put('/task/' + task._id)
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body).to.eql({});
                    done();
                })
        })

        it('E deve retornar os dados atualizados', (done) => {
            request
                .get('/task/' + task._id)
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data.title).to.equal(task.title);
                    expect(res.body.data.done).to.equal(task.done);
                    done();
                })
        })
    })
})
