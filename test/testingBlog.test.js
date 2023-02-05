const request = require('supertest');
const app = require('../server');

describe("POST Login /api/users/login", () => {
    
    it("Valid user info.", async () => {
        const res = await request.agent(app).post('/api/users/login')
            .send({
                email: 'john@test.com',
                password: '123456'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.email).toEqual("john@test.com");
        expect(res.body.token).toBeDefined();
    })


    it("Invalid user info", async ()=> {
        const res = await request.agent(app).post('/api/users/login')
            .send({
                email: 'test@test.com',
                password: '123456'
            });
        expect(res.statusCode).toEqual(201);
    })
})


describe("Adding, editing and deleting a blog", () => {

    it("By a logged out user.", async () => {
        const res = await request.agent(app).post('/api/blogs/add').send({
            title: "testing-title123",
            description: "testing-description123"
        })
        expect(res.statusCode).toEqual(201);
    })

    it("By a logged in user.", async () => {
        const user = await request.agent(app).post('/api/users/login')
            .send({
                email: 'john@test.com',
                password: '123456'
            });
        expect(user.statusCode).toEqual(201);
        const token = user.body.token;
    
        //add a blog.
        const blog = await request.agent(app).post('/api/blogs/add')
            .send({
                title: "testing-unit-123",
                description: "description-unit-123"
            })
            .set('Authorization', `Bearer ${token}`)
        
        //console.log(blog)
        expect(blog.statusCode).toEqual(201);
        expect(blog.body.title).toBe("testing-unit-123");
        expect(blog.body.description).toBe("description-unit-123");
        expect(blog.body._id).toBeDefined();
        //blog added successfully.
        
        //edit blog.
        const updatedBlog = await request.agent(app).put(`/api/blogs/edit/${blog.body._id}`)
            .send({
                title: "updated-testing-unit-123",
                description: "updated-description-unit-123"
            })
            .set('Authorization', `Bearer ${token}`)
        
        //console.log(updatedBlog)
        expect(updatedBlog.statusCode).toEqual(201);
        expect(updatedBlog.body.title).toBe("updated-testing-unit-123");
        expect(updatedBlog.body.description).toBe("updated-description-unit-123");
        expect(updatedBlog.body._id).toBeDefined();
        //blog edited successfully.
    
        const deleteBlog = await request.agent(app).delete(`/api/blogs/delete/${updatedBlog.body._id}`)
            .set('Authorization', `Bearer ${token}`)
        
        expect(deleteBlog.statusCode).toEqual(201);
        //blog deleted successfully.
    })

})



