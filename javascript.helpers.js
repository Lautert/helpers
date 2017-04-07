String.prototype.pad = function(len, char, left){
	if(!char) char = 0;
	if(!left) left = 0;
	var value = this.toString();
	while(value.length < len){
		var r = [
			char+value,
			value+char,
		];
		value = r[left];
	}
	return value;
}

String.prototype.lpad = function(len, char){
	return this.pad(len, char, 0);
}

String.prototype.rpad = function(len, char){
	return this.pad(len, char, 1);
}

// '28/02/2017 15:12:33'.toDate('dd/mm/yyyy hh:ii:ss');
String.prototype.toDate = function(mask, complete){
	var value = this.toString();
	var regex = mask;
	
	if(!complete) complete = 2000;

	var types = ['Y', 'M', 'D', 'H', 'I', 'S'];
	
	for(var i in types){
		var r = new RegExp(types[i], 'ig');
		var len = (mask.match(r) || []).length;
		if(len > 0){
			r = new RegExp(types[i]+'+', 'ig');
			regex = regex.replace(r, '([0-9]{'+len+'})');
			mask = mask.replace(r, +i+1);
		}
	}
	mask = mask.replace(/\D/g, '');
	var matchs = value.match(regex);
	
	if(matchs == null){
		console.log('ALERT!! the mask not has relation with content');
		return null;
	}
	
	var date = [];
	for(var i in types){
		date.push((matchs[mask[i]] || 0));
	}
	
	if(date[0] < 1000){
		date[0] = complete + +date[0];
	}

	var d = new Date(date[0], (+date[1]-1), date[2], date[3], date[4], date[5]);
	var valid = true;
	var value = [
		d.getFullYear(),
		(+d.getMonth()+1),
		d.getDate(),
		d.getHours(),
		d.getMinutes(),
		d.getSeconds(),
	];

	for(var i in value){
		if(value[i] != date[i]){
			valid = false;
			break;
		}
	}

	if(valid){
		return d;
	}else{
		console.log('ALERT!! The date is Invalid');
		return null;
	}
}

// d.toDate('dd/mm/yyyy hh:ii:ss');
Date.prototype.toDate = function(mask){
	var value = {
		D : this.getDate().toString().lpad(2),
		M : (+this.getMonth()+1).toString().lpad(2),
		Y : this.getFullYear().toString().lpad(4),

		H : this.getHours().toString().lpad(2),
		I : this.getMinutes().toString().lpad(2),
		S : this.getSeconds().toString().lpad(2),
	}

	for(var i in value){
		var r = new RegExp(i, 'ig');
		var len = (mask.match(r) || []).length;
		if(len > 0){
			r = new RegExp(i+'+', 'ig');
			var replace = value[i];
			mask = mask.replace(r, replace);
		}
	}
	return mask;
}

Date.prototype.addDay = function(time){
	this.setDate(+this.getDate()+time);
	return this;
}

Date.prototype.addMonth = function(time){
	this.setMonth(+this.getMonth()+time);
	return this;
}

Date.prototype.addYear = function(time){
	this.setFullYear(+this.getFullYear()+time);
	return this;
}

Date.prototype.addHours = function(time){
	this.setHours(+this.getHours()+time);
	return this;
}

Date.prototype.addMinutes = function(time){
	this.setMinutes(+this.getMinutes()+time);
	return this;
}

Date.prototype.addSeconds = function(time){
	this.setSeconds(+this.getSeconds()+time);
	return this;
}