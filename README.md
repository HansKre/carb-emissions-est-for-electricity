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

Highly welcome. Please submit via PR.

## Compatibility

- `KeyboardTimePicker` needs `MuiPickersUtilsProvider` which uses `DateFnsUtils` from `@date-io/date-fns` package. It seems, that a specific version is required. Install it with `npm install @date-io/date-fns@1.3.13`.
- [`JSS` fix for `SSR`](https://medium.com/wesionary-team/implementing-react-jss-on-next-js-projects-7ceaee985cad): fixes 'Warning: Prop `className` did not match.' issue when reloading page during development while running `npm run dev`.

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
- [ ] Implement horizontal sliders for mobile screens
