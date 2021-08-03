import Head from 'next/head'
import styles from '../styles/Index.module.css'
import {Grid} from '@material-ui/core'
import SetVhResponsivelyWithoutSSR from '../components/utils/setVhResponsively/SetVhResponsivelyWithoutSSR'

export default function Index() {
    const isLoading = true;
    return (
        <div>
            <Head>
                <title>Carb Emissions Est for Electricity</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* material-ui Roboto-Font */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <SetVhResponsivelyWithoutSSR />
            <Grid
                container
                direction="column"
                className={styles.mainGrid}
            >
                <Grid item>
                    <h1>It's Working</h1>
                </Grid>
            </Grid>
        </div>
    )
}