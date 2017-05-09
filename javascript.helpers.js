// ADD THE char TO LEFT/RIGHT OF STRING
String.prototype.pad = function(len, char, left){
    char = char || 0;
    left = left || 0;
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

// ADD THE char TO LEFT OF STRING
String.prototype.lpad = function(len, char){
    return this.pad(len, char, 0);
}

// ADD THE char TO RIGHT OF STRING
String.prototype.rpad = function(len, char){
    return this.pad(len, char, 1);
}

// CONVERT TO UPPER THE FIRST LETTER OF WORDS
String.prototype.ucwords = function(){
    var str = this.toLowerCase();
    return str.replace(/(\b[a-z])/ig, function($1){
        return $1.toUpperCase();
    });
}

// CONVERT CAMELCASE TO LOWER CASE STRING SEPARATED BY UNDERLINE
String.prototype.underscore = function(){
    return this.replace(/([a-z])([A-Z])/g, function($0,$1,$2){
        return $1+"_"+$2;
    }).toLowerCase();
}

// CONVERT STRING SEPARATED BY UNDERLINE TO WORDS WITH FIRST LETTER UPPER
String.prototype.humanize = function() {
    return this.replace('_', ' ').ucwords();
}

// CONVERT STRING SEPARATED BY UNDERLINE TO CAMELCASE
String.prototype.camelize = function(){
    return this.replace('_', ' ').ucwords().replace(' ', '');
}

// CONVERT TO WORDS WITH FIRST LETTER UPPER
String.prototype._humanize = function(){
    return this.underscore().humanize();
}

// '28/02/2017 15:12:33'.toDate('dd/mm/yyyy hh:ii:ss');
// CONVERT STRING TO DATE BY FOLLOW THE MASK PASSED
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

// date.toDate('dd/mm/yyyy hh:ii:ss');
// CONVERT DATE TO STRING BY FOLLOW THE MASK PASSED
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

// REMOVE FROM ARRAY THE INDEX PASSED
Array.prototype.remove = function(index){
    this.splice(index, 1)
}

// RETURN THE KEYS FROM OBJECT
function getKeys($this){
    var keys = [];
    for(var i in $this){
        if($this.hasOwnProperty(i)){
            keys.push(i);
        }
    }
    return keys;
}
Object.prototype.getKeys = function(){
    return getKeys(this);
}