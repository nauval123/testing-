import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { HttpContext } from '@adonisjs/core/build/standalone';
import User from '../../Models/User';

export default class UsersController {

    async index({view}: HttpContextContract){
        let posts= await User.all()
        // console.log(posts.rows)
        return view.render('posts/index',{
            post:posts
        })
    }
    
    create({ view }) {
        return view.render('posts/create')
      }

    
      
    async store({ request, response, session }) {
        const post = new User()
        
        post.nama   = request.input('title')
        post.konten  = request.input('content')
        await post.save()
        
        session.flash({ notification: 'Data Berhasil Disimpan!' })
        return response.route('posts.index')
        
    }

    async edit({  view, params }) {
        const id    = params.id
        const post  = await User.find(id)
      
        return view.render('posts/edit', { post: post })
    }
      
    async update({ request, response, params, session }) {
    const id    = params.id
    const posts  = await User.findOrFail(id)
    
    posts.nama    = request.input('title')
    posts.konten  = request.input('content')
    await posts.save()
    
    session.flash({ notification: 'Data Berhasil Diupdate!' })
    return response.route('posts.index')
    }

    // async delete({request,response, view, params, session}){
    //     const id    = params.id
    //     const post  = await Post.find(id)

    //     await post.delete()

    //     session.flash({notification: 'Data Berhasil Diupdate! '})
    //     return response.route('posts.index')

    // }
}
