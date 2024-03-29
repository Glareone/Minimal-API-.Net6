﻿// It's K6 test suitecase

// To run this K6 benchmark suite you need to run the following command being in the project's root directory
// k6 run .\K6\ControllerApi\json.js --summary-export=.\K6\ControllerApi\Results\controller-json.json

import http from "k6/http";
import { check } from "k6";
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errorRate');
export let options = {
    summaryTrendStats: ["avg", "p(95)"],
    stages: [
        // Linearly ramp up from 1 to 50 VUs during 10 seconds
        { target: 50, duration: "10s" },
        // Hold at 50 VUs for the next 1 minute
        { target: 50, duration: "1m" },
        // Linearly ramp down from 50 to 0 VUs over the last 15 seconds
        { target: 0, duration: "15s" }
    ],
    thresholds: {
        // We want the 95th percentile of all HTTP request durations to be less than 500ms
        "http_req_duration": ["p(95)<500"],
        // Requests with the staticAsset tag should finish even faster
        "http_req_duration{staticAsset:yes}": ["p(99)<250"],
        // Thresholds based on the custom metric we defined and use to track application failures
        errorRate: [
            // more than 5% of errors will abort the test
            { threshold: 'rate < 0.05', abortOnFail: true, delayAbortEval: '1m' },
        ],
    },
};

export default function () {
    let response = http.get("http://localhost:5004/jsons");
    // check() returns false if any of the specified conditions fail
    check(response, {
        "status is 200": (r) => r.status === 200,
    });
}