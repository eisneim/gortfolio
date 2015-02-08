package gortfolio

import (
	"github.com/eisneim/gortfolio/gortfolio/controllers"
)

type Route struct {
	Method     string
	URL        string
	Permission int
	Handler    controllers.JSON
}

const (
	Visitor = iota
	Authed
	Admin
)

var (
	routes = []Route{
		{"GET", "/v1/login", Visitor, controllers.UserLogin},
		// {"GET", "/search", Visitor, searchHandler},
		// {"GET", "/users.json", Visitor, usersJsonHandler},
	}
)
