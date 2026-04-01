let array = [];

function addReport() {
    let nama = document.getElementById("nama").value;
    let asal = document.getElementById("asal").value;
    let tujuan = document.getElementById("tujuan").value;
    let tanggal = document.getElementById("tanggal").value;
    let jumlah = parseInt(document.getElementById("kursi").value);
    let jenisBus = document.getElementById("jenis").value;

    let hasil = "<h3> Data Pemesanan</h3>";


    for (let i = 1; i <= jumlah; i++) {
        hasil += `
            <p>
            <b> Tiket ${i}</b><br>
            Nama: ${nama}<br>
            Dari: ${asal}<br>
            Ke: ${tujuan}<br>
            Tanggal: ${tanggal}<br>
            Bus: ${jenisBus}
            </p>
            <hr>
        `;
    }

    document.getElementById("hasil").innerHTML = hasil;
}

function batalkanTiket() {
    if (confirm("Apakah Anda yakin ingin membatalkan pesanan?")) {
        document.getElementById("hasil").innerHTML = "";
        alert("Pembatalan berhasil")
    } else {
        alert("Pembatalan tidak berhasil")
    }
}

let tombolKirim = document.getElementById("klik");
tombolKirim.addEventListener("click", function(){
});

