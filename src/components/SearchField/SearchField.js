import { fade, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import firebase from '../Firebase/Firebase';
import { Link, withRouter } from "react-router-dom";
import SearchResult from '../SearchResult/SearchResult';

const useStyles = makeStyles(theme => ({
    // button: {
    //     margin: theme.spacing(1),
    // },
    input: {
        display: 'none',
    },
    grow: {
        flexGrow: 1,
    },
    // menuButton: {
    //     marginRight: theme.spacing(2),
    // },
    // title: {
    //     marginRight: theme.spacing(2),
    //     display: 'none',
    //     [theme.breakpoints.up('sm')]: {
    //         display: 'block',
    //     },
    // },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        // pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));


function SearchField() {
    const classes = useStyles();
    const [foundBook, setFoundBook] = React.useState(null);

    function onSearch(event) {
        const db = firebase.firestore();
        const booksRef = db.collection("bookslibrary");
        if (event.target.value) {
            const inputValue = event.target.value.toLowerCase();
            return booksRef.get().then(res => {
                const resultBooks = [];
                res.forEach(book => {
                    // console.log(book.data());
                    if (book.data().title.indexOf(inputValue) > -1) {
                        resultBooks.push(book.data());
                    }
                });
                console.log(resultBooks);
                setFoundBook(resultBooks)
                return resultBooks;
            });
        }
        return null;
    }

    return (
        <div className={classes.search}>

            <div className={classes.searchIcon}>
            </div>
            <InputBase
                placeholder="Search book ..."
                onChange={onSearch.bind(this)}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
            <Link
                to={{
                    pathname: "/searchresult",
                    // search: "?sort=name",
                    // hash: "#the-hash",
                    foundBook: { foundBook }
                }}
            >
                <SearchIcon onClick={() => { setFoundBook(null) }} />
            </Link>
        </div >);
}

export default SearchField;