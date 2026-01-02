# ![The Smorgasboard Logo](https://bvrmyobereaeybqpatjg.supabase.co/storage/v1/object/public/Assets/Smorgasboard%20Logo%20Full.png)

Named as a portmanteau of "Smorgasbord" 🥪 and "Dashboard" 💻, this aims to be an all-you-can-pick dashboard application!

## :bulb: Features

Pick and choose different panel types (akin to widgets), move them around, resize them, and even change the whole colour theme to make the dashboard be truly yours.

Panels have different minimum sizes (that they have upon spawning), and some can only have particular aspect ratios. Want to figure out any important information about a panel, such as its aspect ratios, or what external API it uses? Click the _menu button_ (top right of a panel in edit mode), and any important things will be explained!

### :white_large_square: Panels (Implemented so far)

- **_Clock Panel_** :clock2: – Self explanatory! Keep track of the current time, with customisable time formats, date formats, and presence of seconds.
- **_Notepad Panel_** :spiral_notepad: – Got a lot of sticky notes everywhere? Here's a digital notepad you can stick around everywhere in your dashboard!
- **_Photo Panel_** :framed_picture: — Keep your pets or loved ones right there with the rest of the stuff that matters to you, framing your favourite photos. **NOTE: This is available to authenticated users only due to local storage limitations.**
- **_Todo Panel_** :white_check_mark: – Way too many tasks to keep track of? It can be a mess. This panel allows you to stay on top of the tasks you need to do, checking them off one by one. If you have multiple sets of tasks to keep track of, just give each list a custom title to keep things organised!
- **_Weather Panel_** :cloud_with_rain: – Keep track of the weather, seeing both current information and 24 hours of forecast information. Have some locations you always want to be on top of? Save them for a constant simple overview, listing the current, maximum, and minimum temperatures for the day at a glance, or click/tap on a location to view the detailed forecast!

### :art: Themes (Implemented so far)

- **_Default_** :green_square: — The pleasing verdant and teal style, seen in emails and logos (such as the one at the top of this document).
- **_Hacker-man_** :gear: — A console-esque theme, characterised with dark grey/black backgrounds, and lime/pale green text reminiscent of MS-DOS and old retro computer displays.
- **_Palenight_** :night_with_stars: — No explanation needed - the sleek well-known and already established IDE theme ported into Smorgasboard.

---

## Installation & Running instructions for Developers

**NB:** "Frontend" will be used to refer to the `./frontend` subfolder, and "Backend" will be used to refer to the `./backend` subfolder respectively. "Root folder" is the directory that contains the front and backend folders, as well as the documentation folder, ESLint and Prettier configs, etc.

### I – Setting up the NPM environment

1. Clone this repository.
2. Ensuring you are in the root folder, run the following command to install and connect all dependencies:

    ```console
     npm i
    ```

3. Having installed all dependencies and instantiated the Node environment, you can run any of the following commands to run any part of the local environment:
    1. In the root folder, using _concurrently_:
        1. `npm run client` – runs the client side with Vite and watch-compilation.
        2. `npm run server` – runs the server with nodemon and watch-compilation.
        3. `npm run run_local` – runs the entire application, including both the server and the client. This is the only script needed if you wish to run the whole application at once.
        4. `npm run gen_docs` – generates markdown documentation from all TSDoc comments throughout the code into an output directory, `./doc` by default. Make sure to run this after editing functions, or adding new ones (and their respective TSDoc comments).
    2. Frontend:
        1. `npm run watch` – compiles and watches for any changes.
        2. `npm run dev` – runs the dev environment using Vite, allowing you to test the application - it is configured to be hosted on `http://127.0.0.1:3000`.
    3. Backend:
        1. `npm run watch` – compiles and watches for any changes.
        2. `npm run start` – runs the server using nodemon, listening for all requests - it is configured to be hosted on `http://127.0.0.1:3003`.

However, there are a few environmental variables that need to be set up (required), and there are a few additional steps to take if you want to have complete functionality with Supabase, trigger functions, and APIs (recommended for full functionality, but not obligatory).

### II – Setting up the necessary environment variables

Points to note: All frontend environment variables must have the `VITE_*` prefix. All environment variables mentioned in this section are the ones necessary to simply run the local environment. The others are Keys for APIs and Libraries, which are explained in section III.

1. Frontend:
    1. **`VITE_BACKEND_URL`** – The URL for the backend server. If no options are changed, this should be set to `http://127.0.0.1:3003/`.
2. Backend:
    1. **`ORIGIN_URL`** – The URL that is expected to make the calls to the server, and the one sent back in CORS response headers. In production, this is `https://smorgasboard.irradiated.app`, for example. If no options are changed, this should be set to `http://127.0.0.1:3000`.
    2. **`DEFINITIONS_RELATIVE_PATH`** – This holds the relative path to the public definitions folder inside the backend Middleware being run, from the definition routers. This is stored as an environment variable as the nodemon watch-compilation server and the production node server have differing paths. If no options are changed, this should be set to `/public/definitions`.

### III – Setting up the externals

TODO: Supabase + edge functions, Mailgun, WeatherAPI.

---

## Developmental Information

### For developers

Please keep ESLint configuration the same to ensure consistent code structure and layout, as well as consistent documentation comments.

### Powered by

_Application Utilities, Libraries, and Hosting:_ Mailgun, Supabase, Zod, Vercel, and Cloudflare.

Panel Data: WeatherAPI.com
