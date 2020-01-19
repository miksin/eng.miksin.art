const fs = require('fs')

function padding (number, digit = 2, pad = '0') {
  const pads = new Array(digit).fill(pad).join('')
  return `${pads}${number}`.slice(-digit)
}

function todayString () {
  const d = new Date()
  return `${padding(d.getFullYear(), 4)}-${padding(d.getMonth() + 1)}-${padding(d.getDate())}`
}

function genFrontMatter (meta) {
  const keys = [
    'path',
    'title',
    'date',
    'excerpt',
    'featuredImage',
    'category',
    'tags'
  ]

  let frontmatter = "---\n"
  keys.forEach(key => {
    const item = meta[key] || ''
    frontmatter = `${frontmatter}${key}: ${item}\n`
  })
  frontmatter += '---\n'

  return frontmatter
}

function main () {
  const args = process.argv.slice(2)
  const usage = `Usage: node scripts/newMd.js <blog|gallery> <title> [date]`

  if (args.length < 2) {
    console.log(usage)
    return
  }

  const category = args[0]
  if (!category.match(/^(blog|gallery)$/)) {
    console.log(usage)
    return
  }

  const title = args[1]
  const date = args[2] && args[2].match(/^\d{4}\-\d{2}\-\d{2}$/) ? args[2] : todayString()

  const name = `${date}-${title}`.toLowerCase().replace(/\//g, '')
  const path = `/${category}/${name}`
  const folder = `src/pages${path}`

  if (fs.existsSync(folder)) {
    console.log(`article exists: ${path}`)
    return
  }

  const frontmatter = genFrontMatter({
    path,
    title,
    date
  })

  fs.mkdirSync(folder)
  fs.writeFileSync(`${folder}/index.md`, frontmatter)

  console.log(`'${folder}' created`)
}

main()
