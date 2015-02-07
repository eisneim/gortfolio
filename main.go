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
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	// router
	"github.com/gorilla/mux"
)
