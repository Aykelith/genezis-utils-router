export default {
    onBegin: GenezisChecker.array({
        of: GenezisChecker.function({
            arguments: [
                GenezisChecker.FunctionArguments.RouterRequestObject
            ]
        })
    })
}