let http = require("http");
let fs = require("fs");

http
  .createServer((req, res) => {
    let json = JSON.parse(fs.readFileSync("api.json"));
    let keys = Object.keys(json);

    let apiElement = fs.readFileSync("api-element.html").toString();
    let css = fs.readFileSync("style.css").toString();
    let html = fs.readFileSync("index.html").toString();
	let js = fs.readFileSync("main.js").toString();

    switch (req.url) {
      case "/style.css":
        res.writeHead(200, { "Content-Type": "text/css" });
        res.write(css);

        break;
      case "/main.js":
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.write(js);

        break;
      default:
        let apiList = "";
        keys.forEach((key) => {
          let type = json[key].type;
          let description = json[key].description;
          let url = json[key].url;
		  let parameters = json[key].parameters;
		
		  let parametersValue = ""
		  if(parameters != undefined) {

		  }

          apiList += apiElement
            .replace(/{apiName}/g, key)
			.replace(/{apiType}/g, type)
			.replace(/{apiTypeUpperCase}/g, type.toUpperCase())
            .replace(/{apiUrl}/g, url)
			.replace(/{apiDescription}/g, description)
			.replace(/{apiParameters}/g, parameters);
        });

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(html.replace(/{apiList}/g, apiList));
    }
    res.end();
  })
  .listen(8080);
