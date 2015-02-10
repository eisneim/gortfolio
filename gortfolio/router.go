package gortfolio

import (
	"github.com/eisneim/gortfolio/gortfolio/controllers"
)

const (
	Visitor = iota
	Authed
	Admin
)

func init() {

	// ----------- user apis -----------
	Router.GET("/v1/login", controllers.UserLogin)

	Router.GET("/test", controllers.Test)

	// ----------- portfolio api -------

}
