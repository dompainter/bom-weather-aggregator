module.exports = data => {
    const [headers, ...values] = data.split(`\n`)

    return values.map(row =>
        headers.split(',')
            .reduce((current, next, index) => ({
                ...current,
                [next]: row.split(',')[index]
            }), {})
    )
}