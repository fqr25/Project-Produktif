//tempat untuk menyimpan data pemesanan
let daftarTiket = [];

let date = new Date(); document.getElementById("tanggal").valueAsDate = date;

let hargaBusList = {
    Ekonomi: 100000,
    Pariwisata: 200000,
    Eksekutif: 300000,
    VIP: 400000,
    Sleeper: 500000,
    Luxury: 600000
};

//function untuk submit data pemesanan lalu nilai diambil dari form 
function tambahTiket() {
    let nama = document.getElementById("nama").value;
    let asal = document.getElementById("asal").value;
    let tujuan = document.getElementById("tujuan").value;
    let tanggal = document.getElementById("tanggal").value;
    let kursi = parseInt(document.getElementById("kursi").value);
    let jenisBus = document.getElementById("jenis").value;

    let hargaBus = hargaBusList[jenisBus];
    let totalHarga = hargaBus * kursi;

    let id = idUnik();

    let hasil = "<h3>data pesanan</h3>";
    

    for (let i = 1; i <= kursi; i++) {
        hasil += `
            <p>
            <b> Tiket ${i}</b><br>
            Nama: ${nama.toUpperCase()} <br> 
            Dari: ${asal}<br>
            Ke: ${tujuan}<br>
            Tanggal: ${tanggal}<br>
            Bus: ${jenisBus}<br>
            ID: ${id}<br>
            Harga per kursi : RP ${hargaBus.toLocaleString()}<br> 
            Tanggal Pemesanan: ${new Date().toLocaleString()} 
            </p>
            <hr>
        `;
    }

    hasil +=
        `<h3>total bayar: RP ${totalHarga.toLocaleString()}</h3>`;
        document.getElementById("hasil").innerHTML = hasil;


    let tiketLaporan = {
        id: idUnik(),
        nama: nama,
        asal: asal,
        tujuan: tujuan,
        tanggal: tanggal,
        jumlah: kursi,
        jenisBus: jenisBus,
        diBuat: date
    };
    
    daftarTiket.push(tiketLaporan);
}

//function untuk membatalkan pemesanan dengan konfirmasi
function batalkanTiket() {
    let yakin = (confirm("Apakah Anda yakin ingin membatalkan pesanan?"))
    if (yakin) {
        document.getElementById("hasil").innerHTML = "";
        alert("Pembatalan berhasil")
    } else {
        alert("Pembatalan tidak berhasil")
    }
}

//add event listener untuk tombol kirim
let tombolKirim = document.getElementById("klik");
tombolKirim.addEventListener("click", function() {
    tambahTiket();
});

//function math.random untuk membuat id unik
function idUnik() {
    let id = Math.floor(Math.random() * 9000) + 1000; //menghasilkan angka acak rentang 1000 sampai 9000
    return "Tiket-" + id; 
}


