// Dummy Aadhaar Verification

 const Verify = (aadhaar)=>{
     const dummy_aadhaars = ["123456789012","234567890121","345678901212","456789012123","567890121234","678901212345",
            "789012123456","890121234567","901212345678"]
    if(dummy_aadhaars.includes(aadhaar))
    {
        return true;
    }
    
    return false;
 }

 module.exports = {Verify}