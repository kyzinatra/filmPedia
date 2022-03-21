import express from "express";
import path from "path";
import fs from 'fs' ;

import ReactDOMServer from 'react-dom/server';
import App from '../src/components/App/App'; 
import React from "react";

const app = express();
const PORT = process.env.PORT || 8000;
function read (filePath: string) {
  return fs.readFileSync( path.resolve( __dirname, filePath ), {encoding: 'utf8'} );
}

app.use(express.urlencoded({ extended: true }));

app.get( /\.(js|css|map|ico)$/, express.static( path.resolve( __dirname, '../public' ) ) );


app.get( '/', ( _, res ) => {
  let indexHTML = read("../public/index.html");
  const AppContent = ReactDOMServer.renderToString(<App/>);
  indexHTML = indexHTML.replace(`<div id="root"></div>`, `<div id="root">${AppContent}</div>`);
  res.contentType( 'text/html' );
  res.status( 200 );
  return res.send( indexHTML );
} );

app.get( '/404', ( _, res ) => {
  const ErrorPage = read("../public/404.html");
  res.contentType( 'text/html' );
  res.status( 200 );
  return res.send( ErrorPage );
} );

app.get( '/500', ( _, res ) => {
  const ErrorPage = read("../public/500.html");
  res.contentType( 'text/html' );
  res.status( 200 );
  return res.send( ErrorPage );
} );

app.listen(PORT, () => {
	console.log(`Server is runing on ${PORT} port`);
});