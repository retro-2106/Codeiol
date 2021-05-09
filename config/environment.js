

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: "thisisasecret",
    db: "codeiol_development",
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ashish.cool2106',
            pass: 'secret'
        }
    },
    google_client_id: "992569931624-t15bkfd980j79dg9934icgavg880vmc0.apps.googleusercontent.com",
    google_client_secret: "L1txOScwHXe17D_L5TO5y38z",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeiol',
}

const production = {
    name: 'production'
}

module.exports = development;