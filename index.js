const fs = require('fs')
const path = require('path')

const logOutput = false

// read sources.json
const sources = JSON.parse(fs.readFileSync(path.join(__dirname, 'sources.json')))

console.log(`Sources: ${sources.length}`)

const sourceArray = []

// process sources
sources.forEach(source => {
    if (logOutput) console.log(source)

    const image = `### ${source.image}`
    let src = []
    if (source.source.includes('\n')) {
        src = source.source.split('\n').map(s => `-> ${s}`)
    } else {
        src = [`-> ${source.source}`]
    }

    sourceArray.push({ title: image, src: src })
})

if (logOutput) console.log(sourceArray)

// process source array for markdown
const md = sourceArray.map(source => {
    return `
${source.title}
${source.src.join('\n')}
`
})

// write to file
fs.writeFileSync(path.join(__dirname, 'sources.md'), md.join('\n'))

console.log('Done!')