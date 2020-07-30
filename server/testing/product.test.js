const request = require('supertest')
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { newToken, verify } = require('../helper/jwt')
const { hashPassword, comparePassword } = require('../helper/bcrypt')
const app = require('../app')


let dummyuser = {
    email: 'dummyuser@contoh.com',
    password: '123456',
    role: 'Admin'
}

let token = newToken({
    id: 1,
    email: dummyuser.email
})

describe('Product Router', () => {
    beforeAll((done) => {
        queryInterface.bulkInsert('Users', [
            {
                id: 1,
                role: dummyuser.role,
                email: dummyuser.email,
                password: hashPassword(dummyuser.password),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])

            .then(() => {
                return queryInterface.bulkDelete('Products')
            })
            .then(() => {
                return queryInterface.bulkInsert('Products', [
                    // INI KALAU MAU INSERT PRODUCT JUGA BSA YA, BUAT TEST NGE DELET PRODUCT ATAU UPDATE PRODUCT
                    {
                        id: 1,
                        name: 'Sepeda Gunung',
                        image_url: 'http://www.sepedagunung.com/img.jpg',
                        price: 1000000,
                        stock: 3,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                ])
            })
            .then(() => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    afterAll((done) => {
        // DISINI BISA DI HAPUS LAGI DATA USER SEBELUMYA
        queryInterface
            .bulkDelete('Users')
            .then(() => {
                done();
            })
            .catch(err => {
                done(err);
            });
    })

    describe('Create product', () => {
        describe('Success create product', () => {
            test('Return status code 201 with keys data and notif', (done) => {
                let newProduct = {
                    name: 'Sepeda Ontel',
                    image_url: 'http://www.contoh.com/img.jpg',
                    price: 25000,
                    stock: 3
                }
                request(app)
                    .post('/product')
                    .set('token', token)
                    .send(newProduct)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(201)
                            expect(response.body.data).toHaveProperty('id', expect.any(Number))
                            expect(response.body.data).toHaveProperty('name', newProduct.name)
                            expect(response.body.data).toHaveProperty('price', newProduct.price)
                            expect(response.body.data).toHaveProperty('stock', newProduct.stock)
                            expect(response.body).toHaveProperty('msg', `${newProduct.name} added to product list`)
                            return done()
                        }
                    })
            })
        })

        describe('ERR Create Product', () => {
            describe('invalid token', () => {
                test('Return status code 401 with keys err', (done) => {
                    let newProduct = {
                        name: "Sepeda Ontel",
                        image_url: "http://www.contoh.com/img.jpg",
                        price: 1000000,
                        stock: 3
                    }
                    const errors = ['Token not found']
                    request(app)
                        .post('/product')
                        .send(newProduct)
                        .end((err, response) => {
                            if (err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(401)
                                expect(response.body).toHaveProperty('error', errors)
                                return done()
                            }
                        })
                })
            })
            describe('Empty Product Name', () => {
                test('Return status code 400 with keys err', (done) => {
                    let newProduct = {
                        name: '',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 1000000,
                        stock: 3
                    }
                    const errors = ['Product name is required']
                    request(app)
                        .post('/product')
                        .send(newProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Empty Image URL', () => {
                test('Return status code 400 with keys err', (done) => {
                    let newProduct = {
                        name: 'Sepeda Ontel',
                        image_url: '',
                        price: 1000000,
                        stock: 3
                    }
                    const errors = ["Please upload an image", "Invalid URL format"]
                    request(app)
                        .post('/product')
                        .send(newProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Invalid URL format', () => {
                test('Return status code 400 with keys err', (done) => {
                    let newProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'thisisnturl',
                        price: 1000000,
                        stock: 3
                    }
                    const errors = ['Invalid URL format']
                    request(app)
                        .post('/product')
                        .send(newProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Empty price field', () => {
                test('Return status code 400 with keys err', (done) => {
                    let newProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: '',
                        stock: 3
                    }
                    const errors = ["Invalid price value", "Price is required"]
                    request(app)
                        .post('/product')
                        .send(newProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Price < 0', () => {
                test('Return status code 400 with keys err', (done) => {
                    let newProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: -1000,
                        stock: 3
                    }
                    const errors = [
                         `Invalid price value`
                        
                    ]
                    request(app)
                        .post('/product')
                        .send(newProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Price is NaN', () => {
                test('Return status code 400 with keys err', (done) => {
                    let newProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 'NotaNumber',
                        stock: 3
                    }
                    const errors = [
                         `Invalid price value`
                        
                    ]
                    request(app)
                        .post('/product')
                        .send(newProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Stock field is empty', () => {
                test('Return status code 400 with keys err', (done) => {
                    let newProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 10000,
                        stock: ''
                    }
                    const errors = ["Please input stock", "Invalid stock value"]
                    request(app)
                        .post('/product')
                        .send(newProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Stock < 0', () => {
                test('Return status code 400 with keys err', (done) => {
                    let newProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 10000,
                        stock: -2
                    }
                    const errors = ["Invalid stock value"]
                        
                    
                    request(app)
                        .post('/product')
                        .send(newProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Stock is NaN', () => {
                test('Return status code 400 with keys err', (done) => {
                    let newProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 10000,
                        stock: 'banyak'
                    }
                    const errors = ["Invalid stock value"]
                        
                    
                    request(app)
                        .post('/product')
                        .send(newProduct)
                        .set('token', token)
                        .end((err, response) => {
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
    })
    
    describe('Update Product', () => {
        describe('Success update product', () => {
            test('Return status 200, updated item data and notif', (done) => {
                let editedProduct = {
                    name: 'Sepeda Edited',
                    image_url: 'http://www.contohedited.com/img.jpg',
                    price: 1500000,
                    stock: 13
                }
                request(app)
                    .put('/product/1')
                    .set('token', token)
                    .send(editedProduct)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            console.log(response.body, `<><><><>`)
                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('name', editedProduct.name)
                            expect(response.body).toHaveProperty('price', editedProduct.price)
                            expect(response.body).toHaveProperty('stock', editedProduct.stock)
                            return done()
                        }
                    })
            })
        })
        describe('Err Update Product', () => {
            describe('invalid token', () => {
                test('Return status code 401 with keys err', (done) => {
                    let editedProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 1000000,
                        stock: 3
                    }
                    const errors =  ["Token not found"]
                    request(app)
                        .put('/product/1')
                        .send(editedProduct)
                        .end((err, response) => {
                            if (err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(401)
                                expect(response.body).toHaveProperty('error', errors)
                                return done()
                            }
                        })
                })
            })
            describe('Empty Product Name', () => {
                test('Return status code 400 with keys err', (done) => {
                    let editedProduct = {
                        name: '',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 1000000,
                        stock: 3
                    }
                    const errors = [`Product name is required`]
                    request(app)
                        .put('/product/1')
                        .send(editedProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            
            describe('Empty Image URL', () => {
                test('Return status code 400 with keys err', (done) => {
                    let editedProduct = {
                        name: 'Sepeda Ontel',
                        image_url: '',
                        price: 1000000,
                        stock: 3
                    }
                    const errors = ["Please upload an image", "Invalid URL format"]
                    request(app)
                        .put('/product/1')
                        .send(editedProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Invalid URL format', () => {
                test('Return status code 400 with keys err', (done) => {
                    let editedProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'invalidformat',
                        price: 1000000,
                        stock: 3
                    }
                    const errors = [`Invalid URL format`]
                    request(app)
                        .put('/product/1')
                        .send(editedProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Empty price field', () => {
                test('Return status code 400 with keys err', (done) => {
                    let editedProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: '',
                        stock: 3
                    }
                    const errors = ["Invalid price value", "Price is required",]
                    request(app)
                        .put('/product/1')
                        .send(editedProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Price < 0', () => {
                test('Return status code 400 with keys err', (done) => {
                    let editedProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: -1000,
                        stock: 3
                    }
                    const errors = [`Invalid price value`]
                    request(app)
                        .put('/product/1')
                        .send(editedProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Price is NaN', () => {
                test('Return status code 400 with keys err', (done) => {
                    let editedProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 'NotaNumber',
                        stock: 3
                    }
                    const errors = [`Invalid price value`]
                    request(app)
                        .put('/product/1')
                        .send(editedProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Stock field is empty', () => {
                test('Return status code 400 with keys err', (done) => {
                    let editedProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 10000,
                        stock: ''
                    }
                    const errors = ["Please input stock", "Invalid stock value"]
                    request(app)
                        .put('/product/1')
                        .send(editedProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Stock < 0', () => {
                test('Return status code 400 with keys err', (done) => {
                    let editedProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 10000,
                        stock: -2
                    }
                    const errors = ["Invalid stock value"]
                    request(app)
                        .put('/product/1')
                        .send(editedProduct)
                        .set('token', token)
                        .end((err, response) => {
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
            describe('Stock is NaN', () => {
                test('Return status code 400 with keys err', (done) => {
                    let editedProduct = {
                        name: 'Sepeda Ontel',
                        image_url: 'http://www.contoh.com/img.jpg',
                        price: 10000,
                        stock: 'banyak'
                    }
                    const errors = ["Invalid stock value"]
                    request(app)
                        .put('/product/1')
                        .send(editedProduct)
                        .set('token', token)
                        .end((err, response) => {
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
    })
    describe('Delete product', () => {
        describe('Success delete product', () => {
            test('return status 200 and success delete msg', (done) => {
                request(app)
                    .delete('/product/1')
                    .set('token', token)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('msg', `Item deleted`)
                            return done()
                        }
                    })
            })
        })
        describe('Err delete product', () => {
            describe('Invalid Token', () => {
                test('Return status code 401 with keys err', (done) => {
                    const errors = ["Token not found"]
                    
                    request(app)
                        .delete('/product/1')
                        
                        .end((err, response) => {
                            if (err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(401)
                                expect(response.body).toHaveProperty('error', errors)
                                return done()
                            }
                        })
                })
            })
            describe('Invalid Item', () => {
                test('Return status code 400 with keys err', (done) => {
                    const errors = ["Invalid Item"]
                    request(app)
                        .delete('/product/10')
                        .set('token', token)
                        .end((err, response) => {
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
    })
})