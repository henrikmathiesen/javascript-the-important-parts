const worker = (name) => {
    let workCount = 0;
    const factory = {};

    factory.job = () => {
        workCount += 1;
        return 'working ' + workCount + ' times';
    };

    factory.name = name;

    return factory;
};

module.exports = worker;
