import React from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flexStart",
        },
        card: {
            width: "450px",
            margin: "5%",
            display: "flex",
        },
        icon: {
            width: '27%',
            height: '100%',
        },
        properties: {
            marginLeft: '5%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'spaceBetween',
            width: '30%',
        },
        type: {
            marginLeft: '15%'
        }
    }),
);

interface ISearchCardProps {
    searchCards: any;
}

function SearchCard(props: ISearchCardProps) {
    const styles = useStyles();

    return (
        <div className={styles.flexContainer}>
            {
                props.searchCards.map((mural: any, index: any) => {

                    return (<Card className={styles.card}>

                        <img className={styles.icon}
                            src="https://cdn2.lamag.com/wp-content/uploads/sites/6/2020/01/kobe-mural-mr-brainwash-chris-delmas-afp-getty-1068x712.jpg"
                            alt="mural"></img>
                        <div className={styles.properties}>
                            <Typography variant="subtitle1">
                                {mural.name}
                            </Typography>
                            <Typography variant="body2">
                                {mural.address}, {mural.city}
                            </Typography>

                        </div>
                        <Typography variant="body1" className={styles.type}>
                            mural
                        </Typography>
                    </Card>)

                })
            }
        </div>
    );
}

export default SearchCard;
