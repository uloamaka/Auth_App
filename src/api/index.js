const authRoutes = require('./auth/routes');
const userRoutes = require('./user/routes');
const orgRoutes = require('./organisation/routes');

function router(app, version) {
    app.use(version, authRoutes);
    app.use(version, userRoutes);
    app.use(version, orgRoutes);

    app.get('/health', (_req, res) => {
        const healthcheck = {
            uptime: process.uptime(),
            responsetime: process.hrtime(),
            message: 'OK',
            status: 200,
            timestamp: Date.now(),
        };
        res.send(healthcheck);
    });

    app.use((req, res) => {
        res.status(404).json({error: 'Resource not found'});
    });

    app.use((err, req, res, next) => {
        console.log(err);
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message,
            },
        });
    });
}

module.exports = router;
