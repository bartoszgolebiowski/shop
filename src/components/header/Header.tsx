import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    header: {
        display: 'flex',
        flex: 1,
        height: '3rem',
        backgroundColor: 'red'
    },
    left: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'orange'
    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end',
        flex: 1,
        backgroundColor: 'green'
    },
    list: {
        display: 'inline',
        listStyleType: 'none',
        paddingInlineStart: '0px'
    },
    item: {
        float: 'left',
        paddingLeft: '15px',
        paddingRight: '20px',
        fontSize: '16px',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        transition: 'color 0.5s',
        '&:hover': {
            color: 'white'
        }
    },
    icon : {
        fontSize : '30px',
        margin: 'auto 30px',
        cursor: 'pointer',
    }
});


const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <div className={classes.left}>
                <span className={classes.icon}>Todo.it</span>
                <ul className={classes.list}>
                    <li className={classes.item}><Link className={classes.link} to="/">settings1</Link></li>
                    <li className={classes.item}><Link className={classes.link} to="/">settings2</Link></li>
                    <li className={classes.item}><Link className={classes.link} to="/">settings3</Link></li>
                </ul>
            </div>
            <div className={classes.right}>
                <ul className={classes.list}>
                    <li className={classes.item}><Link className={classes.link} to="/login">settings1</Link></li>
                    <li className={classes.item}><Link className={classes.link} to="/login">settings2</Link></li>
                    <li className={classes.item}><Link className={classes.link} to="/login">settings3</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header