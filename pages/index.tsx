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
                {/* favicon */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <ElectricityToCarbon />
        </ThemeProvider>
    )
}