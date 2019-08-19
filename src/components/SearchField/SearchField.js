import { fade, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import firebase from '../Firebase/Firebase';
import { Link, withRouter } from "react-router-dom";

import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    input: {
        display: 'none',
    },
    grow: {
        flexGrow: 1,
    },
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
        pointerEvents: 'none',
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
    const [searchResults,setSearchResults] = React.useState([])
    const [isSearching,setIsSearching] = React.useState(false);

    useEffect(() => {
        document.addEventListener('click',e => {
            if(e.target.id === 'search-input'){
                setIsSearching(true);
            }
            else{
                setIsSearching(false);
            }
        })

    },[])

    function onSearch(event) {
        const db = firebase.firestore();
        const booksRef = db.collection("bookslibrary");
            const inputValue = event.target.value.toLowerCase();
            booksRef.get().then(res => {
                if(!inputValue) {
                    setSearchResults([]);
                    return;
                }else{
                    const resultBooks = [];
                    res.forEach(book => {
                        if(book.data().title.indexOf(inputValue) > -1) {
                            resultBooks.push(book.data());
                        }
                    });

                    setFoundBook(resultBooks);
                    setSearchResults(resultBooks);
                }
            });
    }

    return (
        <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            id="search-input"
                            placeholder="Search book ..."
                            onChange={onSearch.bind(this)}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <div style={{visibility: isSearching ? 'visible' : 'hidden'}} className="search-result-box">
                            {searchResults.map((book,index) => (
                                <Link key={index} to={`book/${book.ISBN}`}  style={{textDecoration: 'none'}}>
                                <div className="search-result-item">{book.title}</div>
                                </Link>
                                
                            ))}
                        </div>
                    </div>);
}

export default SearchField;