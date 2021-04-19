
import User from '../../Models/User';

export default class UsersController {

    async index({view}){
        const posts= await User.all()
        
        return view.render('post.index',{
            post:posts}
        )
    }
    
    create({ view }) {
        return view.render('post/create')
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
      
        return view.render('post/edit', { post: post })
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
