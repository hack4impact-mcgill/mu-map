import React, { useState, useEffect } from "react";
import axios from "axios";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 350;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        title: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 15,
            marginLeft: 15,
        },
        miniTitle: {
            margin: 0,
        }
        
    })
)

const SearchCard = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();
    const theme = useTheme();
    const [murals, setMurals] = useState<any>([]);
    const [open, setOpen] = React.useState(false);
    // const [tours, setTours] = useState(null);
    // const [collections, getCollections] = useState(null);
    useEffect(() => {
        getMural();
        // getTour();
        // getCollection();
    });
    const getMural = async () => {
        const response = await fetch("http://localhost:3000/mural");
        const data = await response.json();

        setMurals(data.murals.rows)
        console.log(typeof (data.murals.rows))

    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // const listMurals = murals.map((mural) =>
    //     // <li key={mural.name}>
    //     //     <h1>{{ mural }}</h1>
    //     // </li>
    // )

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>

                {murals.map((mural: any, index: any) => {

                    return (
                        <div className={classes.title} key={index}>
                            <h4 className={classes.miniTitle}>{mural.name.toString()}</h4>
                            <p className={classes.miniTitle}>{mural.address.toString() + ", " + mural.city.toString() + ", " + mural.year.toString()}</p>

                        </div>
                    );
                })

                }
            </Drawer>
        </div>
    )
}

export default SearchCard;