import jwt from "jsonwebtoken"


const fetchuser = async(req, res, next) => {
    try {
         const token = await req.header("Token");
    if(!token) {
       return res.status(401).json({success: false, message: "Not Authorizes , Login Again"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED =", decoded);

    // req.user = decoded.user;
    req.user = { id: decoded.id };

    next();
    } catch(error) {
        console.log(error);
        res.status(401).json({success: false, message: "Invalid or Expired Token"});
    }
}

export default fetchuser;