function timeToString(time: Date | number | string) {
    const date = new Date(time);
    return date.toLocaleString();
}

export default timeToString;
