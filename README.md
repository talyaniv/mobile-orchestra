# Mobile Devices Orchestra
Creating and operating a Mobile Device Orchestra

**Prerequisites:**

- [Node > 14](https://nodejs.org/)

**Content:**

* [What is it](#what-is-it)
* [Getting Started](#getting-started)
* [Under the hood](#under-the-hood)
* [Debugging](#debugging)
* [Help](#help)
* [License](#license)


## What is it

A composition of 6 musical tracks that can be played on mobile devices in tandem, creating a shared musical experience.

To override internet connectivity issues, the app can be installed and run on a computer, and the MC should advise all users to connect to the local router via WiFi and navigate their browsers to the relevant computer's IP address.

Each user receives one of the 6 tracks by round-robin selection (e.g. user 1 receives track 1, user 2 receives track 2 and then user 7 receives tracks 1 and so forth).

All users are required to hit the start button. This will put their devices in "ready" state.

When all users are ready, the MC can start the orchestra by navigating to
`/mbo/start/`
and typing the password

All devices will receive a socket message to start playing.

Don't expect full sync! That's the beauty of this piece.

## Getting Started

To deploy this on a computer, we first install the server, then the client.

```bash
cd server
npm install
cd ../
npm install
```

To actually run, there is a built-in script that builds the client and runs the server

```bash
npm start
```

That's it!

### Under the hood

The server runs both HTTP server and [Socket.IO](https://socket.io/)

The HTTP server has two routs

`/` is the client app for all users
`/mbo/start` is the MC page for starting the orchestra. This requires a password, which is found in the server's .env file (currently "1234")

When a client starts, it connects to the Socket.io server and receives a message with the current track number to load (1~6). The background color matches the track number.

The user is required to tap the Start button. This ensures that the sound will play by direct user interaction, as most mobile browsers won't allow programmatic automatic audio playing, for a good reason. The sound begins to play and immediately pauses.

When the MC detects that all users are ready, the MC navigates to `/mdo/start`, inputs the password and submits. All users then receive a socket message to start playing, and the audio will begin to play somewhat simultanuously in all mobile browsers.

## Debugging

The server and clients can run separately, so one can update the client code on the fly:

Start the server

```bash
cd server
npm start
```

Start the client in port 3000 to debug. In the root directory:
```bash
npm run start-client
```

## License

GNU [GNU General Public License Version 2](https://opensource.org/licenses/GPL-2.0).
