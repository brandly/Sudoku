/*sudoku object*/

function getPuzzle(o){
	var k = 1;
	var temp = '';
	for (var i = 0; i < 9; i += 1){
		for (var j = 0; j < 9; j += 1){
			temp = $('td#' + k + ' input').val();
			if(temp === ""){
				o[i][j] = 0;
			}else{
				o[i][j] = parseInt(temp, 10);
			}
			
			k += 1;
		}
	}
	return o;
}

function printPuzzle(o){
	var k = 1;
	var temp = '';
	for (var i = 0; i < 9; i += 1){
		for (var j = 0; j < 9; j += 1){
			if (o[i][j] !== 0){
				$('td#' + k + ' input').val(o[i][j]);
				
			}
			
			
			k += 1;
		}
	}
}

function solve(o){
	var incomplete = true;
	while(incomplete){
		incomplete = false;
		for(var i = 0; i < 9; i += 1){
			for(var j = 0; j < 9; j += 1){
				var temp = 0;
				if(o[i][j] === 0){
					var temp = checkEntry(o, i, j);
				}
				if (temp !== 0){
					o[i][j] = temp;
					incomplete = true;
				}
			}
			
		}
	}
	
	return o;
	
}

function inRow(o) {
	var row = [];	
	
	for (var j in o){
		if ( o[j] !== 0 ){
			row.push(o[j]);
		}		
	}
	
	return row.sort();
}

function inColumn(o, j){
	var row = [];	
	
	for (var i in o){
		if ( o[i][j] !== 0 ){
			row.push(o[i][j]);
		}		
	}
	
	return row.sort();
}

function inSquare(o, i, j){
	var square = []
	
	var initi = Math.floor(i/3)*3;
	var initj = Math.floor(j/3)*3;
	
	for (var k = initi; k < initi + 3; k += 1){
		
		for(var l = initj; l < initj + 3; l += 1){
			if (o[k][l] !== 0){
				square.push(o[k][l]);
			}
		}
		
	}
	
	return square.sort();
}

function checkEntry(o, i, j){
	var values = [];
	
	var row = inRow(o[i]);
	var column = inColumn(o, j);
	var square = inSquare(o, i, j);
	
	values = row.concat(column, square);
	values.sort(function(a,b){return a - b});
	values = removeDuplicateElement(values);
	values.sort(function(a,b){return a - b});
	
	if (values.length === 8){
		return findMissing(values);
	}else{
		return 0;
	}
}

function findMissing(values){
	var full = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	
	for(var i = 0; i < full.length; i += 1){
		if (values[i] !== full[i]){
			return full[i];
		}
	}
}

function removeDuplicateElement(arrayName){
	var newArray = new Array();

	label:for(var i = 0; i < arrayName.length; i++ ){
		for(var j = 0; j < newArray.length;j++ ){
			if(newArray[j] === arrayName[i]) 
  				continue label;
  		}
  		newArray[newArray.length] = arrayName[i];
  }
  return newArray;
}
