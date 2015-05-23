package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func RegisterRoutes(r *gin.Engine) {

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	// r.POST("/somePost", posting)
	// r.PUT("/somePut", putting)
	// r.DELETE("/someDelete", deleting)
	// r.PATCH("/somePatch", patching)
	// r.HEAD("/someHead", head)
	// r.OPTIONS("/someOptions", options)

}
