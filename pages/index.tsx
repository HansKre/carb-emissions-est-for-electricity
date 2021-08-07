import {ThemeProvider} from '@material-ui/styles'
import CustomTheme from '../styles/CustomTheme'
import ElectricityToCarbon from '../components/electricity-to-carbon/ElectricityToCarbon'

export default function Index() {
    return (
        <ThemeProvider theme={CustomTheme}>
            <ElectricityToCarbon />
        </ThemeProvider>
    )
}