package main

import (
	"fmt"
	"github.com/eisneim/gortfolio/server/config"
	"github.com/eisneim/gortfolio/server/routes"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	appConfig := config.GetConfig()

	r := gin.Default()
	/**
	 * load in all html the templates
	 */
	r.LoadHTMLGlob(appConfig.RootPath + "/server/views/*")
	/**
	 * register all the route handlers
	 */
	routes.RegisterRoutes(r)
	/**
	 * serve static files
	 * r.Static("/s", appConfig.RootPath+"/public")
	 */
	r.Use(static.Serve("/", static.LocalFile(appConfig.RootPath+"/public", false)))

	// Listen and server on 0.0.0.0:8080
	r.Run(fmt.Sprintf(":%d", appConfig.Port))
}
