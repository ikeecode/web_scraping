const ppt = require("puppeteer");

async function getData(){
    const browser = await ppt.launch({headless:false}) // permet de lancer le navigateur
    const page    = await browser.newPage() // permet d'instancier une page dans le navigateur
                    await page.goto("https://www.ulaval.ca/etudes/programmes") // permet d'acceder à un site par son url
                    await page.evaluate(async function () {  // permet de retourner un promise
                        var data = new Array()
                        const div = document.querySelectorAll(".programme-etudes")
                        // console.log(div)
                        div.forEach((item, i) => {
                          domain = ''
                          domaines = item.querySelector(".domaines").querySelectorAll('div')
                          domaines.forEach(item => {
                            domain += item.innerText + '-'
                          })

                          domain = domain.substring(0,domain.length - 1)
                          object = {
                            name : 'XX' + item.querySelector(".titre-programme").innerText,
                            description : item.querySelector(".description-programme").innerText.substring(1, 100),
                            domaines : domain,
                            university: 'Laval',
                            credits : item.querySelector(".credits").innerText,
                            duree : item.querySelector(".duree").innerText,
                            fees : '$'+ Math.ceil(Math.random() * 10000)
                          }
                          // data.push(object)
                            fetch("http://localhost:5000/Laval/programs/", {
                                  method: "POST",
                                  body: JSON.stringify(object),
                                  headers: {
                                      "Content-type": "application/json charset=UTF-8",
                                      "Access-Control-Allow-Origin" : "*"
                                  }
                              })
                        })
                    // return JSON.stringify(data)
                })
}
getData()
