export default () => {
    return {
        getSession: (sessionVariableName, req) => req.session[sessionVariableName],
        saveSession: async (sessionVariableName, value, req) => {
            req.session[sessionVariableName] = value;
            await new Promise(resolve => req.session.save(resolve));
        },
        checkSession: async (sessionVariableName, req) => {
            await new Promise(resolve => req.session.reload(resolve));
            return req.session[sessionVariableName];
        },
        cleanSession: async (sessionVariableName, req) => {
            delete req.session[sessionVariableName];
            await new Promise(resolve => req.session.save(resolve));
        }
    };
}