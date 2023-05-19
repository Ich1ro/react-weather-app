export function convertTimestamp(timestamp: number) {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    let d = new Date(timestamp * 1000),
        mm = '0' + d.getMonth(),
        dd = ('0' + d.getDate()).slice(-2),
        wd = ('0' + d.getDay()).slice(-1),
        time;

        const month = months[Math.round(Number(mm))];
    const res = days[wd];

    time = res + ', ' + dd + ' ' + month;
    return time;
}