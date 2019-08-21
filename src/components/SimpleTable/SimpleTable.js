import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import BookMenu from '../BookMenu/bookmenu'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function createData(title, author, rate, pages, ISBN) {
  title=title.charAt(0).toUpperCase() + title.slice(1);
  return { title, author, rate, pages, ISBN };
}

export default function SimpleTable(props) {
  const classes = useStyles();

  const rows = 
[
  
];
props.book.map(book1 => rows.push(createData(book1.title,book1.author,book1.rate,
  book1.pages,book1.ISBN)));
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
          <TableCell>Title</TableCell>  
            <TableCell align="right">Author&nbsp;</TableCell>      
            <TableCell align="right">Rate&nbsp;</TableCell>
            <TableCell align="right">Pages&nbsp;</TableCell>
            <TableCell align="right">ISBN&nbsp;</TableCell>
            <TableCell align="right">Add to&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.title}>
              
              <TableCell component="th" scope="row">
              <Link  style={{textDecoration: 'none', color: 'initial'}} to={`book/${row.ISBN}`}>
                {row.title}
                </Link>
              </TableCell>
              
              <TableCell align="right"><Link  style={{textDecoration: 'none', color: 'initial'}} to={`book/${row.ISBN}`}>{row.author}</Link></TableCell>
              <TableCell align="right">{row.rate}</TableCell>
              <TableCell align="right">{row.pages}</TableCell>
              <TableCell align="right">{row.ISBN}</TableCell>
              <TableCell align="right"><BookMenu/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}