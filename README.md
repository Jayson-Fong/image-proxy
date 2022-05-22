# Serverless Web Proxy

A simple serverless image proxy designed for Cloudflare Workers.

Path Format: /PROTOCOL/DOMAIN/PATH?proxy-fetch-token=PROXY-FETCH-TOKEN

Any search parameters besides `proxy-fetch-token` are forwarded.

TODO:

- Implemenent `proxy-fetch-token` verification (and configurable secret)
- Add constraints via environmental variables (size, timeout)
