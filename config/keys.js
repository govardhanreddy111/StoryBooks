if(process.env.NODE_ENV === 'production'){
    module.exports = {
        mongoURI : 'mongodb://govardhan:weyvtest1@ds139534.mlab.com:39534/storybooks-dev',
        googleClientID : process.env.GOOGLE_CLIENT_ID,
        googleClientSecret : process.env.GOOGLE_CLIENT_SECRET
    }
}else{
    module.exports = {
        mongoURI :  'mongodb://localhost:27017/storybooks-dev',
        googleClientID : '860023107603-5sh93l52vj6e473lqoj2ph91n2jg275t.apps.googleusercontent.com',
        googleClientSecret : 'qdIZP7Mfz50wjIeteKPF8zBt'
    }
}

