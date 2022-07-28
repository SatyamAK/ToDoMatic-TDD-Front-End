import Task from '../../src/models/task.model'
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

        cy.get('input[placeholder="Username"]').type("tsting")
        cy.get('input[placeholder="Password"]').type("password")
        cy.get('.primary').click()
    })

    it('AUthenticated user should be able to see all the tasks', ()=>{

        cy.wait('@login')
        cy.wait('@getAll')
        cy.contains(user.tasks[0].title)
        cy.contains(user.tasks[1].title)
        cy.contains(user.tasks[2].title)
        cy.contains(user.tasks[3].title)
    })

    it('AUthenticated user should be able to add new task', ()=>{

        cy.wait('@login')
        cy.wait('@getAll')
    
        let updated_tasks = user.tasks
        updated_tasks.push(new Task('Testing Again', false, 5))
        cy.intercept({
            method: 'POST',
            url: '/addTask?username='+user.username,
        }, JSON.stringify({"updated_tasks": user.tasks})).as('addNewTask')

        cy.get('input[placeholder="What needs to be done?"]').type("new task{enter}")
        cy.contains('Testing Again')
    })

    it('AUthenticated user should be able to edit task', ()=>{

        cy.wait('@login')
        cy.wait('@getAll')

        cy.contains('eating').parent().parent().find('.secondary').click()

        let updatedTasks = user.tasks
        updatedTasks[0].title = 'Eating More'
        cy.intercept({
            method: 'PUT',
            url: '/updateTask?username='+user.username,
        }, JSON.stringify({"updated_tasks": updatedTasks})).as('edit')

        cy.get('input[placeholder="What will be the new name of eating"]').type('Eating more{enter}')
        cy.contains('Eating More')
    })

    it('AUthenticated user should be able to edit task by clicking on save', ()=>{

        
        cy.contains('Eating More').parent().parent().find('.secondary').click()

        let updatedTasks = user.tasks
        updatedTasks[0].title = 'eating'

        cy.intercept({
            method: 'PUT',
            url: '/updateTask?username='+user.username,
        }, JSON.stringify({"updated_tasks": updatedTasks})).as('edit')

        cy.get('input[placeholder="What will be the new name of Eating More"]').type('eating')
        cy.get('.edit-container .secondary').click()
        cy.contains('eating')
    })

    it('AUthenticated user should be able to toggle task done or not done', ()=>{

        cy.wait('@login')
        cy.wait('@getAll')

        let updatedTasks = user.tasks
        updatedTasks[4].done = true

        cy.intercept({
            method: 'PUT',
            url: '/updateTask?username='+user.username,
        }, JSON.stringify({"updated_tasks": updatedTasks})).as('toggle')

        cy.contains('Testing Again').parent().find('input[type="checkbox"]').click()
        cy.contains('Testing Again').parent().find('input[type="checkbox"]').should('be.checked')
    })

    it('AUthenticated user should be able to delete task', ()=>{

        cy.wait('@login')
        cy.wait('@getAll')

        let updatedTasks = user.tasks
        updatedTasks.pop()

        cy.intercept({
            method: 'DELETE',
            url: '/deleteTask?username='+user.username+'&taskId='+5,
        }, JSON.stringify({"updated_tasks": updatedTasks})).as('delete')

        cy.contains('Testing Again').parent().parent().find('.accent').click()
        cy.contains('Testing Again').should('not.exist')
    })
})