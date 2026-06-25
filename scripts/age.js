function getAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
}

function getArticle(num) {
    const firstDigit = num.toString().at(0);

    if(num === 18 || firstDigit === '8') {
        return "an";
    } else {
        return "a";
    }

    /*
    only the number eight requires 'an'

    18 -- 'an'
    8X -- 'an'
    anything else is 'a'

     */

}

function updateAge(year) {
    document.getElementById("age").textContent = getArticle(year) + " " + year;
}

updateAge(getAge(new Date("2007-01-25")));