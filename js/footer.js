export class Footer{ 
	constructor(path){
		this.path = path;
		this.nav = document.querySelector('.footer');
		this.load = this.load.bind(this);
		this.load();
	}
	load() {
		fetch(`${this.path}webComponents/footer.html`)
			.then(res => res.text())
			.then(data => { 
				this.nav.innerHTML = data
			})
	}
}
/*
const footer = document.querySelector('.footer')
fetch('../webComponents/footer.html')
.then(res=>res.text())
.then(data=>{
	nav.innerHTML=data
})
*/