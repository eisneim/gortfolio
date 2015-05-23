package main

import (
	"fmt"
	"github.com/eisneim/gortfolio/server/config"
	"github.com/eisneim/gortfolio/server/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	appConfig := config.GetConfig()

	r := gin.Default()

	routes.RegisterRoutes(r)

	// Listen and server on 0.0.0.0:8080
	r.Run(fmt.Sprintf(":%d", appConfig.Port))
}
