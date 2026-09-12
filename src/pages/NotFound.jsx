import React from "react";
import { Link } from "react-router-dom";
export default function NotFound(){return <div className="container empty"><h1>404</h1><h2>Page not found</h2><p>The page you requested doesn't exist.</p><Link className="btn btn-primary" to="/">Go home</Link></div>}