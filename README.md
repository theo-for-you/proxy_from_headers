# HTTP proxy from headers
Some http handler without a proxy support -> This server -> Proxy server -> Target 

For example: Nginx -> Tor daemon

## How to use

 
 1. When sending a request set headers:
    > HTTP-Proxy: your_proxy_address:port
    > HTTP-Proxy: 127.0.0.1:1234
	> 
	> Target: target_domain
	> Target: postman-echo.com

2. `npm i`
3. Start script `npm start`
4. Test script `npm test`

## Acknowledgements

 - There's no encryption between your server and this server 
 - Request is transmitted without modification 
 - Uses only http proxy as a target

## To do
 - Make a docker container, probably with a tor daemon
 - Filtering some requests
