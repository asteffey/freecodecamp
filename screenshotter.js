const fs = require('fs')
const puppeteer = require('puppeteer')
const jimp = require('jimp')

const WIDTH = 1000
const HEIGHT = 750

const THUMBNAIL = {
  WIDTH: 400,
  HEIGHT: 300
}

const TMP = 'tmp'
const PATH = 'public/images/screenshots'

const projects = JSON.parse(fs.readFileSync('public/projects.json'));

function toId (name) {
  return escape(name.split(' ').join('_').toLowerCase())
}

(async () => {
  const browser = await puppeteer.launch()
  for (const project of Object.values(projects).flat()) {
    const id = toId(project.name)
    const page = await browser.newPage()
    await page.goto(project.website.replace('?fcc-test', ''), { waitUntil: 'networkidle0' })
    await page.evaluate(() => window.scrollTo(0, Number.MAX_SAFE_INTEGER))
    await page.waitFor(1000)
    await page.setViewport({
      width: WIDTH,
      height: HEIGHT
    })
    const path = `${TMP}/${id}.png`
    await page.screenshot({ path })

    const img = await jimp.read(path)
    img.resize(THUMBNAIL.WIDTH, THUMBNAIL.HEIGHT)
      .write(`${PATH}/${id}.png`)
    console.log(`Saved image for ${id}`)
  }
  await browser.close()
})()
