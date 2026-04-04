//tempat untuk menyimpan data pemesanan
let daftarTiket = [];
let idEdit = null;

//function math.random untuk membuat id unik
function idUnik() {
    let id = Math.floor(Math.random() * 9000) + 1000; //menghasilkan angka acak rentang 1000 sampai 9000
    return "Tiket-" + id;
}

//function untuk mendapatkan tanggal saat ini
function dapatkanTanggal() {
    let d = new Date();
    let menit = String(d.getMinutes()).padStart(2, "0");
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${menit}`;
}

//function untuk mengubah nama menjadi kapital
function namaKapital(nama) {
    return nama.trim().toUpperCase();
}

//function untuk submit data pemesanan lalu nilai diambil dari form
function tambahTiket() {
    let nama = document.getElementById("nama").value;
    let asal = document.getElementById("asal").value;
    let tujuan = document.getElementById("tujuan").value;
    let tanggal = document.getElementById("tanggal").value;
    let kursi = parseInt(document.getElementById("kursi").value || 0);
    let jenisBus = document.getElementById("jenis").value;

    if (!nama || !asal || !tujuan || !tanggal || !kursi || !jenisBus) return alert("Semua form harus diisi.");

    if (asal === tujuan) return alert("Asal dan tujuan tidak boleh sama.");

    daftarTiket.push({
    id: idUnik(),
    nama: namaKapital(nama),
    asal: asal,
    tujuan: tujuan,
    tanggal: tanggal,
    kursi: kursi,
    jenisBus: jenisBus,
    waktuPesan: dapatkanTanggal()
});

    tampilkanTiket();
    bersihkanForm();
}

//function untuk menampilkan data pemesanan dalam bentuk tabel
function tampilkanTiket() {
    let tabel = document.getElementById("tabelTiket");
    if (daftarTiket.length === 0) {
    tabel.innerHTML = `<p class="kosong">Belum ada tiket yang dipesan. Silahkan isi terlebih dahulu form diatas.</p>`;
    return;
    }

    let baris = "";
    daftarTiket.forEach(function (t) {
    baris += `
        <tr>
            <td>${t.id}</td>
            <td>${t.nama}</td>
            <td>${t.asal} → ${t.tujuan}</td>
            <td>${t.tanggal}</td>
            <td>${t.kursi}</td>
            <td>${t.jenisBus}</td>
            <td>Tanggal: ${t.waktuPesan}</td>
            <td>
            <button class="btn-edit" onclick="bukaEdit('${t.id}')">Edit</button>
            <button class="btn-hapus" onclick="hapus('${t.id}')">Hapus</button>
            </td>
        </tr>`;
    });

    tabel.innerHTML = `
    <table>
        <thead><tr>
        <th>ID</th> <th>Nama</th> <th>Rute</th> <th>Tanggal</th> <th>Jumlah Kursi</th> 
        <th>Jenis Bus</th> <th>Dipesan pada</th> <th>Aksi</th>
        </tr></thead>
        <tbody>${baris}</tbody>
    </table>`;
}

//function untuk membatalkan pemesanan dengan konfirmasi
function batalkanTiket() {
    if (daftarTiket.length === 0)
    return alert("Tidak ada tiket yang dapat dibatalkan.");
    if (confirm("Apakah Anda yakin ingin membatalkan semua pemesanan?")) {
    daftarTiket = [];
    tampilkanTiket();
    alert("Pemesanan berhasil dibatalkan.");
    }
}


//update data pemesanan berdasarkan id yang dipilih
function bukaEdit(id) {
    let tiket = daftarTiket.find(t => t.id === id);
    if (!tiket) return; 

    document.getElementById("editNama").value = tiket.nama;
    document.getElementById("editKursi").value = tiket.kursi;
    document.getElementById("editAsal").value = tiket.asal;
    document.getElementById("editTujuan").value = tiket.tujuan;
    document.getElementById("editTanggal").value = tiket.tanggal;
    document.getElementById("editJenis").value = tiket.jenisBus;

    idEdit = id;
    document.getElementById("edit").style.display = "flex";
}

function simpanEdit() {
    let nama = document.getElementById("editNama").value;
    let asal = document.getElementById("editAsal").value;
    let tujuan = document.getElementById("editTujuan").value;
    let tanggal = document.getElementById("editTanggal").value;
    let kursi = parseInt(document.getElementById("editKursi").value);
    let jenisBus = document.getElementById("editJenis").value;

    if (!nama || !asal || !tujuan || !tanggal || !kursi || !jenisBus) return alert("Semua form harus diisi.");
    if (asal === tujuan) return alert("Asal dan tujuan tidak boleh sama.");

    //perbarui data tiket yang diedit
    daftarTiket = daftarTiket.map(function(t) {
        if (t.id === idEdit) {
            return {
                ...t, nama: namaKapital(nama), asal, tujuan, tanggal, kursi, jenisBus
            };
        }
        return t;
    });

    tutupEdit();
    tampilkanTiket();
    alert("Pemesanan berhasil diperbarui.");
}

//fungsi menutup tampilan edit
function tutupEdit() {
    document.getElementById("edit").style.display = "none";
    idEdit = null;
}

//fungsi menghapus tiket berdasarkan id yang dipilih
function hapus(id) {
    if (confirm("Yakin ingin menghapus tiket ini?")) {
        daftarTiket = daftarTiket.filter(t => t.id !== id);
        tampilkanTiket();
    }
}

function bersihkanForm() {
    ["nama", "asal", "tujuan", "tanggal"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("kursi").value = "1";
    document.getElementById("jenis").value = "Ekonomi";
    document.getElementById("nama").focus();
}

//add event listener click dan functionnya
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnTambah").addEventListener("click", tambahTiket);
    document.getElementById("btnBatal").addEventListener("click", batalkanTiket);
    document.getElementById("btnSimpanEdit").addEventListener("click", simpanEdit);
    document.getElementById("btnBatalEdit").addEventListener("click", tutupEdit);
});

tampilkanTiket();