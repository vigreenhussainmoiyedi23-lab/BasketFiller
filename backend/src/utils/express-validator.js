const {body,validationResult}=require('express-validator')

const RegisterValidator=[
    body('email')
    .isEmail().withMessage('Invalid Email').bail().isLength({min:10}).withMessage("Email must be atleast 8 characters long").bail(),
    body('username').isLength({min:3}).withMessage('Invalid Username').bail(),
    body('password').isLength({min:8}).withMessage('Weak Password').bail()
]

function validate(req,res,next) {
    try {
        const error=validationResult(req)
        if (!error.isEmpty()) {return res.status(400).json({success:false,errors:error.array()})}
        next()
    } catch (error) {
      return  res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

const LoginValidator=[
    body('email').isEmail().withMessage('Invalid Email').bail().isLength({min:10}).withMessage('Invalid Email').bail(),
    body('password').isLength({min:8}).withMessage('Weak Password')
]

module.exports={
    RegisterValidator,
    validate,
    LoginValidator
}