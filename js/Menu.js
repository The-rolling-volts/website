
export class Menu { 
	constructor(path){
		this.path = path;
		this.nav = document.querySelector('.navbar.sticky');
		this.load = this.load.bind(this);
		this.load();
	}
	load() {
		fetch(`${this.path}webComponents/menu.html`)
			.then(res => res.text())
			.then(data => { 
				this.nav.innerHTML = data
			})
	}
}

/*
const nav = document.querySelector('.navbar.sticky')
fetch('../webComponents/menu.html')
.then(res=>res.text())
.then(data=>{
	nav.innerHTML=data
})
*/
