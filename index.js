// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//     let filepath = path.join(__dirname, 'public/templates', req.url == '/' ? 'index.html' : req.url)
//     let extname = path.extname(filepath)
//     let contenttype = 'text/html'
//     switch(extname) {
//         case '.js':
//             contenttype = 'text/javascript'
//             break
//         case '.css':
//             contenttype = 'text/css'
//             break
//     }
//     fs.readFile(filepath, (err, content) => {
//         if(err) {
//             if(err.code === 'ENOENT') {
//                 //page not found
//                 fs.readFile(path.join(__dirname, 'public/templates', '404.html'), (err, content) =>{
//                     res.writeHead(200, { 'Content-Type': 'text/html' })
//                     res.end(content, 'utf8')
//                 })
//             } else {
//                 //server error?
//                 res.writeHead(500)
//                 res.end(`server error: ${err.code}`)
//             }
//         } else {
//             //success!
//             res.writeHead(200, {'Content-Type': contenttype})
//             res.end(content, 'utf8')
//         }
//     })
// })

// const port = process.env.PORT || 5000
// server.listen(port, () => {
//     console.log(`server running on port ${port}...`)
// })

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')

app.use(express.static(path.join(__dirname, 'public/templates')))

app.get('/', (req, res) => {
    res.render('index.html')
})
app.get('/about', (req, res) => {
    res.render('about.html')
})
app.get('/contact', (req, res) => {
    res.render('contact.html')
})
// catch 404 error
app.use((req, res, next) => {
    res.status(404)
    res.redirect('404.html')
})
// catch server error
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.send(500, 'unexpected internal error')
})

app.listen(port, () => {
    console.log(`listening on port: ${port}...`)
})