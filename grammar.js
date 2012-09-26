<!--
// Copyright 2012 The Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
function part() {
	this.nm = "";
	this.isTerminal = false;
	this.solns = [];
}

part.prototype.init = function(nm) {
	this.nm = nm;
	this.isTerminal = true;
};
part.prototype.addSoln = function(soln) {
	this.isTerminal = false;
	this.solns.push(soln);
};
part.prototype.speak = function() {
	if (this.isTerminal) 
		return this.nm;
	
	var soln = this.solns[Math.floor(Math.random() * this.solns.length)];
	var writeSpace = false;
	var out = "";
	for (var i = 0; i < soln.length; i++) {
		if (writeSpace)
			out += " " + soln[i].speak();
		else {
			out += soln[i].speak();
			writeSpace = true;
		}
	}
	return out;
};
function grammar() {
	this.initialized = false;
	this.head = null;
	this.part = [];
}

grammar.prototype.speak = function() {
	if (this.initialized) 
		return this.head.speak();
	return "Uninitialized Grammar";
};
grammar.prototype.findPart = function(name) {
	// Check against function because some keys are
	// preset (for example, try the following in a js console...)
	//   p = []
	//   p["some"]
	// (hint: it's a function. Fucking js...)
	if (typeof this.part[name] == "undefined" || typeof this.part[name] == "function") {
		this.part[name] = new part();
		this.part[name].init(name);
		return this.part[name];
	}
	return this.part[name];
};
grammar.prototype.init = function(file) {
	lines = file.split("\n");
	var i = 0;
	for (0; i < lines.length; i++) {
		lines[i] = lines[i].replace(/\t+/g, ' ');
		lines[i] = lines[i].replace(/\s+/g, ' ');
		lines[i] = lines[i].replace(/^\s+/g, '');
		words = lines[i].split(" ");
		var content = false;
		for (var j = 0; j < words.length; j++) {
			if (words[i] != "") {
				content = true;
				break;
			}
		}
		if (!content)
			continue;
		// if (words.length < 1)
		// 	continue;
		this.head = new part();
		this.head.init("");
		var soln = [];
		for (var j = 0; j < words.length; j++) {
			var prt = this.findPart(words[j]);
			soln.push(prt);
		}
		this.head.addSoln(soln);
		i++;
		break;
	}
	for (0; i < lines.length; i++) {
		lines[i] = lines[i].replace(/\t+/g, ' ');
		lines[i] = lines[i].replace(/\s+/g, ' ');
		lines[i] = lines[i].replace(/^\s+/g, '');
		words = lines[i].split(" ");
		if (words.length < 2) {
			continue;
		}
		this.addRule(words[0], words.slice(1));
	}
	this.initialized = true;
};
grammar.prototype.addRule = function(prt, def) {
	prt = this.findPart(prt);
	soln = [];
	var i;
	var p;
	for (i = 0; i < def.length; i++) {
		p = this.findPart(def[i]);
		soln.push(p);
	}
	prt.addSoln(soln);
};
-->