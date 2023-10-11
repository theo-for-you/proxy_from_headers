
import http from "http";
import { request, ProxyAgent, HttpMethod } from "urllib";

const port = 8001;


function send_req(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {


    let proxyAgent = new ProxyAgent('http://' + req.headers["http-proxy"]);

    // proxy is not seen to the reciever
    req.headers['host'] = <string>req.headers['target'];
    delete req.headers["target"]
    delete req.headers["http-proxy"]

    let data = "";

    req.on("data", (new_data) => {
        data = new_data;
    })


    req.on("end", async () => {
        try {

            let proxy_res = await request("http://" + req.headers["host"] + req.url, {
                method: <HttpMethod>req.method,
                headers: req.headers,
                dispatcher: proxyAgent,
                data: data
            })

            res.statusCode = proxy_res.statusCode
            //python unable to decode
            delete proxy_res.headers['content-encoding']

            for (let header in proxy_res.headers) {
                res.appendHeader(header, <string>proxy_res.headers[header])
            }

            res.end(proxy_res.data)


        } catch (e) {
            res.statusCode = 400
            res.end()
            console.log(e)
        }
    })
}


http.createServer((req, res) => {

    try {
        send_req(req, res)
    } catch (e) {
        res.statusCode = 400
        res.end()
        console.log(e)
    }


}).listen(port, () => { console.log("started on " + port) })
