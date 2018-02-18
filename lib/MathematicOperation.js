module.exports = {

    getCount(contents, fieldSpecified) {
        return contents.reduce((previous, current) => {
                    if (fieldSpecified) previous += current[fieldSpecified];
                    else previous += current;
                    return previous;
                }, 0)
    }
}