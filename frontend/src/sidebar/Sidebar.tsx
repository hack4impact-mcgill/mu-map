import React from 'react';
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import './Sidebar.css'

const useStyles = makeStyles({
    paper: {
        backgroundColor: "#EEE3E3"
    }
})

interface ISidebarProps {
    name: string;
}

function Sidebar(props: ISidebarProps) {

    const styles = useStyles();
    const [open, setOpen] = React.useState<boolean>(false)

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => { setOpen(!open) }}>
                Open sidebar
            </Button>
            <Drawer classes={{paper: styles.paper}} open={open} onClose={() => { setOpen(!open) }}>
                <p className="title">
                    {props.name}
                </p>
            </Drawer>
        </div>
    );
}

export default Sidebar;