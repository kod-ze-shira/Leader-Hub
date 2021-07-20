import dev from './dev';
import prod from './prod'

const keys = JSON.stringify(process.env.NODE_ENV) === '"development"'||window.location.href.includes('dev') ? dev : prod;
// JSON.stringify(process.env.NODE_ENV) === '"development"' to localhost
export default keys;