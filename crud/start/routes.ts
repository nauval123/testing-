/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/


import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.on('/').render('welcome')
Route.get('/posts', 'UsersController.index').as('posts.index')
Route.get('/posts/create', 'UsersController.create').as('posts.create')
Route.post('/posts/store', 'UsersController.store').as('posts.store')
Route.get('/posts/edit/:id', 'UsersController.edit').as('posts.edit')

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  
  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})
// Route.get('/posts', 'post/home').as('homepage')