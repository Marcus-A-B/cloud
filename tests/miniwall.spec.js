const express = require('express')
const app = express()

const request = require('supertest');
//const app = require("../app");


describe('Miniwall test suite', () => {
    // Check if jest is working correctly
    it('My Miniwall Test', () => {
        expect(true).toEqual(true);
    });

    it('tests /root endpoint', async() => {
        const response = await request(app).get("localhost:3000/");
        console.log(response.body);
        expect(response.body).toEqual("{Welcome to your Mini Wall!}");
        expect(response.body).toHaveLength(26);
        expect(response.statusCode).toBe(200);

    });
});

//server.close((err) => {
  //  console.log('server closed')
 // })
