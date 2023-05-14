module.exports.home = function(req,res){
    if(req.isAuthenticated()){
        if(req.user.role == "Admin"){
            return res.redirect('/user/admin-dash')
       }else{
            return res.redirect('/user/employee-dash')
       }
    }
    return res.render("home",{
        title: "Home"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        if(req.user.role == "Admin"){
            return res.redirect('/user/admin-dash')
       }else{
            return res.redirect('/user/employee-dash')
       }
    }
    return res.render("signIn",{
        title: "Sign In"
    })
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        if(req.user.role == "Admin"){
            return res.redirect('/user/admin-dash')
       }else{
            return res.redirect('/user/employee-dash')
       }
    }
    return res.render("signUp",{
        title: "Sign Up"
    })
}