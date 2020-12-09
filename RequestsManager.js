import asyncHandler from "express-async-handler";
import express from "express";

import { createRouteFunction } from "./data/RouteTypes";

export default class RequestManager {
    constructor(app) {
        if (!app) throw new Error();

        this.app = app;

        this.addRoute = this.addRoute.bind(this);
        this.addGroupRoutes = this.addGroupRoutes.bind(this);
        this.use = this.use.bind(this);
    }

    addRoute(requestType, path, requestFunc, router) {
        (router || this.app)[createRouteFunction(requestType)](path, Array.isArray(requestFunc) ? requestFunc.map(f => asyncHandler(f)) : asyncHandler(requestFunc));
    }

    addGroupRoutes(mainPath, routes) {
        console.log(mainPath);
        const router = express.Router();

        routes.forEach(data => this.addRoute(data.requestType, data.path, data.requestFunc, router));

        this.app.use(mainPath, router);
    }

    use(f) {
        this.app.use(f);
    }
};