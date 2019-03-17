var x = [1,1,2,3,2,3];

remove=()=>{
	for( var i = 0; i < x.length; i++){
		for(var j = x.length -1 - i; j > 0; j--){
			if(x[i]==x[j]){
				delete(x[i])
			}
		}

	}

	console.log(x)
}

remove();