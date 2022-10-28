class Cari {
    constructor() {
        this.selang = window.Bahasa[userState.last_lang];
    }
    async createElement() {

        this.element = document.createElement("div");
        this.element.classList.add("ListChat");

        
        this.cariElement = await document.createElement("div");
        this.cariElement.classList.add("createGrup");
        this.cariElement.innerHTML = (`
        <div class="title">${this.selang.cari.judul}</div>
        <div class="error"></div>
        <div class="inputan">
            <input data-grup="${auth.currentUser.uid}" type="text" placeholder="${this.selang.cari.inputNama}" maxlength="20"/>
        </div>
        <div class="tombolan">
            <button class="btn-1 merah cancel"><i class="fa-duotone fa-circle-x"></i> ${this.selang.cari.tombolBatal}</button>
            <button class="btn-1 hijau done"><i class="fa-duotone fa-circle-check"></i> ${this.selang.cari.tombolLanjut}</button>
        </div>
        `);

        this.element.appendChild(this.cariElement); 
        const cari = this.cariElement.querySelector(`.inputan [data-grup="${auth.currentUser.uid}"]`);
        cari.focus(); 
        cari.onkeypress = (e) => { 
            if(e.keyCode == 13) { 
                this.cariElement.querySelector(".tombolan .done").click();
            }
        }
    
        this.cariElement.querySelector(".tombolan .cancel").onclick = () => new ListPesan().init(document.querySelector(".container"));
        
        this.cariElement.querySelector(".tombolan .done").onclick = () => this.pencarian();
    }
    pencarian() {
        const cari = this.element.querySelector(`.inputan [data-grup="${auth.currentUser.uid}"]`);
        const input = cari.value.replace(/^\s+/g, ''); 
        const erEl = this.element.querySelector(".error");
        erEl.innerHTML = ""; 
        if(input.length < 2) { 
            
            Notipin.Alert({msg: this.selang.cari.notipinKarakter, mode: "dark"});
            cari.value = '';
            cari.focus();
            return; 
        } else { 
            this.temukan(input); 
        }
    }
    temukan(input) {
        rdb.ref("users").once("value", akun => { 
            akun.forEach(data => { 
                const snap = data.val(); 
                const nama = snap.nama?snap.nama:snap.displayName; 
                
                if(auth.currentUser.uid !== data.key && nama.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
                    
                    this.list = document.createElement("div");
                    this.list.classList.add("kartu");
                    this.list.setAttribute("data-uid", data.key)
                    this.list.innerHTML = (`
                        <div class="detail">
                            <img width="35" height="35" src="${snap.foto?snap.foto:snap.photo}" />
                            <div class="nama">
                            </div>
                            </div>
                        <div class="status ${snap.status ? snap.status : 'online'}">
                        ${snap.status ? snap.status : 'online'}</div>
                    `);
                    this.list.querySelector(`.kartu .nama`).innerText = snap.nama ? snap.nama : snap.displayName; // IF ELSE
                    this.element.prepend(this.list);
            
                    this.list.onclick = () => new Pengguna(data.key).init(document.querySelector(".container"));
                }
            })
        });
    
        this.cariElement.remove();
        
        this.habis();
    }
    navbar(container) {
        
        container.querySelector(".header .cari").classList.add("active");
    }
    state() {
        
        userState.changeLast("cari");
        
        new Activity().save();
    }
    habis() {
        
        this.noMore = document.createElement("div");
        this.noMore.classList.add("nomore");
        this.noMore.innerHTML = this.selang.cari.nomore;
        this.element.appendChild(this.noMore);
    }
    init(container) {
        
        new Landing().end();
        new Dashboard().createElement();
        this.navbar(container);
        this.createElement();
        container.appendChild(this.element);
        this.state();
    }
}