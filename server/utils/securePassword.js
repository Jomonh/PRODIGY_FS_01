const bcrypt=require('bcrypt');
//const saltRounds=10;

function hashPassword(password){
    const salt= bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(password,salt);
    console.log(hash);
    return hash;
}

function comparePassword(plain,hash){
    const isSame=bcrypt.compareSync(plain,hash);
    console.log(isSame);
    return isSame;
}

module.exports={
    hashPassword,comparePassword
}