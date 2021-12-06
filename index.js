const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    let filepath = path.join(__dirname, 'public/templates', req.url == '/' ? 'index.html' : req.url)
    let extname = path.extname(filepath)
    let contenttype = 'text/html'
    switch(extname) {
        case '.js':
            contenttype = 'text/javascript'
            break
        case '.css':
            contenttype = 'text/css'
            break
    }
    fs.readFile(filepath, (err, content) => {
        if(err) {
            if(err.code === 'ENOENT') {
                //page not found
                fs.readFile(path.join(__dirname, 'public/templates', '404.html'), (err, content) =>{
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(content, 'utf8')
                })
            } else {
                //server error?
                res.writeHead(500)
                res.end(`server error: ${err.code}`)
            }
        } else {
            //success!
            res.writeHead(200, {'Content-Type': contenttype})
            res.end(content, 'utf8')
        }
    })
})

const port = process.env.PORT || 5000
server.listen(port, () => {
    console.log(`server running on port ${port}...`)
})