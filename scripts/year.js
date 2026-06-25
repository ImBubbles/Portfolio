function getYear(startDate) {
    const today = new Date();
    //const today = new Date("2026-05-09");

    let year = today.getFullYear() - startDate.getFullYear();
    // months in JS are 0 based????
    // sure cool i get it but dates aren't 0 based???
    if(today.getMonth()+1 > 5 || (today.getMonth()+1 === 5 && today.getDate() >= 8)) {
        year++;
    }

    return year;
}

function ordinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function updateYear(year) {
    document.getElementById("school_year").textContent = ordinal(year);
}

updateYear(getYear(new Date("2025-08-18")));