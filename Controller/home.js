module.exports.home = function(req,res){
    return res.render("home",{
        title: "Home"
    })
}

module.exports.signIn = function(req,res){
    return res.render("signIn",{
        title: "Sign In"
    })
}

module.exports.signUp = function(req,res){
    return res.render("signUp",{
        title: "Sign Up"
    })
}