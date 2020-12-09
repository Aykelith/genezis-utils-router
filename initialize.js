export default settings => {
    if (!settings) settings = {
        preventMultipleCalls: require("./PreventMultipleCalls_requestSession").default(),
    };

    global._genezis_router = {};
    
    if (settings.preventMultipleCalls) {
        global._genezis_router.preventMultipleCalls = {};
        global._genezis_router.preventMultipleCalls.getSession = settings.preventMultipleCalls.getSession;
        global._genezis_router.preventMultipleCalls.saveSession = settings.preventMultipleCalls.saveSession;
        global._genezis_router.preventMultipleCalls.cleanSession = settings.preventMultipleCalls.cleanSession;
    }

    if (settings.requestWithStatus) {
        global._genezis_router.requestWithStatus = {};
        global._genezis_router.requestWithStatus.prefixSessionName = settings.requestWithStatus.prefixSessionName || "genezis_rws";
        global._genezis_router.requestWithStatus.expireSeconds = settings.requestWithStatus.expireSeconds || 60;
        global._genezis_router.requestWithStatus.createStatusSession = settings.requestWithStatus.createStatusSession;
        global._genezis_router.requestWithStatus.setStatusSession = settings.requestWithStatus.setStatusSession;
        global._genezis_router.requestWithStatus.getStatusSession = settings.requestWithStatus.getStatusSession;
        global._genezis_router.requestWithStatus.deleteStatusSession = settings.requestWithStatus.deleteStatusSession;
    }
};