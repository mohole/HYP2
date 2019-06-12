*** testo da sistemare ***
HYP is an App sviluppata a livello scolastico da …

## Perche
dopo aver notato delle mancanze da parte del servizio utilizzato dalla scuola come gestionale delle attivita scolastiche ci siamo messi in gioco per creare un applicazione per avvicinare le informazioni, attivita, novita della scuola allo studente medio 

il risultato e una PWA
il risultato finale necessita fondi per essere migliorata

##Getting starter
### Visualizzare la PWA
il sito e online tramite Netlify

### Migliorare HYP

```sh
git clone …. 
cd hyp …. 
npm install
npm start
```
...and the magic happens ( ◔ ౪◔)⊃━☆ﾟ.*・

## Perché React
pressoche tecnologia imposta 
perche noi crediamo nell'imparare mettendo in pratica le nozioni 
per conoslidare le competenze
    
## Perché Strapi
come collegare strapi
###axios

## perché wp-api
pressoché imposto...
###come collegare wp-api

```sh
 Promise.all([
      fetch("https://moholepeople.it/dashboard/wp-json/wp/v2/posts/").then(
        data => data.json()
      ),
      fetch("https://moholepeople.it/dashboard/wp-json/wp/v2/media/").then(
        media => media.json()
      ),
      fetch("https://moholepeople.it/dashboard/wp-json/acf/v3/posts").then(
        data => data.json()
      )
    ]).then(([posts, media, calendar, categories]) => {
      this.setState({
        posts,
        media,
        calendar,
        categories, 
        loading: false
      });
      console.log(this.state);
    });
```

## perche HYP2
ci fu HYP
falli
ora c'é HYP2

## requiremnts
node.js
account strapi 

## si ringrazia

