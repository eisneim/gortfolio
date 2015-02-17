/*!
 * gortfolio v0.0.1
 * http://eisneim.github.io/gortfolio
 *
 * the goal is to create an awesome & easy to use portfolio CMS for
 * Designers / Artists / Developers
 * using: golang as backend , angularJS as frontend MV* framework , mongodb as database
 *
 * Copyright (c) 2015 eisneim.com
 * License: MIT
 */

package main

import (
	"flag"
	"github.com/eisneim/gortfolio/gortfolio"
)

func main() {
	// command line flags, flag Prase() returnd with pointers
	port := flag.Int("port", gortfolio.Config.Port, "port to serve on")
	dir := flag.String("dir", "public/", "directory of static files ")
	flag.Parse()

	gortfolio.Serve(*port, *dir)
}
