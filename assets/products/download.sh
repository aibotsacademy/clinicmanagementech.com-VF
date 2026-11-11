#!/bin/sh
# Optional: download the product photos to host them yourself.
# Then in js/catalog.js replace each img URL with the file name (e.g. 'vitc.jpg').
cd "$(dirname "$0")"
curl -L -o clean.png 'https://sensilis.com/uploaded/products/PURIFY-pdr-0-purify-essential.png'
curl -L -o foam.png 'https://sensilis.com/uploaded/products/MOUSSE_PDR.png'
curl -L -o spf.jpg 'https://static.thcdn.com/productimg/original/11814869-8465238533090118.jpg'
curl -L -o vitc.jpg 'https://static.thcdn.com/productimg/original/11705727-4725323826126148.jpg'
curl -L -o disc.jpg 'https://static.thcdn.com/productimg/1600/1600/11920552-1294818355915284.jpg'
curl -L -o b5.jpg 'https://static.thcdn.com/productimg/original/13938507-1255335527984675.jpg'
curl -L -o tol.jpg 'https://static.thcdn.com/productimg/original/11855111-1145335528389177.jpg'
curl -L -o oral.jpg 'https://www.cantabrialabs.com/dam/jcr:9bfedc33-4732-4bf0-98a1-513c08c1768b/4.Cantabria-Labs-26-9-24_1084_advance-oral-60.jpg'
curl -L -o gelspf.jpg 'https://static.thcdn.com/productimg/original/15309145-1205318396461458.jpg'
curl -L -o retinal.jpg 'https://www.isdin.com/sites/default/files/productos/imagenes/es_thumbnails_retinal_0.jpg'
