# Description

React-based web-application which renders your estimated carbon emissions
based on your input for country and electricity usage for a week.

## How to use

Please visit the [application here](https://hardcore-bhabha-ce15d5.netlify.app).

## Development

Clone the repo:

```bash
git clone git@github.com:HansKre/carb-emissions-est-for-electricity.git
```

Run development server:

```bash
cd carb-emissions-est-for-electricity
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Tests are implemented using [`cypress.io`](https://www.cypress.io/), an End to End Testing Framework.
Run `npm test` to receive a test-report or `npm run test:open` to run tests interactively.

## Bring your own `API-Key`

Since the free-tier of `https://www.carboninterface.com`-API is limited to 200 requests per month, following precautions are implemented:

- all non-production-api-calls are mocked
- all api-calls made by tests are mocked
- all production-api-calls are cached server-side

If you want to use your own `API-Key` locally, please make sure to:

- rename `.env.example` file to `.env`
- inside the `.env`, add your `API-Key` to `CARBONINTERFACE_API_KEY` property
- run with `npm run prod`

## Test your `API-Key`

Following `curl` command should return a valid API-response:

### Example-Request

```bash
export CARBONINTERFACE_API_KEY=<yourkeystring>

curl "https://www.carboninterface.com/api/v1/estimates" \
  -H "Authorization: Bearer \"${CARBONINTERFACE_API_KEY}\"" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"type": "electricity","electricity_unit": "mwh","electricity_value": 17,"country": "us","state": "fl"}' | jq .
```

### Example-Response

```json
{
  "data": {
    "id": "e940c8a9-7297-4560-8944-66834de107b1",
    "type": "estimate",
    "attributes": {
      "country": "us",
      "state": "fl",
      "electricity_unit": "mwh",
      "electricity_value": 17,
      "estimated_at": "2021-08-06T14:27:59.751Z",
      "carbon_g": 6763764,
      "carbon_lb": 14911.55,
      "carbon_kg": 6763.76,
      "carbon_mt": 6.76
    }
  }
}
```

## Deployment

[Netlify](https://netlify.com) is set up to deploy from `github`.
On a push to `github`, Netlify runs the build script on their servers and deploys the result (if successful).

## Contributions

Highly welcome. Please submit a PR.

## Compatibility

- `KeyboardTimePicker` needs `MuiPickersUtilsProvider` which uses `DateFnsUtils` from `@date-io/date-fns` package. For compatibility reasons, version `1.3.x` is required. Install it with `npm install @date-io/date-fns@1.3.13`.
- [`JSS` fix for `SSR`](https://material-ui.com/styles/advanced/#next-js): fixes 'Warning: Prop `className` did not match.' issue when reloading page during development while running `npm run dev`.

## Backlog

- [x] setup project
- [x] sign up at [carboninterface](https://www.carboninterface.com/dashboard) for API-Key
- [x] setup hosting at netlify
- [ ] add tests
  - [x] for desktop
  - [ ] for mobile
- [x] final review of review
  - [x] how to install
  - [x] how to test
  - [x] how to use
  - [x] where to put own API-Key
- [ ] Add state-selection for USA & Canada
- [ ] For small mobile screens, change sliders orientation to horizontal
- [ ] Make Icons-onClick open Select and Datepicker in CountryForm
