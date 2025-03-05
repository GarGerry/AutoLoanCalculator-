function hitungKredit() {
    let harga = parseInt(document.getElementById("harga").value.replace(/\./g, '') || 0);
    let dp = parseInt(document.getElementById("dp").value.replace(/\./g, '') || 0);
    let bunga = parseFloat(document.getElementById("bunga").value) / 100;
    let tenor = parseInt(document.getElementById("tenor").value);

    let pinjaman = harga - dp;
    let bungaBulanan = bunga / 12;
    let angsuran = (pinjaman * bungaBulanan) / (1 - Math.pow(1 + bungaBulanan, -tenor));

    document.getElementById("angsuran").innerText = formatRupiah(angsuran);
    document.getElementById("loanAmount").innerText = formatRupiah(pinjaman);
    document.getElementById("totalInterest").innerText = formatRupiah((angsuran * tenor) - pinjaman);
    document.getElementById("totalLoan").innerText = formatRupiah(angsuran * tenor);

    generateAmortisasi(pinjaman, bungaBulanan, angsuran, tenor);
}

function generateAmortisasi(pinjaman, bungaBulanan, angsuran, tenor) {
    let balance = pinjaman;
    let amortisasiHTML = "";
    for (let i = 1; i <= tenor; i++) {
        let interest = balance * bungaBulanan;
        let principal = angsuran - interest;
        balance -= principal;

        amortisasiHTML += `
            <tr>
                <td class="border p-2">${i}</td>
                <td class="border p-2">${formatRupiah(principal)}</td>
                <td class="border p-2">${formatRupiah(interest)}</td>
                <td class="border p-2">${formatRupiah(angsuran)}</td>
                <td class="border p-2">${formatRupiah(balance)}</td>
            </tr>`;
    }
    document.getElementById("amortisasi").innerHTML = amortisasiHTML;
}

function formatRupiah(angka) {
    return "Rp " + angka.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function toggleAmortisasi() {
    let table = document.getElementById("amortisasiTable");
    table.classList.toggle("hidden");
    let btn = document.querySelector(".accordion");
    btn.classList.toggle("active");
}

document.querySelectorAll(".rupiah-input").forEach(input => {
    input.addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });
});
