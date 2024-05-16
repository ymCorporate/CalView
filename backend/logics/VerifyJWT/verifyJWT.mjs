const secretKey = '5kOnr5vYmLggihää0X9TGrQBC4PoFPgt';
import jwt from 'jsonwebtoken';

export class VerifyJWToken{
    verifyJWT(req, res){
        const token = req.headers.authorization;
        // console.log(token)
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlYmVzaCBQcmFtYW5pY2siLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNTg1NjgyOCwiZXhwIjoxNzE1ODYwNDI4fQ.MGQvAwpkbJlfmOZh9ki8ML2U0kJo69ijsFvn834dwb8';
        try{
            if (!token) {
                console.log("No jwt");
              return res.status(401).json({ success: false });
            
            }
          
            jwt.verify(token, secretKey, (err, decoded) => {
              if (err) {
                console.log("Invalid jwt");
                return res.status(401).json({ success: false });
                // return res.redirect('/login');
              }

              else{
                console.log("Valid jwt");
                return res.status(200).json({success:true});
              }

            });
          }
          catch(error){
            res.json({message:error})
          }
    }
}