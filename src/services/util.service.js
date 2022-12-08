export const utilService = {
    makeId,
    dateToString,
    numberWithCommas,
    timeSince,
    dueDateFormat
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function dateToString(date, language = 'he-IL') {
    return Intl.DateTimeFormat(language, { dateStyle: 'short', timeStyle: 'short', hour12: false }).format(new Date(date))
}

function numberWithCommas(num, decimals = 2, language = 'he-IL') {
    return Intl.NumberFormat(language).format((+num).toFixed(decimals))
}

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        if (Math.floor(interval) === 1) return "a year ago";
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        if (Math.floor(interval) === 1) return "a month ago";
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        if (Math.floor(interval) === 1) return "a day ago";
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        if (Math.floor(interval) === 1) return "an hour ago";
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        if (Math.floor(interval) === 1) return "Just now";
        return Math.floor(interval) + " minutes ago";
    }
    if (Math.floor(seconds) === 0) return "Just now";
    return Math.floor(seconds) + " seconds ago";
}

function dueDateFormat(dueDate) {
    const currYear = new Date().getFullYear()
    const dueYear = new Date(dueDate).getFullYear()
    let strDate = ''
    strDate += `${new Date(dueDate).toLocaleString('en-GB', { day: 'numeric' })} `
    strDate += `${new Date(dueDate).toLocaleString('en-GB', { month: 'short' })} at `
    if (dueYear !== currYear) {
        strDate += `${dueYear} `
    }
    strDate += `${new Date(dueDate).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true }).toLocaleUpperCase()}`
    return strDate
}