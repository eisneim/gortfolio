package routes

import (
	"github.com/eisneim/gortfolio/server/controllers"
	"github.com/gin-gonic/gin"
	"net/http"
)

func RegisterRoutes(r *gin.Engine) {

	r.GET("/", func(c *gin.Context) {
		// c.String(http.StatusOK, "this is our home page")
		c.HTML(http.StatusOK, "index.html", nil)

	})

	// --------------------------- user apis ---------------

	r.POST("/v1/users", controllers.User_new)

	r.GET("/v1/users/:userId", controllers.User_get)

	r.PUT("/v1/users/:userId", controllers.User_update)

	r.DELETE("/v1/users/:userId", controllers.User_delete)

	// --------------------------- system apis ---------------

	r.GET("/sys/install", controllers.Sys_getInstall)

	r.POST("/sys/install", controllers.Sys_install)

}
