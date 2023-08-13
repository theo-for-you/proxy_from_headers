import requests

proxy = "127.0.0.1:1234"
server_port = "8001"

requests.get("http://127.0.0.1:" + server_port, headers={
    "HTTP-Proxy": proxy,
    "Target": "duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion"
})

requests.get("http://127.0.0.1:" + server_port, headers={
    "HTTP-Proxy": proxy,
    "Target": "api.ipify.org"
})

requests.post("http://127.0.0.1:" + server_port + "/post?data=1", data="test1", headers={
    "HTTP-Proxy": proxy,
    "Target": "postman-echo.com"
})
