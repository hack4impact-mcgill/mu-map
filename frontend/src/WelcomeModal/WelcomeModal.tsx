import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MULogo from "MULogo/MULogo";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { LIGHTBLUE } from 'constants/constants';

interface IWelcomeModalProps {
    open: boolean;
    handleClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: theme.spacing(5),
    },
    title: {
        textAlign: "center",
        marginTop: theme.spacing(4),
        display: "block",
    },
    logo: {
        margin: theme.spacing(2),
    },

}));

function WelcomeModal(props: IWelcomeModalProps) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogContent>
                <DialogContentText>
                    <div>
                        <div className={classes.logo}>
                            <MULogo width="50%" height="100%" color={LIGHTBLUE}></MULogo>
                        </div>
                        <Typography variant="h4" className={classes.title}>
                            MU MTL's Open-Air Museum
            </Typography>
                        <p>
                            MU's mission is to beautify the city of Montreal by creating
                            murals that are anchored in local communities. At the heart of its
                            approach is the desire to see and experience art on a daily basis,
                            to trigger a social transformation, and to turn Montreal into an
                            open-air MUseum!
            </p>
                    </div>
                </DialogContentText>
            </DialogContent>
            <Button
                className={classes.button}
                size="large"
                variant="contained"
                color="primary"
                disableElevation
                onClick={props.handleClose}
            >
                EXPLORE
      </Button>
        </Dialog>
    );
}
export default WelcomeModal;