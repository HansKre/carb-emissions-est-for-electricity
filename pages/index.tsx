import Head from 'next/head'
import {ThemeProvider} from '@material-ui/styles'
import CustomTheme from '../styles/CustomTheme'
import ElectricityToCarbon from '../components/electricity-to-carbon/ElectricityToCarbon'

export default function Index() {
    return (
        <ThemeProvider theme={CustomTheme}>
            <Head>
                <title>Carb Emissions Est for Electricity</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* material-ui Roboto-Font */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <ElectricityToCarbon />
        </ThemeProvider>
    )
}