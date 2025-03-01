const path = require('path');
const packageJson = require(path.resolve(process.cwd(), 'package.json'));

const propsName = process.argv[2];

if (!propsName) {
    console.error('propsName is required');
    process.exit(1);
}

const props = packageJson[propsName];

if (!props) {
    console.error(`props ${propsName} not found`);
    process.exit(1);
}

if(typeof props !== 'object') {
    console.log(props);
} else {
    console.log(JSON.stringify(props, null, 4));
}