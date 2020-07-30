const request = require('supertest')
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const bcrypt = require('bcryptjs')
const app = require('../app')

const admin1 = {
    email: 'admin@mail.com',
    password: 'admin',
    role: 'Admin'
};

beforeAll(done => {
    const salt = bcrypt.genSaltSync(10);
    const admin1HashPassword = bcrypt.hashSync(admin1.password, salt);
    queryInterface
        .bulkInsert('Users', [
            {
                email: admin1.email,
                password: admin1HashPassword,
                role: admin1.role,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
        .then(() => {
            done();
        })
        .catch(err => {
            done(err);
        });
});

afterAll(done => {
    queryInterface
      .bulkDelete('Users')
      .then(() => {
        done();
        
      })
      .catch(err => {
        done(err);
        
      });
  });


describe('User', () => {
    describe('POST /login', () => {
        describe('success login', () => {
            test('should send token', done => {
                request(app)
                    .post('/login')
                    .send(admin1)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('token', expect.any(String))
                            expect(response.body).toHaveProperty('msg', `${admin1.email} logged in succesfully!`)
                            expect(response.body).not.toHaveProperty('password');
                            return done()
                        }
                    })
            })
        })
        describe(`ERR LOGIN || Empty Field Email`, () => {
            test('should send  empty field msg', done => {
                const emptyEmail = { ...admin1, }
                emptyEmail.email = ''
                const errors = [ 'Invalid Email/Password']
                request(app)
                .post('/login')
                .send(emptyEmail)
                .end((err,response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', errors)
                        return done()
                    }
                })
            })
        })
        describe(`ERR LOGIN || Empty Field Password`, () => {
            test('should send  empty field msg', done => {
                const emptyPassword = { ...admin1 }
                emptyPassword.password = ''
                const errors = [
                    'Invalid Email/Password'
                ]
                request(app)
                .post('/login')
                .send(emptyPassword)
                .end((err,response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', errors)
                        return done()
                    }
                })
            })
        })
        describe(`ERR LOGIN || Wrong Password`, () => {
            test('should send wrong password msg', done => {
                const wrongPassword = { ...admin1 }
                wrongPassword.password = 'thisiswrong'
                const errors = ['Invalid Email/Password']
                request(app)
                .post('/login')
                .send(wrongPassword)
                .end((err,response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', errors)
                        return done()
                    }
                })
            })
        })
        describe(`ERR LOGIN || Wrong Email`, () => {
            test('should send wrong password msg', done => {
                const wrongEmail = { ...admin1 }
                wrongEmail.email = 'unregistered@mail.com'
                const errors = ['Invalid Email/Password']
                request(app)
                .post('/login')
                .send(wrongEmail)
                .end((err,response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', errors)
                        return done()
                    }
                })
            })
        })
    })
});
