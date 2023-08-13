const http = require("http");
const { request, ProxyAgent } = require('urllib');

const debug = true;
const port = 8001;

function send_req(req) {

    req.headers["host"] = req.headers["target"]
    let proxyAgent = new ProxyAgent('http://' + req.headers["http-proxy"]);

    delete req.headers["http-proxy"]
    delete req.headers["target"]

    let data = "";

    req.on("data", (new_data) => {
        data = new_data;
    })


    req.on("end", async () => {
        try {
            let res = await request("http://" + req.headers["host"] + req.url, {
                method: req.method,
                headers: req.headers,
                dispatcher: proxyAgent,
                data: data
            })

            if (debug) {
                res.data = new TextDecoder().decode(res.data);
                console.log(res)
            }

        } catch (e) { debug ? console.log(e) : 0 }
    })
}



http.createServer((req, res) => {

    try {
        send_req(req)

    } catch (e) { debug ? console.log(e) : 0 }

    try { res.end() } catch (e) { debug ? console.log(e) : 0 }

}).listen(port)
