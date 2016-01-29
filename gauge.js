var positives = 0;
var negatives = 0;
var total = 0;
var firebase = datasources["firebase"];
for(var i in firebase){
    if(!firebase[i].data.nps){
        continue;
    }
    console.log(firebase[i].data.nps)
    var _nps = parseInt(firebase[i].data.nps, 10);
	total+=1;
    if(_nps<=6){
        negatives+=1
    }else{
        positives+=1
    }
}
var nps = Math.floor(((positives-negatives)/total)*100);
console.log(positives, negatives, total, nps);
return nps;
