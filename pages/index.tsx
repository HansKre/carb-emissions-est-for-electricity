import {ThemeProvider} from '@material-ui/styles';
import CustomTheme from '../styles/CustomTheme';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const ElectricityToCarbonWithoutSSR = dynamic(
    () => import('../components/electricity-to-carbon/ElectricityToCarbon'),
    {ssr: false}
)

export default function Index() {
    return (
        <ThemeProvider theme={CustomTheme}>
            <Head>
                <title>Carb Emissions Est for Electricity</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                {/* PWA primary color */}
                <meta name="theme-color" content={CustomTheme.palette.primary.main} />
            </Head>
            <ElectricityToCarbonWithoutSSR />
        </ThemeProvider>
    )
}