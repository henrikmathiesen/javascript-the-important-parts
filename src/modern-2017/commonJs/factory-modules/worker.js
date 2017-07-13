let workcount = 0;

function job() { 
    workcount++;
    return 'working ' + workcount + ' times';
}

exports.job = job;
