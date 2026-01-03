# ![The Smorgasboard Logo](https://bvrmyobereaeybqpatjg.supabase.co/storage/v1/object/public/Assets/Smorgasboard%20Logo%20Full.png)

Named as a portmanteau of "Smorgasbord" 🥪 and "Dashboard" 💻, this aims to be an all-you-can-pick dashboard application!

Wanna run this app locally and work on it? Check out the [guide below](https://github.com/radioactive-exe/SmorgasBoard?tab=readme-ov-file#arrow_down-installation--running-instructions-for-developers).

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
- **_Hacker-man_** :computer: — A console-esque theme, characterised with dark grey/black backgrounds, and lime/pale green text reminiscent of MS-DOS and old retro computer displays.
- **_Palenight_** :night_with_stars: — No explanation needed - the sleek well-known and already established IDE theme ported into Smorgasboard.

---

## :arrow_down: Installation & Running instructions for Developers

If needed, this entire application can be installed and run in your own environment locally. This also includes a Supabase server for your own instance, etc. depending on your needs.

Parts [I](#i--setting-up-the-npm-environment) and [II](#ii--setting-up-the-main-environment-variables) are mandatory, and part [III](#iii--setting-up-the-externals) has optional but _highly_ recommended externals to set up (especially [part III.A – Supabase](#iiia--supabase))

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

### II – Setting up the main environment variables

Points to note: All frontend environment variables must have the `VITE_*` prefix. All environment variables mentioned in this section are the ones necessary to simply run the local environment. The others are Keys for APIs and Libraries, which are explained in section III.

1. Frontend:
    1. **`VITE_BACKEND_URL`** – The URL for the backend server. If no options are changed, this should be set to `http://127.0.0.1:3003/`.
2. Backend:
    1. **`ORIGIN_URL`** – The URL that is expected to make the calls to the server, and the one sent back in CORS response headers. In production, this is `https://smorgasboard.irradiated.app`, for example. If no options are changed, this should be set to `http://127.0.0.1:3000`.
    2. **`DEFINITIONS_RELATIVE_PATH`** – This holds the relative path to the public definitions folder inside the backend Middleware being run, from the definition routers. This is stored as an environment variable as the nodemon watch-compilation server and the production node server have differing paths. If no options are changed, this should be set to `/public/definitions`.

### III – Setting up the externals

These are external libraries/frameworks/applications that are not mandatory but quite significant (in varying amounts) to the application, in order of decreasing importance.

**NOTE:** For safety and security reasons, you must set up your own instances of these, and not utilise the one used by the application itself. This ensures all things you are testing are completely contained within your custom environment.

#### III.A – Supabase

For complete functionality with authentication, setting up a supabase project is **_highly_** recommended (see [this link](https://supabase.com/docs/guides/getting-started) for the _Getting Started_ guide from Supabase, including setting up the SDK). It also handles data saving of dashboard info for users, as well as storage buckets for media. Without Supabase, all authenticated functionality is unavailable (including storage).

There are multiple stages to integrating your newly created Supabase project, depending on how much of the functionality you would like to have. Please make sure to have followed Supabase's aforementioned guide before proceeding.

1. First and foremost, populate the environment variables with the Supabase **public** key and project URL, naming them `SUPABASE_KEY` and `SUPABASE_URL` respectively, ensuring to prefix them with `VITE_` in the frontend.
2. Secondly, to follow up on the authentication that is already established, you would want to set up a relevant table, along with all necessary functions and triggers:
    1. A table called `dashboard_data` in the public schema. This will hold all user dashboard information. There are constraints regarding things such as theme IDs being greater or equal to 0, usernames being at least 3 characters long, and usernames being unique. The pSQL code to create the table along with its columns, constraints, and linking to the users table is below:

        ```sql
        create table public.dashboard_data (
            id uuid not null,
            username text null,
            updated_at timestamp with time zone null,
            free_ids bigint[] not null default '{}'::bigint[],
            panels jsonb[] not null default '{}'::jsonb[],
            theme bigint not null default '0'::bigint,
            dimensions jsonb not null default '{"width": 1, "height": 1}'::jsonb,

            constraint dashboard_data_pkey primary key (id),
            constraint dashboard_data_username_key unique (username),
            constraint dashboard_data_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE,
            constraint dashboard_data_theme_check check ((theme >= '-1'::integer)),
            constraint username_length check ((char_length(username) >= 3))
        ) TABLESPACE pg_default;
        ```

    2. A trigger to handle new users. Upon the registration of a new user, two things are performed, firstly, a new row is inserted into the dashboard data table, and secondly, a welcome email is sent. The following is both the trigger call and function definitions, both defined in the public schema:
        1. The following declaration is for the function that inserts the new row, called `handle_new_user` on the public schema. Only the username and user ID are needed, as the other columns have a default value if not assigned:

            ```sql
            create or replace function public.handle_new_user()
            returns trigger
            set search_path = ''
            as $$
            BEGIN
                INSERT INTO public.dashboard_data (id, username)
                VALUES (NEW.id, NEW.raw_user_meta_data->>'username');
                RETURN NEW;
            END;
            $$ language plpgsql security definer;
            ```

        2. The following trigger (called `on_auth_user_created`) simply calls the above defined function when a new user row is defined (aka, when the registration is complete):

            ```sql
            create or replace trigger on_auth_user_created
                after insert on auth.users
                for each row execute procedure public.handle_new_user();
            ```

    3. Broadcast all changes to the dashboard data row concerning a user to all currently logged-in clients for that user. This is what allows Smorgasboard to immediately refresh if the user has multiple logged in clients open and performs a change on one (see [this link](https://supabase.com/blog/realtime-broadcast-from-database "Realtime broadcast from Database") for Supabase's article regarding this topic). The below pSQL for the broadcasting behaviour for the particular table creates a user-specific channel based on their ID:

        ```sql
        create or replace function public.broadcast_dashboard_change()
        returns trigger
        language plpgsql
        set search_path = pg_catalog,realtime,public
        SECURITY DEFINER
        AS $$
        DECLARE
            topic text;
        BEGIN
        PERFORM set_config('search_path', 'pg_catalog,realtime,public', true);
            topic := 'changes_user_' || COALESCE(NEW.id::text, OLD.id::text);
            PERFORM realtime.broadcast_changes(topic, TG_OP, TG_OP, TG_TABLE_NAME, TG_TABLE_SCHEMA, NEW, OLD);
            RETURN NEW;
        END;
        $$;
        ```

    4. Lastly, you can set up the edge function that sends the welcome email upon registering and confirmation. Call this function something you will remember, such as `send_welcome_email`.
        1. First, the edge function itself. Ensure you import and use the proper API functionality for your selected SMTP server, checking their docs for all appropriate functions and flows. The below code gives an example using the Mailgun API (which Smorgasboard uses), sending the welcome email stored in the template `welcome_email_smorgasboard` from my custom domain and email address (the one you'd get emails from), `radioactive@mail.irradiated.app`:

            ```js
            import "jsr:@supabase/functions-js/edge-runtime.d.ts";
            import FormData from "form-data";
            import Mailgun from "mailgun.js";
            const mailgun = new Mailgun(FormData);
            const mg = mailgun.client({
                username: "api",
                key: Deno.env.get("MAILGUN_SENDING_KEY") || "API_KEY",
            });
            console.log(`Function "send-email-smtp" up and running!`);
            Deno.serve(async (_req) => {
                try {
                    if (_req.method === "OPTIONS") {
                        return new Response("ok", {
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "POST",
                                "Access-Control-Expose-Headers":
                                    "Content-Length, X-JSON",
                                "Access-Control-Allow-Headers":
                                    "apikey,X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
                            },
                        });
                    } else {
                        const request = await _req.json();
                        const data = await mg.messages.create(
                            "mail.irradiated.app",
                            {
                                from: "Radioactive <radioactive@mail.irradiated.app>",
                                to: [
                                    `${request.username ?? "Placeholder"} <${request.email ?? ""}>`,
                                ],
                                template: "welcome_email_smorgasboard",
                                "h:X-Mailgun-Variables": JSON.stringify({
                                    username: request.username ?? "Placeholder",
                                }),
                            },
                        );
                        console.log(data);
                    }
                } catch (error) {
                    return new Response(error.message, {
                        status: 500,
                    });
                }
                return new Response(
                    JSON.stringify({
                        done: true,
                    }),
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
            });
            ```

        2. Ensure you have the necessary mappings in the sibling `deno.json` file to the above function code:

            ```json
            {
                "imports": {
                    "mailgun.js": "npm:mailgun.js",
                    "form-data": "npm:form-data"
                }
            }
            ```

        3. Finally, invoke this function using the Supabase SDK, making sure to pass all necessary arguments based on your definition:

            ```js
            supabase.functions.invoke("send_welcome_email", {
                body: {
                    email: user.email,
                    username: user.username,
                },
            });
            ```

#### III.B – External APIs

A handful of panels require external APIs to obtain and use data. Without them, the program itself still functions, but the panels in question will have limited functionality.

Below is a list (that will be kept up to date) of all external APIs, along with any necessary environment variables to be set up, and their purpose in Smorgasboard:

| API                                       | Use            | Environment variables                                                               |
| ----------------------------------------- | -------------- | ----------------------------------------------------------------------------------- |
| [WeatherAPI](https://www.weatherapi.com/) | Weather Panels | `WEATHER_API_KEY` - backend environment. This is the key used for calls to the API. |

#### III.C – Mailgun SMTP

While optional and won't change the behaviour of the website itself at all, you might benefit/want the features from setting up a custom SMTP, as Supabase's SMTP offerings for free tiers are quite limited. Mailgun is recommended, but do note that a custom domain is required to send to public non-authorised users (i.e. users, etc.). This is only necessary when you would want to test the password reset flow through email OTPs, etc. If you want to use Mailgun, be sure to check out their [quick start documentation](https://documentation.mailgun.com/docs/mailgun/quickstart "Quickstart: Send Your First Email").

### IV – External/Debugging tool recommendations

- _**[Playwright](https://playwright.dev/):**_ Through its CLI, this Microsoft-created tool allows installation and running of developmental builds of different browsers, including Webkit, Firefox, and Chromium/Chrome. See [this section of their docs](https://playwright.dev/docs/browsers), and [this main starting guide](https://playwright.dev/docs/intro). I recommend installing Playwright globally, after which you can install the browser builds you prefer (such as the latest Webkit dev. build) and test any web application, not just Smorgasboard.
- _**[HimbeersaftLP/ios-safari-remote-debug-kit](https://github.com/HimbeersaftLP/ios-safari-remote-debug-kit):**_: A tool that allows you to debug iOS safari on a connected iOS device directly through developer tools on your desktop device. Highly recommended, as it makes debugging on specifically mobile devices and Webkit much easier. It includes things such as highlight selection, etc.

---

## Developmental Information

### For developers

Please keep ESLint configuration the same to ensure consistent code structure and layout, as well as consistent documentation comments.

### Powered by

_Application Utilities, Libraries, and Hosting:_ Mailgun, Supabase, Zod, Vercel, and Cloudflare.

Panel Data: WeatherAPI.com
