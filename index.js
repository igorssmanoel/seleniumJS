const { Builder, By, Key, until, Capabilities} = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
fs = require("fs");



(async function example() {
  const screen = {
    width: 640,
    height: 480
  };
  
  
  let caps = Capabilities.firefox();
  caps.set('silent', true);
  let driver = await new Builder()
                        .forBrowser("firefox")
                        .withCapabilities(caps)
                        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
                        .build();
  try {
    await driver.get("http://www.google.com/ncr");
    await driver
      .findElement(By.name("q"))
      .sendKeys("http://rentcars.com.br", Key.RETURN);


    let elementoQuantidadeAnuncios = await driver.wait(
      until.elementLocated(By.css("body.vasq #result-stats")),
      10000
    );

    var qtdAnuncios = await elementoQuantidadeAnuncios.getAttribute("textContent");
    console.log(qtdAnuncios);
  } finally {
    await driver.quit();
  }
})();