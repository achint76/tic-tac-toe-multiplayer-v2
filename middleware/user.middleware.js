const UserMiddleware = {
    async isAuthenticated(req, res, next){
        console.log(req.session.user,"MIDDLEWARE");
        if(req.session.user){
            return next();

        }else{
            return res.status(400).json({message: 'Unauthorized'});
        }
    }
};
module.exports = UserMiddleware;