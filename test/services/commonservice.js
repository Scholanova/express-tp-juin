const commonService = {
    login:(req, res, next) => {
        res.cookie('userId', req.params.id)
    }
}

module.exports = commonService
