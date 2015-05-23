package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	// "github.com/eisneim/gortfolio/server/config"
)

func User_new(c *gin.Context) {
	c.String(http.StatusOK, "should create a new User here")
}

func User_get(c *gin.Context) {
	c.String(http.StatusOK, "should get a  User "+c.Params.ByName("userId"))
}

func User_update(c *gin.Context) {
	c.String(http.StatusOK, "should update a User "+c.Params.ByName("userId"))
}

func User_delete(c *gin.Context) {
	c.String(http.StatusOK, "should  elte User here"+c.Params.ByName("userId"))
}
