﻿import fs from "fs";
import http from "http";
import Megoldás from "./Megoldás";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");

        // Kezd a kódolást innen -->

        //1
        const megold: Megoldás = new Megoldás("utasadat.txt");
        //2
        res.write(`2.Feladat: a buszra ${megold.felszallokSzama} utas akart felszállni`);
        //3
        res.write(`\n3. Feladat: A buszra ${megold.ervenytelenFelszallas} utas nem szállhatott fel.`);
        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
