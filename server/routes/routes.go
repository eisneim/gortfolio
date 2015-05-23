package routes

import (
	"github.com/eisneim/gortfolio/server/controllers"
	"github.com/gin-gonic/gin"
	"net/http"
)

func RegisterRoutes(r *gin.Engine) {

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "this is our home page")
	})

	r.POST("v1/users", controllers.User_new)

	r.GET("v1/users/:userId", controllers.User_get)

	r.PUT("v1/users/:userId", controllers.User_update)

	r.DELETE("v1/users/:userId", controllers.User_delete)

	// r.POST("/somePost", posting)
	// r.PUT("/somePut", putting)
	// r.DELETE("/someDelete", deleting)
	// r.PATCH("/somePatch", patching)
	// r.HEAD("/someHead", head)
	// r.OPTIONS("/someOptions", options)

}
