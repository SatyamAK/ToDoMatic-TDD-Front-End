import user from '../fixtures/user-mock.json'

describe('End to End testing for entire app - authorizing user -success', ()=>{

    beforeEach(() =>{
        cy.visit('/')

        cy.intercept({
            method: 'POST',
            url: '/auth/login'
        }, user)

        cy.intercept({
            method: 'POST',
            url:'/auth/register'
        }, JSON.stringify({'message': 'User Successfully Registered'}))
    })

    it('Testing for successful login and registration', ()=>{
        
        cy.contains('Login')
        cy.get('input[placeholder="Username"]').type("tsting")
        cy.get('input[placeholder="Password"]').type("password{enter}")
        cy.contains('Welcome ' + user.username)
    })

    it('Testing for registered user to login with valid user info with login button', ()=>{

        cy.contains('Login')
        cy.get('input[placeholder="Username"]').type("tsting")
        cy.get('input[placeholder="Password"]').type("password")
        cy.get('.primary').click()
        cy.contains('Welcome ' + user.username)
    })

    it('Testing for registration', ()=>{
        
        cy.contains('Register').click()
        cy.get('input[placeholder="Username"]').type("tsting")
        cy.get('input[placeholder="Password"]').type("password")
        cy.get('.primary').click()
        cy.contains('User Successfully Registered')
    })
})

describe('End to End testing for entire app - authorizing user - unsuccess', ()=>{

    beforeEach(() =>{
        cy.visit('/')

        cy.intercept('POST', '/auth/login', {
            statusCode: 401,
            body: {
                "message": "Wrong Password"
            }
        })

        cy.intercept('POST', '/auth/register', {
            statusCode: 400,
            body: {
                "message": "Username already taken"
            }
        })
    })

    it('Testing for successful login and registration', ()=>{
        
        cy.contains('Login')
        cy.get('input[placeholder="Username"]').type("tsting")
        cy.get('input[placeholder="Password"]').type("password{enter}")
        cy.contains('Wrong Password')
    })

    it('Testing for registration', ()=>{
        
        cy.contains('Register').click()
        cy.get('input[placeholder="Username"]').type("tsting")
        cy.get('input[placeholder="Password"]').type("password")
        cy.get('.primary').click()
        cy.contains('Username already taken')
    })
})

describe('task management tests', ()=>{

    beforeEach(()=> {
        let token, username, tasks
    
        cy.visit("/")

        cy.intercept({
            method: 'POST',
            url: '/auth/login'
        }, user).as('login')

        token = "Bearer Something"
        username = user.username
        tasks = user.tasks
        
        cy.intercept({
            method: 'GET',
            url: '/getAllTasks?username='+username,
        }, JSON.stringify({"tasks": user.tasks})).as('getAll')
    })

    it('AUthenticated user should be able to see all the tasks', ()=>{

        cy.get('input[placeholder="Username"]').type("tsting")
        cy.get('input[placeholder="Password"]').type("password")
        cy.get('.primary').click()
        cy.wait('@login')
        cy.wait('@getAll')
        cy.contains(user.tasks[0].title)
        cy.contains(user.tasks[1].title)
        cy.contains(user.tasks[2].title)
        cy.contains(user.tasks[3].title)
    })
})