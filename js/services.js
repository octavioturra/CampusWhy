import Firebase from 'firebase';

var db = new Firebase('https://campuswhy.firebaseio.com/');

function query(item){
  return new Promise((resolve, reject)=>{
    db.child(item).on('value', function(data) {
      if(!data){
        return reject('no data');
      }
      let content = [];
      data.forEach((d)=>{content.push(d.val().data)});
      return resolve(content);
    });
  });
}

function push(item){
  return (data)=>db.child(item).push({data});
}

function consoleAndPass(data){
  console.log(data);
  return data;
}

export default class Db{
  login(email, password){
    return new Promise((resolve, reject) => {
      db.authWithPassword({email, password}, (error, authData)=>{
        if(error){
          return reject(error);
        }
        return resolve({email: email, token: authData.token});
      });
    });
  }
  tokenLogin(email, token){
    return new Promise((resolve, reject) => {
      db.auth(token, (error, authData)=>{
        if(error){
          return reject(error);
        }
        console.log(authData)
        return resolve({email, token: authData.token});
      });
    });
  }
  anonimousLogin(){
    return new Promise((resolve, reject) => {
      db.authAnonymously((error, authData)=>{
        if(error){
          return reject(error);
        }
        return resolve({email:'anonimous', token: authData.token});
      }, {remember: "sessionOnly"});
    });
  }
  getReasons(){
    return query('reasons');
  }
  getProfessions(){
    return query('professions');
  }
  setReasons(reason){
    console.log('setReasons', reason);
    return push('reasons')(reason);
  }
  setProfessions(profession){
    return push('professions')(profession);
  }
  addAnswer(data){
    return push('answer')(data);
  }
}
