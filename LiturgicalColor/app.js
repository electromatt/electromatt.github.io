/*
Name: Liturgical Color
Description: Get the current liturgical color for the day
Version: 1.3
Author: Matthew Druckhammer
License: GPL2
*/

function getColor() {

    today = moment(new Date());
    year = today.format('YYYY');
    today = today.date;
    epiphany_date = year + '-01-06';
    reformation_date = year + '-10-31';
    thanksgiving_date = year + '-11-01';

    // Colors
    gold = "#cf9f52";
    blue = "#5179ba";
    green = "#477258";
    red = "#af231c";
    purple = "#3e3254";
    black = "#333333";

    easter = Easter(year).date;
    christmas = new Date(year, 11, 25).date;
    end_year = moment().endOf('year').date;
    new_year = moment().startOf('year').add(1, 'y').date;
    fourth_advent_sunday = getPreviousSunday(christmas).date;
    first_advent_sunday = addDaysWithDate(fourth_advent_sunday, -21).date;
    epiphany = moment(epiphany_date).date;
    first_sunday_after_epiphany = getNextSunday(epiphany).date;
    ash_wednesday = addDaysWithDate(easter, -46).date;
    first_lent = addDaysWithDate(ash_wednesday, 4).date;
    transfiguration_sunday = addDaysWithDate(getPreviousSunday(first_lent), -21).date;
    palm_sunday = addDaysWithDate(easter, -7).date;
    maundy_thursday = addDaysWithDate(easter, -3).date;
    good_friday = addDaysWithDate(easter, -2).date;
    pentecost = addDaysWithDate(easter, 49).date;
    trinity_sunday = getNextSunday(pentecost).date;
    first_sunday_after_trinity = getNextSunday(trinity_sunday).date;
    reformation_day = moment(reformation_date).date;
    all_saints_day = getNextSunday(reformation_day).date;
    last_sunday = getPreviousSunday(first_advent_sunday).date;
    thanksgiving = moment(thanksgiving_date).isoWeekday(4).add(3, 'w').date;

    if (today >= first_advent_sunday && today < christmas) {
        return blue;
    }
    if (today >= christmas && today <= end_year || today < getNextSunday(first_sunday_after_epiphany)) {
        return gold;
    }
    if ((today >= getNextSunday(first_sunday_after_epiphany) && today < ash_wednesday) && today != transfiguration_sunday) {
        return green;
    }
    if (today == transfiguration_sunday) {
        return gold;
    }
    if (today == ash_wednesday) {
        return black;
    }
    if (today > ash_wednesday && today < palm_sunday) {
        return purple;
    }
    if (today >= palm_sunday && today < maundy_thursday) {
        return red;
    }
    if (today >= maundy_thursday && today < good_friday) {
        return gold;
    }
    if (today == good_friday) {
        return black;
    }
    if ((today >= easter && today < first_sunday_after_trinity) && today != pentecost) {
        return gold;
    }
    if (today == pentecost) {
        return red;
    }
    if (today >= first_sunday_after_trinity && today < getPreviousSunday(reformation_day)) {
        return green;
    }
    if (today >= getPreviousSunday(reformation_day) && today < all_saints_day) {
        return red;
    }
    if (today >= all_saints_day && today < getNextSunday(all_saints_day)) {
        return gold;
    }
    if (today >= getNextSunday(all_saints_day) && today < first_advent_sunday) {
        return green;
    }
    else {
        return green;
    }
}

function getNextSunday(date) {
    return moment(date).isoWeekday(7);
}

function getPreviousSunday(date) {
    return moment(date).isoWeekday(0);

}

function addDaysWithDate(date, days) {
    return moment(date).add(days, 'd');
}


function Easter(Y) {
    var C = Math.floor(Y / 100);
    var N = Y - 19 * Math.floor(Y / 19);
    var K = Math.floor((C - 17) / 25);
    var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
    I = I - 30 * Math.floor((I / 30));
    I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
    var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
    J = J - 7 * Math.floor(J / 7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40) / 44);
    var D = L + 28 - 31 * Math.floor(M / 4);

    return padout(M) + '/' + padout(D) + '/' + padout(Y);
}

function padout(number) {
    return (number < 10) ? '0' + number : number;
}

document.body.style.backgroundColor = getColor();
