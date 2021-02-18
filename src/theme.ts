import { createMuiTheme } from "@material-ui/core"

export const pink = createMuiTheme({
    palette: {
        primary: {
            light: '#B690AA',
            main: '#946184',
            dark: '#634058'
        },
        secondary: {
            light: '#F8F2F3',
            main: '#DBBDC2',
            dark: '#BE8991'
        }
    },
    overrides: {
        MuiTypography: {
            root: {
                color: '#57384F',
            },
            h3: {
                fontFamily: "'Lato', sans-serif",
                textTransform: 'uppercase',
                fontWeight: 'bold'
            },
            h6: {
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 'bold'
            },
            body1: {
                fontFamily: "'Oswald', sans-serif",
            }
        },
        MuiIconButton: {
            colorPrimary: {
                boxShadow: "rgba(183, 164, 174, 0.25) 0px 50px 100px -20px, #948E9988 0px 30px 60px -30px, #946184 0px -2px 6px 0px inset",
                '&.Mui-disabled': {
                    boxShadow: "rgba(183, 164, 174, 0.25) 0px 50px 100px -20px, #948E9988 0px 30px 60px -30px, #C8BCC2 0px -2px 6px 0px inset",
                    color: '#C8BCC2'
                }
            }
        },
        MuiButton: {
            contained: {
                '&.Mui-disabled': {
                    color: '#C8BCC2',
                    backgroundColor: '#F6F4F5'
                }
            }
        }
    }
})


export const blue = createMuiTheme({
    palette: {
        primary: {
            light: '#B9C5ED',
            main: '#3B60CE',
            dark: '#254093',
        },
        secondary: {
            light: '#F2F3F8',
            main: '#BDC2DB',
            dark: '#8991BE'
        }
    },
    overrides: {
        MuiTypography: {
            root: {
                color: '#202846',
                fontFamily: "'Oswald', sans-serif",
            },
            h3: {
                fontFamily: "'Lato', sans-serif",
                textTransform: 'uppercase',
                fontWeight: 'bold'
            },
            h6: {
                fontWeight: 'bold'
            }
        },
        MuiIconButton: {
            colorPrimary: {
                boxShadow: "rgba(183, 164, 174, 0.25) 0px 50px 100px -20px, #948E9988 0px 30px 60px -30px, #8991BE 0px -2px 6px 0px inset",
                '&.Mui-disabled': {
                    boxShadow: "rgba(183, 164, 174, 0.25) 0px 50px 100px -20px, #948E9988 0px 30px 60px -30px, #F2F3F8 0px -2px 6px 0px inset",
                    color: '#BDC2DB'
                }
            }
        },
        MuiButton: {
            contained: {
                '&.Mui-disabled': {
                    color: '#BDC2DB',
                    backgroundColor: '#F2F3F8'
                }
            }
        }
    }
})