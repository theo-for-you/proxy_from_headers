import requests

proxy = "127.0.0.1:1234"
proxy_from_headers = "http://127.0.0.1:8001"

r = requests.get(proxy_from_headers, headers={
    "HTTP-Proxy": proxy,
    "Target": "duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion"
})
print(r.ok)

r = requests.get(proxy_from_headers, headers={
    "HTTP-Proxy": proxy,
    "Target": "api.ipify.org"
})
print(r.text, r.ok)

r = requests.post(proxy_from_headers + "/post?data=1", data="test1", headers={
    "HTTP-Proxy": proxy,
    "Target": "postman-echo.com"
})
print(r.text, r.ok)
