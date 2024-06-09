describe('Testy API Httpbin', () => {
    // Test 1: GET
    it('Test 1: GET with parameters', () => {
        cy.request({
            method: 'GET',
            url: 'https://httpbin.org/get',
            qs: { test: '123' }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.args).to.have.property('test', '123');
        });
    });

    // Test 2: POST
    it('Test 2: POST with JSON request body', () => {
        const requestBody = { key: 'value' };
        cy.request({
            method: 'POST',
            url: 'https://httpbin.org/post',
            body: requestBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.json).to.deep.equal(requestBody);
        });
    });

    // Test 3: Headers
    it('Test 3: Sending and checking custom headers', () => {
        const customHeaders = {
            'My-Custom-Header': 'CustomValue',
            'User-Agent': 'MyTestAgent'
        };
        cy.request({
            method: 'GET',
            url: 'https://httpbin.org/headers',
            headers: customHeaders
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.headers).to.have.property('My-Custom-Header', 'CustomValue');
            expect(response.body.headers).to.have.property('User-Agent', 'MyTestAgent');
        });
    });

    // Test 4: PUT
    it('Test 4: PUT request', () => {
        cy.request('PUT', 'https://httpbin.org/put', { key: 'new value' }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.json).to.deep.equal({ key: 'new value' });
        });
    });

    // Test 5: DELETE
    it('Test 5: DELETE request', () => {
        cy.request('DELETE', 'https://httpbin.org/delete').then(response => {
            expect(response.status).to.eq(200);
        });
    });

    // Test 6: PATCH
    it('Test 6: PATCH request', () => {
        cy.request('PATCH', 'https://httpbin.org/patch', { key: 'patched value' }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.json).to.deep.equal({ key: 'patched value' });
        });
    });

    // Test 7: Random parameters
    it('Test 7: Random parameters', () => {
        const randomValue = Math.random().toString();
        cy.request({
            method: 'GET',
            url: 'https://httpbin.org/get',
            qs: { random: randomValue }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.args).to.have.property('random', randomValue);
        });
    });

    // Test 8: Response time
    it('Test 8: Checking response time', () => {
        cy.request('GET', 'https://httpbin.org/delay/1').then(response => {
            expect(response.status).to.eq(200);
            assert.isBelow(response.duration, 2000);
        });
    });

    // Test 9: 404 status response
    it('Test 9: 404 status response', () => {
        cy.request({
            method: 'GET',
            url: 'https://httpbin.org/status/404',
            failOnStatusCode: false 
        }).then(response => {
            expect(response.status).to.eq(404);
        });
    });

    // Test 10: Base64 
    it('Test 10: Base64', () => {
        const text = 'hello world';
        const textInBase64 = 'aGVsbG8gd29ybGQ=';
        cy.request('GET', `https://httpbin.org/base64/${textInBase64}`).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.eq(text);
        });
    });
});
