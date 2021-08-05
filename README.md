# Description

React-based web-application which lets you enter your electricity usage for a week to and renders your estimated carbon emissions taking into account your location and date.

Please visit the [demo here](https://hardcore-bhabha-ce15d5.netlify.app).

## Installation

```bash
git clone git@github.com:HansKre/carb-emissions-est-for-electricity.git
```

## Development

Inside project-folder, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test your API-Key

Following `curl` command should return a valid API-response:

```bash
export CARBONINTERFACE_API_KEY=<yourkeystring>

curl "https://www.carboninterface.com/api/v1/estimates" \
  -H "Authorization: Bearer \"${CARBONINTERFACE_API_KEY}\"" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"type": "electricity","electricity_unit": "mwh","electricity_value": 42,"country": "us","state": "fl"}'
```

## Deployment

[Netlify](https://netlify.com) is set up to deploy from `github`.
On a push to `github`, Netlify runs the build script on their servers and deploys the result (if successful).

## Contributions

Highly welcome. Please submit via PR.

## Compatibility

`KeyboardTimePicker` needs `MuiPickersUtilsProvider` which uses `DateFnsUtils` from `@date-io/date-fns` package. It seems, that a specific version is required. Install it with `npm install @date-io/date-fns@1.3.13`.

## Backlog

- [x] setup project
- [x] sign up at [carboninterface](https://www.carboninterface.com/dashboard) for API-Key
- [x] setup hosting at netlify
- [ ] add tests
- [ ] document concept for
  - [ ] architecture
  - [ ] design
- [ ] final review of review
  - [x] how to install
  - [ ] how to test
  - [ ] how to use
  - [ ] where to put own API-Key
- [ ] Add state-selection for USA & Canada
