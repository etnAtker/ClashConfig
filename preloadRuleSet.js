module.exports.parse = async (raw, { axios, yaml, console, homeDir }) => {
    const fs = require('fs');

    const rawObj = yaml.parse(raw);
    const providers = rawObj['rule-providers'];

    for (let provider in providers) {
        const obj = providers[provider];

        if (obj.type === 'file') {
            continue;
        }

        const ret = await axios({
            method: 'get',
            url: obj.url,
        });

        const fmt = obj.format === undefined || obj.format === 'yaml' ? 'yaml' : 'txt';
        const filePath = homeDir + '\\ruleset\\' + provider + '.' + fmt;
        fs.writeFileSync(filePath, ret.data);

        obj.type = 'file';
        obj.path = filePath;
        delete obj.url;
        delete obj.interval;
    }

    return yaml.stringify(rawObj);
};