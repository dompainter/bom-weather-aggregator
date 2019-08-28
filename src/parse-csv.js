module.exports = (data, delimiter) => {
    const [headers, ...values] = data.split(`\n`)

    return values.map(row =>
        headers.split(delimiter)
            .reduce((current, next, index) => ({
                ...current,
                [next]: row.split(delimiter)[index]
            }), {})
    )
}