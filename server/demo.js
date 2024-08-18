const bcrypt=require('bcrypt');
const crypto=require('crypto')
const user={
    name:'vicky',age:20
}

let demo=Object.keys(user).length
console.log(demo);

function generateToken(){
    const token =crypto.randomBytes(32).toString('hex')
    console.log(token);
    return token;
}
//generateToken()
//console.log(crypto.randomBytes(32).toString('hex'));
const saltRounds=10;
function hashPassword(password){
    const salt=bcrypt.genSaltSync(saltRounds);
    let hash=bcrypt.hashSync(password,salt);
    console.log(hash);
}
//hashPassword('Vignesh@23')
let token='fakjlsfjklsfjklsfkjsdastjkfjkdf'
let urlbody=`/reset-password/:${token}`;
let urlhead='http://localhost:3000';

console.log(urlhead+urlbody);