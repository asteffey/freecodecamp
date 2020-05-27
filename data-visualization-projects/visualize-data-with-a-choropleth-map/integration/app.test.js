beforeAll(async () => {
  await page.goto('http://localhost:3000');     
})

describe('nation', () => {
    it('is centered', async () => {
      await page.waitForSelector('#nation')
      
      const svgBox = await page.$('svg').then(svg => svg.boundingBox());
      const nationBox = await page.$('#nation').then(svg => svg.boundingBox());

      expect(Math.abs((nationBox.x - svgBox.x) * 2 + nationBox.width - svgBox.width)).toBeLessThan(1);
  })
});


