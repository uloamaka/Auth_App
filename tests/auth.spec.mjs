import { expect } from 'chai';
import supertest from 'supertest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const app = require('../src/app');
const JWTService = require('../src/services/jwt');
const dayjs = require('dayjs');
const request = supertest(app);

describe('Auth API', () => {
    describe('Ensure token generation and verification', () => {
        let token;
        let expires_at;

        it('should generate a jwt Token valid for 20 mins', async () => {
            const email = 'test@example.com';
            const result = await JWTService.generateToken(email);
            token = result.access_token;
            expires_at = result.expires_at;

            expect(token).to.be.a('string');
            expect(expires_at).to.be.a('number');
        });

        it('should verify provided jwt Token is valid for 20 mins', async () => {
            const decodedToken = await JWTService.verifyAccessToken(token);
            expect(decodedToken).to.have.property('email', 'test@example.com');

            const tokenExpiryTime = dayjs.unix(decodedToken.exp);
            const currentTime = dayjs();
            expect(tokenExpiryTime.isAfter(currentTime)).to.be.true;
            expect(tokenExpiryTime.diff(currentTime, 'minute')).to.be.at.most(
                20
            );
        });
    });
    describe('POST /auth/register', () => {
        it('should register user successfully with default organisation', async () => {
            const user = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe02@example.com',
                password: 'password123',
                phone: '09068809999',
            };

            request
                .post('/auth/register')
                .send(user)
                .expect(201)
                .end((err, res) => {
                    if (err) return err;
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
                        'john.doe02@example.com'
                    );
                    expect(res.body.data.user).to.have.property(
                        'phone',
                        '09068809999'
                    );
                    // expect(res.body.data.user.organisation).to.have.property('name', "John's Organisation");
                });
        });

        it('should fail if there is a duplicate email or userID', async () => {
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
                    if (err) return err;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status', 'Bad request');
                    expect(res.body).to.have.property(
                        'message',
                        'Registration unsuccessful'
                    );
                });
        });
    });
    describe('POST /auth/login', () => {
        it('should log the user in successfully', async () => {
            const credentials = {
                email: 'john.doe2@example.com',
                password: 'password123',
            };

            request
                .post('/auth/login')
                .send(credentials)
                .expect(200)
                .end((err, res) => {
                    if (err) return err;
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
                        'john.doe2@example.com'
                    );
                    expect(res.body.data.user).to.have.property(
                        'phone',
                        '09068809999'
                    );
                });
        });

        it('should fail if required fields are missing', async () => {
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
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    password: 'password123',
                },
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
                        if (err) return (err);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property(
                            'status',
                            'Bad request'
                        );
                        // expect(res.body).to.have.property(
                        //     'message',
                        //     ''
                        // );
                        if (index === incompleteUsers.length - 1);
                    });
            });
        });
    });
    let authToken;
    let userId;

    const testUser = {
        email: 'john.doe2@example.com',
        password: 'password123',
    };

    before(async () => {
        try {
            await request
                .post('/auth/register')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: testUser.email,
                    password: testUser.password,
                })
                .catch(() => {});

            const loginRes = await request
                .post('/auth/login')
                .send(testUser)
                .expect(200);

            authToken = loginRes.body.data.accessToken;
            userId = loginRes.body.data.user.userId;
        } catch (err) {
            console.error('Before hook error:', err.message);
        }
    });
    describe('GET /api/users/:id', () => {
        it(`should return a user's details`, async () => {
            const res = await request
                .get(`/api/users/${userId}`)
                .expect(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal('success');
            expect(res.body.data).to.be.an('object');
        });
    });
    describe('GET /api/organisation', () => {
        it(`should get a user's organisations`, async () => {
            const res = await request
                .get('/api/organisations')
                .set('authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal('success');
            expect(res.body.data).to.be.an('object');
        });
    });
    describe('POST /api/organisation/:orgId', () => {
        it(`should create a new organisation`, async () => {
            const newOrg = {
                name: 'New Organisation',
                description: 'A test organisation',
            };

            const res = await request
                .post('/api/organisations')
                .set('authorization', `Bearer ${authToken}`)
                .send(newOrg)
                .expect(201);
            
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal('success');
            expect(res.body.data).to.have.property('orgId');
            expect(res.body.data.name).to.equal(newOrg.name);
            expect(res.body.data.description).to.equal(newOrg.description);
        });
        it(`should fail when  an organisation does not exists`, async () => {
            const nonExistentOrgId = 'non123udiig-johugj-jfnvn-uhfn';
            const res = await request
                .get(`/api/organisations/${nonExistentOrgId}`)
                .set('authorization', `Bearer ${authToken}`)
                .expect(400);

            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal('Bad request');
            expect(res.body.message).to.equal('Organization does not exist');
        });
    });
});
