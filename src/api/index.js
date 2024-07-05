const authRoutes = require('./auth/routes');

function router(app, version) {
    app.use(version, authRoutes);

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

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message,
            },
        });
    });
}

module.exports = router;
