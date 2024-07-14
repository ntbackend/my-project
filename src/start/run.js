const { connect } = require('mongoose');
const config = require("../shared/config");

const runner = async (app) => {
    await connect(config.mongoUri);
    console.log("MongoDB connected")
    const port = config.port
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    });
};

module.exports = runner;