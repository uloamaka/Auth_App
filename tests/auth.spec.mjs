import { expect } from 'chai';
import supertest from 'supertest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const server = require('../src/app');

const request = supertest(server);

describe('Auth API', () => {
    describe('POST /auth', () => {
        it('should register user successfully with default organisation', (done) => {
            const user = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '09068809999',
            };

            request
                .post('/auth/register')
                .send(user)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body).to.have.property(
                        'message',
                        'Registration successful'
                    );
                    expect(res.body.data).to.have.property('accessToken');
                    expect(res.body.data.user).to.have.property('userId');
                    expect(res.body.data.user).to.have.property(
                        'firstName',
                        'John'
                    );
                    expect(res.body.data.user).to.have.property(
                        'lastName',
                        'Doe'
                    );
                    expect(res.body.data.user).to.have.property(
                        'email',
                        'john.doe@example.com'
                    );
                    expect(res.body.data.user).to.have.property(
                        'phone',
                        '09068809999'
                    );
                    // Uncomment and adjust the line below if your response includes organisation data
                    // expect(res.body.data.user.organisation).to.have.property('name', "John's Organisation");
                    done();
                });
        });

        it('should log the user in successfully', (done) => {
            const credentials = {
                email: 'john.doe@example.com',
                password: 'password123',
            };

            request
                .post('/auth/login')
                .send(credentials)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body).to.have.property(
                        'message',
                        'Login successful'
                    );
                    expect(res.body.data).to.have.property('accessToken');
                    expect(res.body.data.user).to.have.property('userId');
                    expect(res.body.data.user).to.have.property(
                        'firstName',
                        'John'
                    );
                    expect(res.body.data.user).to.have.property(
                        'lastName',
                        'Doe'
                    );
                    expect(res.body.data.user).to.have.property(
                        'email',
                        'john.doe@example.com'
                    );
                    expect(res.body.data.user).to.have.property(
                        'phone',
                        '09068809999'
                    );
                    done();
                });
        });

        it('should fail if required fields are missing', (done) => {
            const incompleteUsers = [
                {
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
                {
                    firstName: 'John',
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
                { firstName: 'John', lastName: 'Doe', password: 'password123' },
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                },
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            ];

            incompleteUsers.forEach((user, index) => {
                request
                    .post('/auth/register')
                    .send(user)
                    .expect(422)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property(
                            'status',
                            'Bad request'
                        );
                        expect(res.body).to.have.property(
                            'message',
                            'Registration unsuccessful'
                        );
                        if (index === incompleteUsers.length - 1) done();
                    });
            });
        });

        it('should fail if there is a duplicate email or userID', (done) => {
            const user = {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'john.doe@example.com', // Duplicate email
                password: 'password123',
                phone: '09068809999',
            };

            request
                .post('/auth/register')
                .send(user)
                .expect(422)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status', 'Bad request');
                    expect(res.body).to.have.property(
                        'message',
                        'Registration unsuccessful'
                    );
                    done();
                });
        });
    });
});
