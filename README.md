# Blockchain UI

This is hosted for your convenience: [https://blockchain-challenge.firebaseapp.com/](https://blockchain-challenge.firebaseapp.com/)

Because of `No 'Access-Control-Allow-Origin'` problems, I've attached a gif of it working:

If you want, please install this chrome extensive and turn on CORS to be able to see the app for yourself:
[https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

Otherwise, here's how it looks with cross-origin enabled:
[![https://gyazo.com/a940d8299792125ccc28093c05a0360c](https://i.gyazo.com/a940d8299792125ccc28093c05a0360c.gif)](https://gyazo.com/a940d8299792125ccc28093c05a0360c)

And here's without:
[![https://gyazo.com/da14c0962a1ebd9d7073f04fce05f51c](https://i.gyazo.com/da14c0962a1ebd9d7073f04fce05f51c.gif)](https://gyazo.com/da14c0962a1ebd9d7073f04fce05f51c)

You'll also find that it's responsive:
[![https://gyazo.com/c5836dca2125d82235e600eeff202017](https://i.gyazo.com/c5836dca2125d82235e600eeff202017.gif)](https://gyazo.com/c5836dca2125d82235e600eeff202017)

Because of cross origin problems, I fell back on making fake data and the thumbnails. Otherwise, with cross-origin enabled, the charts and data are all real-time.
### Running

This was ran locally on firebase. If you'd like, clone, then run it with `firebase init`, and `firebase serve` if you want to run it locally as well.

### Thoughts

Originally, I wanted to use React for this, but I wanted to really showcase my UX/UI development. That said, I would know how to approach this if given more time.



### Process

###### CSS
When it comes to CSS, I choose SCSS to get the job done. Using [Prepros](https://prepros.io/) as my pre-processor, I'm able to use modular styling to keep things organized.

When it comes to classes, I try to keep my naming conventions close to [BEM](http://getbem.com/naming/).

###### HTML
This was built with semantic markdown in thought. I am a big proponent of being able to read html and visualize it without compiling it.

###### JavaScript
This is just vanilla JavaScript. I tried to keep things as DRY as possible by breaking things down into functions.

Originally, I wanted to use React, but as per the challenge, I wanted to build a UI first. I would be 1000% happy to build it in React if necessary.

I used `axios` as my XMLHttpRequest. `fetch` is also nice, but `axios` just feels more simple. There is the concern of `No 'Access-Control-Allow-Origin'`, but after hours of debugging, I want to determine and say it's the endpoint rather than the request itself.
