# :stopwatch: Winter Dial

## Visualizing Weather Data
A weather radial is an efficient representation of a geolocation's weather over the course of a year. Within a single field of view, we can visually process a tremendous amount of data in a manner that is faster, easier and more memorable than if the data was displayed in a table format. 
>For those curious about the underlying science behind this, I invite you to check out this post [KnowRelation] 

## How does it work?
A weather radial is akin to clock :clock2: , with the fundamental difference being the amount of time represented over the circle's 360 degrees. Where standard analog clocks uses 1/12 of the circle to denominate the passage of 1 hour, weather radials use 1/12 of the circle to denominate 1 month. Hence, instead of the ticks between the hours representing minutes of the hour, the ticks 
	represent days of the month.

## Are there any ifs to be aware of?
Just this one:
<!-- >#  :stopwatch: ``` === isDialedIn  ? ```
># ?   :snowflake: :ok_man: :snowflake:  ```:```
># :   :cloud_with_lightning_and_rain: :no_good_man: :cloud_with_lightning_and_rain:   ```;``` -->
>### :stopwatch: ``` === dialedIn  ? ``` :snowflake: :ok_man: ```:```   :cloud_with_lightning_and_rain: :no_good_man: ```;```


# Usage
See the weather patterns, plan ski/snowboard trip accordingly, live the dream. 

Or, for those who prefer emojii-based story-telling:

> ## ``` const isDialedIn = if( ``` :cloud_with_snow: && :thinking: && :stopwatch: ```) { ```
> ### ```const [ ``` :smiley: , :business_suit_levitating: ```] = ``` :tram: :mountain_snow: :snowboarder: :skier: :mountain_snow:
> ### ``` return ``` :stuck_out_tongue_closed_eyes: :call_me_hand:
> 
> #### ``` } else { ```
> 
> ### ``` const [ ``` :man_shrugging: , :frowning_man: ```] = ```:confused::beers::slightly_frowning_face: 
> ### ``` return ``` :man_facepalming:
> 
> ## ```}```   
   

## Quick Start
The following terminal commands will clone this repository onto your local machine and open up a local instance of the code in your browser, allowing you to freely modify the code however you like in your text editor of choice (I use VSCode).

Clone the repo:
>git clone https://github.com/noblemillie/dialed-in.git

Move into the newly cloned directory:
>cd dialed-in

Spin up a local server instance however you like. One of the more popular ways of doing so is via the npm package live-server. If you need to download and install, follow this link and respective instructions. 

If already installed, fire it up with the following terminal command: 
`live-server

# Data 
## Drivers
	I chose to collect weather data for Squaw Valley, as it's been my home ski resort throughout my life. If you are a skier or snowboarder and want to play around with the code in this repo, I highly recommend hunting down data from your favorite ski mountain to use.
	
	The api endpoints I used to drive the visualization were:
		- date of recorded weather
		- minimum recorded temperature for each calendar day
 		- maximum recorded temperature for each calendar day
		- current year snowfall for each calendar day
 		- maximum recorded snowfall for each calendar day
 		- total accumulated snowfall for each calendar year

## Sources
### Temperature Data
Temperature data collected from the [World Weather](http://worldweatheronline.com) API using the following endpoints:
	
##### Database Endpoints
| Endpoint Path | Data Description                                                    |
| ------------- | ------------------------------------------------------------------- |
| "maxtempF"    | Highest temperature recorded that day for the calendar date queried |
| "mintempF"    | Lowest temperature recorded that day for the calendar date queried  |
| "avgtempF"    | Average temperature recorded that day for the calendar date queried |
| "totalSnow"   | Total snowfall recorded that day for the calendar date queried      |


### Snowfall Data
I scraped snowfall data for the last seven ski seasons from the Squaw Valley Alpine Meadows [website](https://squawalpine.com/mountain-information/squaw-valley-snowfall-tracker/) and converted the table data to json using a handy online csv-to-json converter [tool](https://www.csvjson.com/csv2json). Data collected from the following table columns:

| Column Name      | Data Description                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| 6,200-24hr       | Single-day total snowfall recorded by instruments at 6,200ft elevation  (base of the mountain)            |
| 6,200-Cumulative | Cumulative ski-season total snowfall recorded by instruments at 6,200ft elevation  (base of the mountain) |
| 8,000-24hr       | Single-day total snowfall recorded by instruments at 8000ft elevation (top of the mountain)               |
| 8,000-Cumulative | Cumulative ski-season total snowfall recorded by instruments at 8000ft elevation  (top of the mountain)   |


# Documentation
Wrote a blog post [inanimatedObjects] detailing my motivations to create this visualization and the logic I used in my design decisions.  Additionally I wrote a post on my dev blog [Nth Attempt] which details the various challenges encountered while writing the code, the steps I took to address them and the learnings I thought were worth sharing.  

# Credits
This project was heavily inspired by the impressive work of [Timm Kekeritz](https://twitter.com/kekeritz) and [Frank Rausch](https://twitter.com/frankrausch) of [Raureif](https://raureif.net/en) from their [Weather Radials](weather-radials.com) project. 

[Linear SVG Gradient - Weather Radial](http://bl.ocks.org/nbremer/a43dbd5690ccd5ac4c6cc392415140e7/18d8999a1a4eb87dd91beff258027adc4efdf7e3) by [Nadieh Bremer](https://twitter.com/NadiehBremer) was key in developing my understanding of how to implement the code. Her work has been a repeated source of inspiration for me and highly recommend checking out her portfolio for javascript folk interested in d3.js.

Lastly, special thanks to [Rob Harris](https://twitter.com/trebor) for providing insight, feedback and guidance on the project.
